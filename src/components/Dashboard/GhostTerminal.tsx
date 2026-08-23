import { useEffect, useRef, useState } from 'react';

const initialLogs = [
  { timestamp: '[04:22:01]', message: 'INITIALIZING HANDSHAKE WITH TARGET_82... 0x442A', type: 'info' },
  { timestamp: '[04:22:00]', message: 'BYPASSING WINDOWS DEFEND... SUCCESS', type: 'success' },
  { timestamp: '[04:22:00]', message: 'ESTABLISHING PERSISTENCE LAYER: SCHI-ASR5_V3', type: 'info' },
  { timestamp: '[04:22:01]', message: 'SYNCING SYSTEM METADATA...', type: 'info' },
  { timestamp: '[04:22:01]', message: 'READY FOR COMMAND_', type: 'ready' },
];

const extraLogs = [
  { message: 'SCANNING SUBNET 192.168.1.0/24...', type: 'info' },
  { message: 'NEW NODE DETECTED: 192.168.1.87', type: 'success' },
  { message: 'INITIATING PAYLOAD INJECTION... CONN-0012', type: 'info' },
  { message: 'AES-256-GCM HANDSHAKE VERIFIED', type: 'success' },
  { message: 'EXFILTRATING DATA FROM TARGET_03...', type: 'info' },
  { message: 'LZMA2 COMPRESSION RATIO: 78%', type: 'info' },
  { message: 'PERSISTENCE MODULE ACTIVE ON CONN-0004', type: 'success' },
  { message: 'CONNECTION TIMEOUT: CONN-0006 [RETRY 1/3]', type: 'error' },
];

export default function GhostTerminal() {
  const [logs, setLogs] = useState(initialLogs);
  const bottomRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const ts = `[${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}]`;
      const log = extraLogs[counterRef.current % extraLogs.length];
      counterRef.current++;
      setLogs(prev => [...prev.slice(-20), { timestamp: ts, ...log }]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  function getColor(type: string) {
    switch (type) {
      case 'success': return '#00FF88';
      case 'error': return '#FF0040';
      case 'ready': return '#00FFD4';
      default: return '#00FFD4';
    }
  }

  return (
    <div style={{
      background: '#111827',
      border: '1px solid #1E2A3A',
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '8px 14px',
        borderBottom: '1px solid #1E2A3A',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0
      }}>
        <span style={{ color: '#8B95A5', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em' }}>
          GHOST TERMINAL V2.4
        </span>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 6 }}>
          {['#FF0040', '#FFB800', '#00FF88'].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.6 }} />
          ))}
        </div>
      </div>

      {/* Terminal body */}
      <div style={{
        background: '#0A0E14',
        padding: '12px 14px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11,
        lineHeight: 1.8,
        overflowY: 'auto',
        maxHeight: 160,
        minHeight: 120
      }}>
        {logs.map((log, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: 8,
              animation: i === logs.length - 1 ? 'typing-line 0.3s ease forwards' : 'none',
              opacity: 1
            }}
          >
            <span style={{ color: '#4A5568', flexShrink: 0 }}>{log.timestamp}</span>
            <span style={{ color: '#4A8A6A', flexShrink: 0 }}>▶</span>
            <span style={{
              color: getColor(log.type),
              fontWeight: log.type === 'ready' ? 700 : 400
            }}>
              {log.message}
            </span>
          </div>
        ))}
        {/* Cursor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span style={{ color: '#4A5568' }}>[{new Date().toTimeString().slice(0,8).replace(/:/g, ':').replace(/(\d{2}):(\d{2}):(\d{2})/, '[$1:$2:$3]').replace('[', '').replace(']', '')}]</span>
          <span style={{ color: '#4A8A6A' }}>▶</span>
          <span style={{ color: '#00FFD4', fontWeight: 700 }}>
            <span className="blink-cursor">█</span>
          </span>
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
