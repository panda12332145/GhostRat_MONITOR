import { useState } from 'react';
import { connectionsData } from '../data/connections';
import ConnectionCard from '../components/Connections/ConnectionCard';

export default function ConnectionsPage() {
  const [filter, setFilter] = useState('ALL');
  const onlineCount = connectionsData.filter(c => c.status === 'ONLINE').length;

  const filtered = filter === 'ALL'
    ? connectionsData
    : connectionsData.filter(c => c.status === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: '14px 20px',
        borderBottom: '1px solid #1E2A3A',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexShrink: 0,
        flexWrap: 'wrap'
      }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
          ACTIVE CONNECTIONS
        </h1>

        {/* Status badges */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{
            background: 'rgba(0,255,212,0.12)',
            color: '#00FFD4',
            border: '1px solid rgba(0,255,212,0.3)',
            padding: '3px 10px',
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 700
          }}>
            {onlineCount} ONLINE
          </span>
          <span style={{
            background: '#1E2A3A',
            color: '#8B95A5',
            padding: '3px 10px',
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 600
          }}>
            {connectionsData.length} TOTAL
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: 20, width: 1, background: '#1E2A3A' }} />

        {/* Status indicators */}
        <div style={{ display: 'flex', gap: 12, fontSize: 11, alignItems: 'center' }}>
          <span style={{ color: '#4A5568' }}>STATUS: <span style={{ color: '#00FF88' }}>CONNECTED</span></span>
          <span style={{ color: '#4A5568' }}>LINK: <span style={{ color: '#00FFD4' }}>STABLE</span></span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Scan button */}
        <button className="btn-cyan" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
          </svg>
          SCAN SUBNET
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{
        padding: '8px 20px',
        borderBottom: '1px solid #1E2A3A',
        display: 'flex',
        gap: 6,
        flexShrink: 0
      }}>
        {['ALL', 'ONLINE', 'ERROR', 'ANALYSIS', 'BROKEN'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              background: filter === f ? 'rgba(0,255,212,0.12)' : 'transparent',
              color: filter === f ? '#00FFD4' : '#8B95A5',
              border: `1px solid ${filter === f ? '#00FFD4' : '#1E2A3A'}`,
              padding: '4px 12px',
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '16px 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 12
        }}>
          {filtered.map(conn => (
            <ConnectionCard key={conn.id} connection={conn} />
          ))}
        </div>
      </div>
    </div>
  );
}
