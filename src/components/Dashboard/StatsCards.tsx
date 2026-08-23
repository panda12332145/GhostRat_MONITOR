interface StatsCardsProps {
  totalTargets: number;
  onlineNow: number;
  activePayloads: number;
  serverUptime: string;
}

export default function StatsCards({ totalTargets, onlineNow, activePayloads, serverUptime }: StatsCardsProps) {
  const cards = [
    {
      label: 'TOTAL TARGETS',
      value: totalTargets.toString(),
      valueColor: '#FFFFFF',
      sub: null,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B95A5" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      eyeIcon: true
    },
    {
      label: 'ONLINE NOW',
      value: onlineNow.toString(),
      valueColor: '#00FFD4',
      sub: 'ACTIVE CONNECTIONS STABLE',
      icon: null,
      eyeIcon: false
    },
    {
      label: 'ACTIVE PAYLOADS',
      value: activePayloads.toString().padStart(2, '0'),
      valueColor: '#FFFFFF',
      sub: null,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B95A5" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      eyeIcon: false
    },
    {
      label: 'SERVER UPTIME',
      value: serverUptime,
      valueColor: '#00FFD4',
      sub: 'SYSTEMS OPERATIONAL',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B95A5" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      eyeIcon: false
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12,
      padding: '12px 16px',
      borderBottom: '1px solid #1E2A3A',
      flexShrink: 0
    }}>
      {cards.map((card, i) => (
        <div key={i} style={{
          background: '#111827',
          border: '1px solid #1E2A3A',
          borderRadius: 8,
          padding: '12px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          minWidth: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: '#8B95A5', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {card.label}
            </span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {card.eyeIcon && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
              {card.icon}
            </div>
          </div>
          <div style={{
            fontSize: i === 3 ? 24 : 32,
            fontWeight: 700,
            color: card.valueColor,
            fontFamily: 'JetBrains Mono, monospace',
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}>
            {card.value}
          </div>
          {card.sub && (
            <div style={{ fontSize: 9, color: '#4A5568', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {card.sub}
            </div>
          )}
          {i === 1 && (
            <div style={{
              height: 2,
              background: '#1E2A3A',
              borderRadius: 1,
              marginTop: 4
            }}>
              <div style={{
                height: '100%',
                width: `${(onlineNow / 42) * 100}%`,
                background: '#00FFD4',
                borderRadius: 1,
                boxShadow: '0 0 6px rgba(0,255,212,0.6)'
              }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
