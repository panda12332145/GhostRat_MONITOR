import { useState, useCallback } from 'react';
import { useAlerts } from '../../hooks/useAlerts';
import { formatRelativeTime } from '../../utils/dateFormatter';

export default function SystemAlerts() {
  const { alerts, loading, error, refresh, dismissAlert, clearAll, count } = useAlerts({
    pollInterval: 5000,
    enableLocalStorage: true,
    enableAutoRefresh: true,
  });

  const [dismissingIds, setDismissingIds] = useState<Set<string>>(new Set());

  const handleAlertClick = useCallback(
    async (alertId: string) => {
      setDismissingIds(prev => new Set([...prev, alertId]));
      try {
        await dismissAlert(alertId);
      } finally {
        setDismissingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(alertId);
          return newSet;
        });
      }
    },
    [dismissAlert]
  );

  const handleRefresh = useCallback(async () => {
    await refresh();
  }, [refresh]);

  const handleClearAll = useCallback(async () => {
    const confirmed = window.confirm(`Clear all ${count} alert${count !== 1 ? 's' : ''}? This action cannot be undone.`);
    if (confirmed) {
      await clearAll();
    }
  }, [count, clearAll]);

  if (loading && alerts.length === 0) {
    return (
      <div style={{ background: 'rgb(17, 24, 39)', border: '1px solid rgb(30, 42, 58)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid rgb(30, 42, 58)' }}>
          <h3 style={{ color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>SYSTEM ALERTS</h3>
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(0,255,212,0.2)', borderTopColor: 'rgb(0,255,212)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
          <p style={{ color: 'rgb(139, 149, 165)', fontSize: 11, marginTop: 8, fontFamily: "'JetBrains Mono', monospace" }}>Loading alerts...</p>
        </div>
      </div>
    );
  }

  if (error && alerts.length === 0) {
    return (
      <div style={{ background: 'rgb(17, 24, 39)', border: '1px solid rgb(30, 42, 58)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid rgb(30, 42, 58)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>SYSTEM ALERTS</h3>
          <button onClick={handleRefresh} style={{ background: 'transparent', border: '1px solid rgba(0,255,212,0.3)', color: 'rgb(0,255,212)', padding: '4px 8px', borderRadius: 4, fontSize: 9, fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace" }}>Retry</button>
        </div>
        <div style={{ padding: '16px', background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: 4, margin: 8 }}>
          <p style={{ color: 'rgb(255,107,53)', fontSize: 10, lineHeight: 1.4, margin: 0, wordBreak: 'break-word', fontFamily: "'JetBrains Mono', monospace" }}><span style={{ marginRight: 6 }}>⚠️</span>Failed to load alerts: {error}</p>
        </div>
      </div>
    );
  }

  if (!loading && alerts.length === 0) {
    return (
      <div style={{ background: 'rgb(17, 24, 39)', border: '1px solid rgb(30, 42, 58)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid rgb(30, 42, 58)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>SYSTEM ALERTS</h3>
          <button onClick={handleRefresh} style={{ background: 'transparent', border: '1px solid rgba(0,255,212,0.3)', color: 'rgb(0,255,212)', padding: '4px 8px', borderRadius: 4, fontSize: 9, fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace" }}>Refresh</button>
        </div>
        <div style={{ padding: '40px 20px', textAlign: 'center', color: 'rgb(74, 85, 104)' }}>
          <div style={{ fontSize: 24, marginBottom: 8, opacity: 0.6 }}>✓</div>
          <p style={{ fontSize: 12, lineHeight: 1.6, margin: 0 }}>No active alerts</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'rgb(17, 24, 39)', border: '1px solid rgb(30, 42, 58)', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ padding: '10px 14px', borderBottom: '1px solid rgb(30, 42, 58)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0, 0, 0, 0.2)' }}>
        <h3 style={{ color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace", margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          SYSTEM ALERTS
          {count > 0 && <span style={{ background: 'rgba(0,255,212,0.2)', color: 'rgb(0,255,212)', padding: '2px 8px', borderRadius: 12, fontSize: 10, fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{count}</span>}
        </h3>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={handleRefresh} title="Refresh alerts" style={{ background: 'transparent', border: '1px solid rgba(0,255,212,0.3)', color: 'rgb(0,255,212)', padding: '4px 8px', borderRadius: 4, fontSize: 9, fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace" }}>🔄 Refresh</button>
          {count > 0 && <button onClick={handleClearAll} title="Clear all alerts" style={{ background: 'transparent', border: '1px solid rgba(0,255,212,0.3)', color: 'rgb(0,255,212)', padding: '4px 8px', borderRadius: 4, fontSize: 9, fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace" }}>✕ Clear All</button>}
        </div>
      </div>
      <div style={{ padding: 8, maxHeight: 340, overflowY: 'auto', overflowX: 'hidden' }}>
        {alerts.map(alert => (
          <div key={alert.id} onClick={() => handleAlertClick(alert.id)} style={{ borderRadius: 6, padding: '8px 10px', marginBottom: 6, borderWidth: '1px 1px 1px 3px', borderStyle: 'solid', borderLeftColor: alert.color, borderTopColor: 'rgba(30, 42, 58, 0.5)', borderRightColor: 'rgba(30, 42, 58, 0.5)', borderBottomColor: 'rgba(30, 42, 58, 0.5)', background: alert.color + '08', cursor: 'pointer', userSelect: 'none', opacity: dismissingIds.has(alert.id) ? 0.5 : 1, transition: 'all 0.2s ease', transform: dismissingIds.has(alert.id) ? 'translateX(-4px)' : 'translateX(0)' }} title="Click to dismiss (5 second delay)">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
              <span style={{ color: alert.color, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace" }}>{alert.title}</span>
              <span style={{ color: 'rgb(74, 85, 104)', fontSize: 9, flexShrink: 0, marginLeft: 8, whiteSpace: 'nowrap', fontFamily: "'JetBrains Mono', monospace" }}>{formatRelativeTime(alert.timestamp)}</span>
            </div>
            <p style={{ color: 'rgb(139, 149, 165)', fontSize: 10, lineHeight: 1.4, margin: 0, wordBreak: 'break-word' }}>{alert.message}</p>
          </div>
        ))}
      </div>
      {loading && alerts.length > 0 && <div style={{ padding: 8, borderTop: '1px solid rgb(30, 42, 58)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: 'rgb(74, 85, 104)', fontFamily: "'JetBrains Mono', monospace" }}><div style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid rgba(0,255,212,0.2)', borderTopColor: 'rgb(0,255,212)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>Updating...</div>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
