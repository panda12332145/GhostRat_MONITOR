export default function BottomBar() {
  const items = [
    { label: 'LOCAL_IP', value: '87.92.0.4444' },
    { label: 'ENCODING', value: 'UTF-8' },
    { label: 'HANDSHAKE', value: 'VERIFIED' },
    { label: 'SERVER', value: 'V3.4-CORE-HYDRA' },
    { label: 'COMPRESSION', value: 'LZMA2' },
    { label: 'SESSION', value: 'D4E045' },
    { label: 'ENCRYPTION', value: 'AES-256-GCM' },
  ];

  return (
    <div style={{
      height: 32,
      background: '#080B12',
      borderTop: '1px solid #1E2A3A',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      gap: 0,
      flexShrink: 0,
      overflowX: 'auto',
      whiteSpace: 'nowrap'
    }}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '0 12px',
          borderRight: i < items.length - 1 ? '1px solid #1E2A3A' : 'none',
          fontSize: 10,
          flexShrink: 0
        }}>
          <span style={{ color: '#4A5568' }}>{item.label}:</span>
          <span style={{ color: '#00FFD4', fontFamily: 'JetBrains Mono, monospace', fontWeight: 500 }}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}
