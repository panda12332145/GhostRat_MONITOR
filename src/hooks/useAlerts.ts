/**
 * useAlerts Hook - Manage system alerts with backend sync
 * Handles fetching, polling, localStorage persistence, and timestamp updates
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { StoredAlert } from '../utils/storageManager';
import {
  saveAlerts,
  loadAlerts,
  clearAllAlerts,
  syncAlerts,
  getDismissedAlerts,
  removeDismissedAlert,
  isStorageAvailable,
} from '../utils/storageManager';

interface UseAlertsOptions {
  pollInterval?: number; // milliseconds (default: 5000)
  enableLocalStorage?: boolean; // default: true
  enableAutoRefresh?: boolean; // default: true
}

interface UseAlertsReturn {
  alerts: StoredAlert[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  dismissAlert: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
  count: number;
  hasError: boolean;
}

const API_BASE_URL = 'http://localhost:3001/api';
const DEFAULT_POLL_INTERVAL = 5000; // 5 seconds

/**
 * Hook to manage system alerts
 * Fetches from backend, syncs with localStorage, handles dismissals
 */
export const useAlerts = (options: UseAlertsOptions = {}): UseAlertsReturn => {
  const {
    pollInterval = DEFAULT_POLL_INTERVAL,
    enableLocalStorage = true,
    enableAutoRefresh = true,
  } = options;

  const [alerts, setAlerts] = useState<StoredAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timestampUpdateTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMountedRef = useRef(true);

  /**
   * Fetch alerts from backend API
   */
  const fetchAlerts = useCallback(async (): Promise<StoredAlert[]> => {
    try {
      console.log('🔄 Fetching alerts from:', API_BASE_URL + '/alerts');
      const response = await fetch(`${API_BASE_URL}/alerts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);

      if (!data.success || !Array.isArray(data.data)) {
        throw new Error('Invalid API response format');
      }

      console.log('✅ Alerts fetched successfully:', data.data.length, 'alerts');
      return data.data as StoredAlert[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch alerts';
      console.error('❌ Failed to fetch alerts:', message, err);
      throw err;
    }
  }, []);

  /**
   * Load alerts from backend and localStorage, merge them
   */
  const loadAlertsData = useCallback(async () => {
    if (!isMountedRef.current) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch from backend
      const backendAlerts = await fetchAlerts();

      // Load from localStorage if enabled
      let localAlerts: StoredAlert[] = [];
      if (enableLocalStorage && isStorageAvailable()) {
        localAlerts = loadAlerts();
      }

      // Sync and merge
      const synced = syncAlerts(backendAlerts, localAlerts);

      // Filter out dismissed alerts
      const dismissed = getDismissedAlerts();
      const activeAlerts = synced.filter(alert => !dismissed.has(alert.id));

      if (isMountedRef.current) {
        setAlerts(activeAlerts);
        // Save synced alerts to localStorage
        if (enableLocalStorage && isStorageAvailable()) {
          saveAlerts(activeAlerts);
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      if (isMountedRef.current) {
        setError(message);
        // Fallback to localStorage on error
        if (enableLocalStorage && isStorageAvailable()) {
          const localAlerts = loadAlerts();
          setAlerts(localAlerts);
        }
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [fetchAlerts, enableLocalStorage]);

  /**
   * Dismiss an alert (mark for removal after 5 seconds)
   */
  const dismissAlert = useCallback(
    async (id: string): Promise<void> => {
      try {
        // Optimistic update - remove visually immediately
        setAlerts(prev => prev.filter(alert => alert.id !== id));

        // Call API to dismiss
        const response = await fetch(`${API_BASE_URL}/alerts/${id}/dismiss`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        // Wait 5 seconds, then do final sync with backend
        await new Promise(resolve => setTimeout(resolve, 5000));

        if (isMountedRef.current) {
          removeDismissedAlert(id);
          // Refresh to get latest state
          await loadAlertsData();
        }
      } catch (err) {
        console.error('Failed to dismiss alert:', err);
        // Refresh on error to restore state
        await loadAlertsData();
      }
    },
    [loadAlertsData]
  );

  /**
   * Clear all alerts
   */
  const clearAll = useCallback(async (): Promise<void> => {
    try {
      // Optimistic update
      setAlerts([]);

      // Call API
      const response = await fetch(`${API_BASE_URL}/alerts/clear-all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      // Clear localStorage
      if (enableLocalStorage && isStorageAvailable()) {
        clearAllAlerts();
      }
    } catch (err) {
      console.error('Failed to clear alerts:', err);
      // Refresh on error
      await loadAlertsData();
    }
  }, [loadAlertsData, enableLocalStorage]);

  /**
   * Manual refresh
   */
  const refresh = useCallback(async (): Promise<void> => {
    await loadAlertsData();
  }, [loadAlertsData]);

  /**
   * Trigger timestamp updates (re-render every minute)
   * This makes "5 MIN AGO" update to "6 MIN AGO" etc
   */
  useEffect(() => {
    if (!isMountedRef.current) return;

    const updateTimestamps = () => {
      if (isMountedRef.current && alerts.length > 0) {
        // Trigger re-render by updating state (no actual change)
        setAlerts(prev => [...prev]);
      }
    };

    // Update every minute
    timestampUpdateTimerRef.current = setInterval(updateTimestamps, 60000);

    return () => {
      if (timestampUpdateTimerRef.current) {
        clearInterval(timestampUpdateTimerRef.current);
      }
    };
  }, [alerts.length]);

  /**
   * Setup polling
   */
  useEffect(() => {
    if (!isMountedRef.current) return;

    // Initial load
    loadAlertsData();

    // Setup polling
    if (enableAutoRefresh) {
      pollTimerRef.current = setInterval(() => {
        if (isMountedRef.current) {
          loadAlertsData();
        }
      }, pollInterval);
    }

    // Cleanup
    return () => {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
      }
    };
  }, [loadAlertsData, enableAutoRefresh, pollInterval]);

  /**
   * Check Page Visibility API - pause polling when tab is hidden
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden, clear polling
        if (pollTimerRef.current) {
          clearInterval(pollTimerRef.current);
        }
      } else {
        // Tab is visible again, resume polling
        if (enableAutoRefresh && isMountedRef.current) {
          loadAlertsData();
          pollTimerRef.current = setInterval(() => {
            if (isMountedRef.current) {
              loadAlertsData();
            }
          }, pollInterval);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enableAutoRefresh, loadAlertsData, pollInterval]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
      }
      if (timestampUpdateTimerRef.current) {
        clearInterval(timestampUpdateTimerRef.current);
      }
    };
  }, []);

  return {
    alerts,
    loading,
    error,
    refresh,
    dismissAlert,
    clearAll,
    count: alerts.length,
    hasError: error !== null,
  };
};
