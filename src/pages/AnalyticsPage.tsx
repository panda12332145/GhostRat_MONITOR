import { connectionsData } from '../data/connections';

function StatCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{
      background: '#151B28',
      border: '1px solid #1A2332',
      borderRadius: 8,
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }}>
      <span style={{ fontSize: 10, color: '#4A5568', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
      <span style={{ fontSize: 28, fontWeight: 700, color: color || '#FFFFFF', fontFamily: 'JetBrains Mono, monospace' }}>{value}</span>
    </div>
  );
}

export default function AnalyticsPage() {
  const online = connectionsData.filter(c => c.status === 'ONLINE').length;
  const error = connectionsData.filter(c => c.status === 'ERROR').length;
  const analysis = connectionsData.filter(c => c.status === 'ANALYSIS').length;
  const broken = connectionsData.filter(c => c.status === 'BROKEN').length;
  const totalData = connectionsData.reduce((sum, c) => sum + c.data_exfiltrated_mb, 0);

  const statusData = [
    { label: 'Online', count: online, color: '#00FF88', pct: (online / connectionsData.length) * 100 },
    { label: 'Analysis', count: analysis, color: '#FFB800', pct: (analysis / connectionsData.length) * 100 },
    { label: 'Error', count: error, color: '#FF0040', pct: (error / connectionsData.length) * 100 },
    { label: 'Broken', count: broken, color: '#FF6B35', pct: (broken / connectionsData.length) * 100 },
  ];

  const osCounts: Record<string, number> = {};
  connectionsData.forEach(c => {
    const os = c.os.includes('Android') ? 'Android' : c.os.includes('Windows') ? 'Windows' : c.os.includes('iOS') ? 'iOS' : 'Linux';
    osCounts[os] = (osCounts[os] || 0) + 1;
  });

  return (
    <div style={{ padding: '20px', overflowY: 'auto', height: '100%' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 20 }}>Analytics</h1>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        <StatCard label="Total Nodes" value={String(connectionsData.length)} />
        <StatCard label="Online" value={String(online)} color="#00FF88" />
        <StatCard label="Total Data (MB)" value={totalData.toFixed(1)} color="#00FFD4" />
        <StatCard label="Error Nodes" value={String(error)} color="#FF0040" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Status breakdown */}
        <div style={{
          background: '#111827',
          border: '1px solid #1E2A3A',
          borderRadius: 8,
          padding: '16px'
        }}>
          <div style={{ fontSize: 12, color: '#8B95A5', fontWeight: 600, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Status Breakdown
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {statusData.map((item) => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 12 }}>
                  <span style={{ color: item.color }}>{item.label}</span>
                  <span style={{ color: '#8B95A5' }}>{item.count} ({item.pct.toFixed(0)}%)</span>
                </div>
                <div style={{ height: 6, background: '#1E2A3A', borderRadius: 3 }}>
                  <div style={{
                    height: '100%',
                    width: `${item.pct}%`,
                    background: item.color,
                    borderRadius: 3,
                    boxShadow: `0 0 6px ${item.color}60`
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OS breakdown */}
        <div style={{
          background: '#111827',
          border: '1px solid #1E2A3A',
          borderRadius: 8,
          padding: '16px'
        }}>
          <div style={{ fontSize: 12, color: '#8B95A5', fontWeight: 600, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            OS Distribution
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Object.entries(osCounts).map(([os, count]) => {
              const pct = (count / connectionsData.length) * 100;
              const color = os === 'Android' ? '#00FFD4' : os === 'Windows' ? '#4FC3F7' : os === 'iOS' ? '#FF6B35' : '#00FF88';
              return (
                <div key={os}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: 12 }}>
                    <span style={{ color }}>{os}</span>
                    <span style={{ color: '#8B95A5' }}>{count} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div style={{ height: 6, background: '#1E2A3A', borderRadius: 3 }}>
                    <div style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: color,
                      borderRadius: 3
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top data exfiltration */}
        <div style={{
          background: '#111827',
          border: '1px solid #1E2A3A',
          borderRadius: 8,
          padding: '16px',
          gridColumn: '1 / -1'
        }}>
          <div style={{ fontSize: 12, color: '#8B95A5', fontWeight: 600, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Top Data Exfiltration Nodes
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[...connectionsData]
              .sort((a, b) => b.data_exfiltrated_mb - a.data_exfiltrated_mb)
              .slice(0, 5)
              .map((conn, i) => {
                const max = Math.max(...connectionsData.map(c => c.data_exfiltrated_mb));
                const pct = (conn.data_exfiltrated_mb / max) * 100;
                return (
                  <div key={conn.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: '#4A5568', fontSize: 11, width: 16, textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ color: '#8B95A5', fontSize: 11, width: 160, flexShrink: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {conn.device_name}
                    </span>
                    <div style={{ flex: 1, height: 6, background: '#1E2A3A', borderRadius: 3 }}>
                      <div style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: '#00FFD4',
                        borderRadius: 3,
                        boxShadow: '0 0 6px rgba(0,255,212,0.4)'
                      }} />
                    </div>
                    <span style={{ color: '#00FFD4', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', flexShrink: 0, width: 70, textAlign: 'right' }}>
                      {conn.data_exfiltrated_mb.toFixed(1)} MB
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
