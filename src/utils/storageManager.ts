/**
 * Storage Manager - Handle localStorage operations for alerts
 * Provides persistence layer for system alerts
 */

export interface StoredAlert {
  id: string;
  title: string;
  severity: 'warning' | 'success' | 'critical' | 'info';
  color: string;
  message: string;
  timestamp: number;
  isRead: boolean;
}

const STORAGE_KEY = 'ghostrat_alerts';
const DISMISSED_KEY = 'ghostrat_dismissed_alerts';

/**
 * Save alerts to localStorage
 */
export const saveAlerts = (alerts: StoredAlert[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
  } catch (error) {
    console.warn('Failed to save alerts to localStorage:', error);
  }
};

/**
 * Load alerts from localStorage
 */
export const loadAlerts = (): StoredAlert[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load alerts from localStorage:', error);
    return [];
  }
};

/**
 * Clear all alerts from localStorage
 */
export const clearAllAlerts = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DISMISSED_KEY);
  } catch (error) {
    console.warn('Failed to clear alerts from localStorage:', error);
  }
};

/**
 * Mark an alert as dismissed (pending removal)
 * Returns the set of dismissed alert IDs
 */
export const saveDismissedAlert = (alertId: string): Set<string> => {
  try {
    const dismissed = getDismissedAlerts();
    dismissed.add(alertId);
    localStorage.setItem(DISMISSED_KEY, JSON.stringify(Array.from(dismissed)));
    return dismissed;
  } catch (error) {
    console.warn('Failed to save dismissed alert:', error);
    return new Set();
  }
};

/**
 * Get all dismissed alert IDs from localStorage
 */
export const getDismissedAlerts = (): Set<string> => {
  try {
    const stored = localStorage.getItem(DISMISSED_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (error) {
    console.warn('Failed to load dismissed alerts from localStorage:', error);
    return new Set();
  }
};

/**
 * Remove a dismissed alert ID from localStorage (after 5 seconds)
 */
export const removeDismissedAlert = (alertId: string): void => {
  try {
    const dismissed = getDismissedAlerts();
    dismissed.delete(alertId);
    if (dismissed.size === 0) {
      localStorage.removeItem(DISMISSED_KEY);
    } else {
      localStorage.setItem(DISMISSED_KEY, JSON.stringify(Array.from(dismissed)));
    }
  } catch (error) {
    console.warn('Failed to remove dismissed alert:', error);
  }
};

/**
 * Get the count of stored alerts
 */
export const getAlertCount = (): number => {
  return loadAlerts().length;
};

/**
 * Sync alerts: merge backend data with localStorage
 * Backend data takes priority for new alerts
 */
export const syncAlerts = (backendAlerts: StoredAlert[], localAlerts: StoredAlert[]): StoredAlert[] => {
  const backendIds = new Set(backendAlerts.map(a => a.id));

  // Keep backend alerts (they're fresh from API)
  const synced = [...backendAlerts];

  // Add local alerts that aren't in backend (offline scenario)
  for (const localAlert of localAlerts) {
    if (!backendIds.has(localAlert.id)) {
      synced.push(localAlert);
    }
  }

  // Sort by timestamp (newest first)
  synced.sort((a, b) => b.timestamp - a.timestamp);

  return synced;
};

/**
 * Check if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};
