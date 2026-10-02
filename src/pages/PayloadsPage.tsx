import { useState } from 'react';
import { payloadTemplates, deploymentHistory } from '../data/systemData';

function PayloadModuleIcon({ type }: { type: string }) {
  return (
    <div style={{
      width: 36, height: 36,
      background: '#1A2332',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }}>
      {type === 'reverse_tcp' && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FFD4" strokeWidth="1.5">
          <polyline points="4,17 10,11 4,5"/><line x1="12" y1="19" x2="20" y2="19"/>
        </svg>
      )}
      {type === 'stealer' && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FFD4" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )}
      {type === 'webcam' && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FFD4" strokeWidth="1.5">
          <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>
        </svg>
      )}
      {type === 'keylogger' && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FFD4" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/>
        </svg>
      )}
      {type === 'screen_capture' && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FFD4" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
          <path d="M9 8l3 3 3-3"/>
        </svg>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isReady = status === 'READY';
  return (
    <span style={{
      padding: '3px 8px',
      borderRadius: 4,
      fontSize: 10,
      fontWeight: 700,
      background: isReady ? 'rgba(0,255,136,0.15)' : 'rgba(255,0,64,0.15)',
      color: isReady ? '#00FF88' : '#FF0040',
      border: `1px solid ${isReady ? 'rgba(0,255,136,0.3)' : 'rgba(255,0,64,0.3)'}`,
      letterSpacing: '0.05em'
    }}>
      {status}
    </span>
  );
}

export default function PayloadsPage() {
  const [lhost, setLhost] = useState('192.168.1.104');
  const [lport, setLport] = useState('4444');
  const [obfuscation, setObfuscation] = useState(85);
  const [persistence, setPersistence] = useState(true);

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
          Payloads Manager
        </h1>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{
            background: 'rgba(0,255,212,0.12)',
            color: '#00FFD4',
            border: '1px solid rgba(0,255,212,0.3)',
            padding: '3px 10px',
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 700
          }}>35 ONLINE</span>
          <span style={{
            background: '#1E2A3A',
            color: '#8B95A5',
            padding: '3px 10px',
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 600
          }}>42 TOTAL</span>
        </div>

        <div style={{ height: 20, width: 1, background: '#1E2A3A' }} />
        <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
          <span style={{ color: '#4A5568' }}>STATUS: <span style={{ color: '#00FF88' }}>CONNECTED</span></span>
          <span style={{ color: '#4A5568' }}>LINK: <span style={{ color: '#00FFD4' }}>STABLE</span></span>
        </div>

        <div style={{ flex: 1 }} />
        <button className="btn-cyan" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
          </svg>
          SCAN SUBNET
        </button>
      </div>

      {/* Subtitle */}
      <div style={{ padding: '10px 20px 0', color: '#8B95A5', fontSize: 13 }}>
        Configure and compile tactical deployment modules for remote execution.
      </div>

      {/* Main content */}
      <div style={{
        flex: 1,
        display: 'flex',
        gap: 16,
        padding: '16px 20px',
        overflow: 'hidden',
        minHeight: 0
      }}>
        {/* Left - modules + history */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto', minWidth: 0 }}>
          {/* Fast Build Modules */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12
            }}>
              <div style={{ width: 8, height: 8, background: '#00FFD4', borderRadius: 1 }} />
              <span style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                FAST BUILD MODULES
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 10
            }}>
              {payloadTemplates.map((tpl) => (
                <div key={tpl.id} style={{
                  background: '#151B28',
                  border: '1px solid #1A2332',
                  borderRadius: 8,
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <PayloadModuleIcon type={tpl.type} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 600 }}>{tpl.name}</div>
                    </div>
                  </div>
                  <p style={{ color: '#8B95A5', fontSize: 11, lineHeight: 1.5, margin: 0 }}>
                    {tpl.description}
                  </p>
                  <button className="btn-cyan" style={{ width: '100%', padding: '8px' }}>
                    GENERATE
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment History */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12
            }}>
              <div style={{ width: 8, height: 8, background: '#00FFD4', borderRadius: 1 }} />
              <span style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                DEPLOYMENT HISTORY
              </span>
            </div>

            <div style={{
              background: '#111827',
              border: '1px solid #1E2A3A',
              borderRadius: 8,
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: '#0D1117' }}>
                    {['BUILD ID', 'TYPE', 'TIMESTAMP', 'SIZE', 'STATUS', 'ACTION'].map((col, i) => (
                      <th key={i} style={{
                        padding: '10px 14px',
                        textAlign: 'left',
                        color: '#4A5568',
                        fontWeight: 600,
                        fontSize: 10,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        borderBottom: '1px solid #1E2A3A',
                        whiteSpace: 'nowrap'
                      }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deploymentHistory.map((item, i) => (
                    <tr key={i} style={{
                      background: i % 2 === 0 ? '#111827' : '#151B28',
                      borderBottom: '1px solid #1A2332'
                    }}>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{
                          color: '#00FFD4',
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: 12
                        }}>{item.build_id}</span>
                      </td>
                      <td style={{ padding: '10px 14px', color: '#8B95A5' }}>{item.type}</td>
                      <td style={{ padding: '10px 14px', color: '#8B95A5' }}>{item.timestamp}</td>
                      <td style={{ padding: '10px 14px', color: '#8B95A5' }}>{item.size}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <StatusBadge status={item.status} />
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <button style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#00FFD4',
                          fontSize: 11,
                          cursor: 'pointer',
                          fontWeight: 600,
                          textDecoration: 'underline',
                          textUnderlineOffset: 2
                        }}>
                          DOWNLOAD
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right - Build Config */}
        <div style={{
          width: 240,
          minWidth: 200,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 0
        }}>
          <div style={{
            background: '#111827',
            border: '1px solid #1E2A3A',
            borderRadius: 8,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, background: '#00FFD4', borderRadius: 1 }} />
              <span style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em' }}>
                BUILD CONFIG
              </span>
            </div>

            {/* LHOST */}
            <div>
              <div style={{ fontSize: 10, color: '#4A5568', letterSpacing: '0.08em', marginBottom: 6, textTransform: 'uppercase' }}>
                LHOST (LISTENER)
              </div>
              <input
                value={lhost}
                onChange={e => setLhost(e.target.value)}
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}
              />
            </div>

            {/* LPORT */}
            <div>
              <input
                value={lport}
                onChange={e => setLport(e.target.value)}
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700 }}
              />
            </div>

            {/* Obfuscation */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 10, color: '#4A5568', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  OBFUSCATION
                </span>
                <span style={{ fontSize: 10, color: '#00FFD4', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
                  LEVEL: {obfuscation}%
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={obfuscation}
                  onChange={e => setObfuscation(Number(e.target.value))}
                  style={{
                    width: '100%',
                    appearance: 'none',
                    height: 4,
                    background: `linear-gradient(to right, #00FFD4 ${obfuscation}%, #1E2A3A ${obfuscation}%)`,
                    borderRadius: 2,
                    outline: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>

            {/* Persistence */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: '#8B95A5', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                PERSISTENCE
              </span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={persistence}
                  onChange={e => setPersistence(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            {/* Build button */}
            <button
              className="btn-cyan"
              style={{
                width: '100%',
                padding: '10px',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.04em',
                boxShadow: '0 0 16px rgba(0,255,212,0.25)'
              }}
            >
              INITIALIZE CUSTOM BUILD
            </button>

            {/* Note */}
            <p style={{
              fontSize: 9,
              color: '#4A5568',
              lineHeight: 1.5,
              margin: 0
            }}>
              <span style={{ color: '#8B95A5' }}>NOTE:</span> All payloads are compiled with Ghost polymorphic engine to evade signature-based detection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
