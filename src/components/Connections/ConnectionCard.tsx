import { Connection } from '../../data/connections';
import StatusBadge, { getStatusColor } from '../common/StatusBadge';

interface ConnectionCardProps {
  connection: Connection;
}

function DeviceIcon({ os }: { os: string }) {
  const isAndroid = os.toLowerCase().includes('android');
  const isIOS = os.toLowerCase().includes('ios');
  const isLinux = os.toLowerCase().includes('debian') || os.toLowerCase().includes('ubuntu') || os.toLowerCase().includes('centos') || os.toLowerCase().includes('fedora');
  const isMobile = isAndroid || isIOS;

  if (isMobile) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B95A5" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <circle cx="12" cy="18" r="1"/>
        <line x1="9" y1="6" x2="15" y2="6"/>
      </svg>
    );
  }
  if (isLinux) {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B95A5" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B95A5" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="14" rx="1.5"/>
      <path d="M8 20h8M12 18v2"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
    </svg>
  );
}

function CapabilityButton({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <button style={{
      background: 'transparent',
      border: `1px solid ${enabled ? '#00FFD4' : '#1E2A3A'}`,
      color: enabled ? '#00FFD4' : '#2A3A4A',
      borderRadius: 4,
      padding: '5px 8px',
      fontSize: 11,
      fontWeight: 500,
      cursor: enabled ? 'pointer' : 'default',
      transition: 'all 0.2s',
      minHeight: 28,
      width: '100%',
      textTransform: 'uppercase',
      letterSpacing: '0.03em'
    }}
    onMouseEnter={(e) => {
      if (enabled) {
        (e.currentTarget as HTMLElement).style.background = 'rgba(0,255,212,0.1)';
      }
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.background = 'transparent';
    }}
    >
      {label}
    </button>
  );
}

export default function ConnectionCard({ connection }: ConnectionCardProps) {
  const dotColor = getStatusColor(connection.status);

  return (
    <div style={{
      background: '#151B28',
      border: '1px solid #1A2332',
      borderRadius: 10,
      padding: '14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      position: 'relative',
      transition: 'all 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.background = '#1C2333';
      (e.currentTarget as HTMLElement).style.borderColor = '#2A3A4A';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.background = '#151B28';
      (e.currentTarget as HTMLElement).style.borderColor = '#1A2332';
    }}
    >
      {/* Status dot top-right */}
      <div style={{
        position: 'absolute',
        top: 10, right: 10,
        width: 8, height: 8,
        borderRadius: '50%',
        background: dotColor,
        boxShadow: `0 0 6px ${dotColor}`,
        animation: connection.status === 'ONLINE' ? 'pulse-dot 2s ease-in-out infinite' : 'none'
      }} />

      {/* Header: icon + name + status */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, paddingRight: 20 }}>
        <div style={{
          width: 36, height: 36,
          background: '#1A2332',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <DeviceIcon os={connection.os} />
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontWeight: 700,
            fontSize: 13,
            color: '#FFFFFF',
            lineHeight: 1.3,
            wordBreak: 'break-word'
          }}>
            {connection.device_name}
          </div>
          <div style={{ marginTop: 3 }}>
            <StatusBadge status={connection.status} />
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ display: 'flex', gap: 6, fontSize: 11 }}>
          <span style={{ color: '#4A5568', width: 28, flexShrink: 0 }}>IP:</span>
          <span style={{ color: '#8B95A5', wordBreak: 'break-all' }}>{connection.ip_address}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, fontSize: 11 }}>
          <span style={{ color: '#4A5568', width: 28, flexShrink: 0 }}>OS:</span>
          <span style={{ color: '#8B95A5' }}>{connection.os}</span>
        </div>
      </div>

      {/* Buttons 2x2 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 6
      }}>
        <CapabilityButton label="Files" enabled={connection.capabilities.files} />
        <CapabilityButton label="Screen" enabled={connection.capabilities.screen} />
        <CapabilityButton label="Shell" enabled={connection.capabilities.shell} />
        <CapabilityButton label="Camera" enabled={connection.capabilities.camera} />
      </div>
    </div>
  );
}
