interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'ONLINE': return '#00FF88';
    case 'ERROR': return '#FF0040';
    case 'ANALYSIS': return '#FFB800';
    case 'BROKEN': return '#FF6B35';
    case 'OFFLINE': return '#FF0040';
    case 'READY': return '#00FF88';
    case 'DEPLOYED': return '#FF0040';
    default: return '#8B95A5';
  }
}

export function getStatusBg(status: string): string {
  switch (status) {
    case 'ONLINE': return 'rgba(0,255,136,0.12)';
    case 'ERROR': return 'rgba(255,0,64,0.12)';
    case 'ANALYSIS': return 'rgba(255,184,0,0.12)';
    case 'BROKEN': return 'rgba(255,107,53,0.12)';
    case 'OFFLINE': return 'rgba(255,0,64,0.12)';
    case 'READY': return 'rgba(0,255,136,0.12)';
    case 'DEPLOYED': return 'rgba(255,0,64,0.12)';
    default: return 'rgba(139,149,165,0.12)';
  }
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const color = getStatusColor(status);
  const bg = getStatusBg(status);

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: size === 'sm' ? '2px 7px' : '3px 10px',
      borderRadius: 4,
      fontSize: size === 'sm' ? 10 : 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      background: bg,
      color: color,
      border: `1px solid ${color}30`
    }}>
      <span style={{
        width: 5, height: 5,
        borderRadius: '50%',
        background: color,
        flexShrink: 0,
        boxShadow: `0 0 4px ${color}`
      }} />
      {status}
    </span>
  );
}
