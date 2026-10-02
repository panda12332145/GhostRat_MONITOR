import { useState } from 'react';
import { filesData } from '../data/systemData';

type FileItem = typeof filesData.files[0];

function FileIcon({ isDirectory }: { isDirectory: boolean; type: string }) {
  if (isDirectory) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#00FFD4" opacity="0.8">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B95A5" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
    </svg>
  );
}

export default function FileManagerPage() {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(filesData.files[2]);
  const [searchQ, setSearchQ] = useState('');
  const [currentPath, setCurrentPath] = useState('C:\\Windows\\System32');
  const { active_target, files } = filesData;

  const filtered = files.filter(f =>
    searchQ ? f.name.toLowerCase().includes(searchQ.toLowerCase()) : true
  );

  function getFileColor(file: FileItem) {
    if (file.is_directory) return '#00FFD4';
    if (file.type === 'System Library') return '#00FFD4';
    return '#FFFFFF';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Navigation bar */}
      <div style={{
        padding: '8px 16px',
        borderBottom: '1px solid #1E2A3A',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
        background: '#0D1117'
      }}>
        {/* Nav buttons */}
        {[
          { icon: '←', title: 'Back' },
          { icon: '→', title: 'Forward' },
          { icon: '↑', title: 'Up' }
        ].map((btn, i) => (
          <button key={i} title={btn.title} style={{
            background: '#1A2332',
            border: '1px solid #1E2A3A',
            color: '#8B95A5',
            width: 28, height: 28,
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600
          }}>
            {btn.icon}
          </button>
        ))}

        {/* Path breadcrumb */}
        <div style={{
          flex: 1,
          background: '#111827',
          border: '1px solid #1E2A3A',
          borderRadius: 4,
          padding: '4px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          minWidth: 0
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00FFD4" strokeWidth="2">
            <rect x="2" y="4" width="20" height="14" rx="1.5"/>
            <path d="M2 8h20"/>
          </svg>
          <span style={{
            color: '#00FFD4',
            fontSize: 12,
            fontFamily: 'JetBrains Mono, monospace',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {currentPath.split('\\').map((part, i, arr) => (
              <span key={i}>
                {i > 0 && <span style={{ color: '#4A5568' }}> &gt; </span>}
                <span style={{ cursor: 'pointer' }} onClick={() => {
                  setCurrentPath(arr.slice(0, i + 1).join('\\'));
                }}>{part}</span>
              </span>
            ))}
          </span>
        </div>

        {/* Remote target */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 12px',
          background: '#111827',
          border: '1px solid #1E2A3A',
          borderRadius: 4,
          flexShrink: 0
        }}>
          <span style={{ color: '#4A5568', fontSize: 11 }}>REMOTE TARGET:</span>
          <span style={{ color: '#00FFD4', fontSize: 11, fontWeight: 600 }}>
            {active_target.device_name} [{active_target.ip_address}]
          </span>
        </div>
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* File table */}
        <div style={{ flex: 1, overflow: 'auto', minWidth: 0 }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 12
          }}>
            <thead>
              <tr style={{ background: '#0D1117' }}>
                {['NAME', 'TYPE', 'SIZE', 'DATA MODIFIED'].map((col, i) => (
                  <th key={i} style={{
                    padding: '10px 16px',
                    textAlign: 'left',
                    color: '#4A5568',
                    fontWeight: 600,
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid #1E2A3A',
                    whiteSpace: 'nowrap'
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((file, i) => {
                const isSelected = selectedFile?.name === file.name;
                return (
                  <tr
                    key={i}
                    onClick={() => setSelectedFile(file)}
                    style={{
                      background: isSelected ? '#0C2A3A' : (i % 2 === 0 ? '#111827' : '#151B28'),
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                      borderBottom: '1px solid #1A2332'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) (e.currentTarget as HTMLElement).style.background = '#1C2333';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? '#111827' : '#151B28';
                    }}
                  >
                    <td style={{ padding: '9px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FileIcon isDirectory={file.is_directory} type={file.type} />
                        <span style={{
                          color: isSelected ? '#00FFD4' : getFileColor(file),
                          fontWeight: isSelected ? 600 : 400,
                          fontFamily: file.type === 'System Library' || !file.is_directory ? 'JetBrains Mono, monospace' : 'inherit',
                          fontSize: 12
                        }}>
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '9px 16px', color: isSelected ? '#00FFD4' : '#8B95A5', whiteSpace: 'nowrap' }}>
                      {file.type}
                    </td>
                    <td style={{ padding: '9px 16px', color: '#8B95A5', whiteSpace: 'nowrap' }}>
                      {file.size || '-'}
                    </td>
                    <td style={{ padding: '9px 16px', color: isSelected ? '#00FFD4' : '#4A5568', whiteSpace: 'nowrap' }}>
                      {file.date_modified}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right panel */}
        <div style={{
          width: 220,
          minWidth: 180,
          borderLeft: '1px solid #1E2A3A',
          background: '#0D1117',
          padding: '16px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          flexShrink: 0,
          overflowY: 'auto'
        }}>
          {/* Selected item */}
          {selectedFile && (
            <div>
              <div style={{ fontSize: 10, color: '#4A5568', letterSpacing: '0.08em', marginBottom: 10, textTransform: 'uppercase' }}>
                Selected item
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{
                  width: 32, height: 32,
                  background: '#111827',
                  border: '1px solid #1E2A3A',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileIcon isDirectory={selectedFile.is_directory} type={selectedFile.type} />
                </div>
                <span style={{
                  color: '#00FFD4',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'JetBrains Mono, monospace',
                  wordBreak: 'break-all'
                }}>
                  {selectedFile.name}
                </span>
              </div>

              <div style={{ fontSize: 11, display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 16 }}>
                <div>
                  <span style={{ color: '#4A5568' }}>TYPE: </span>
                  <span style={{ color: '#8B95A5' }}>{selectedFile.type}</span>
                </div>
                <div>
                  <span style={{ color: '#4A5568' }}>SIZE: </span>
                  <span style={{ color: '#8B95A5' }}>{selectedFile.size || '-'}</span>
                </div>
              </div>

              {/* Operations */}
              <div style={{ fontSize: 10, color: '#4A5568', letterSpacing: '0.08em', marginBottom: 8, textTransform: 'uppercase' }}>
                OPERATIONS
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <button className="btn-cyan" style={{ width: '100%', padding: '7px' }}>
                  DOWNLOAD
                </button>
                <button style={{
                  background: 'rgba(255,107,53,0.15)',
                  color: '#FF6B35',
                  border: '1px solid rgba(255,107,53,0.4)',
                  borderRadius: 4,
                  padding: '7px',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: '100%',
                  textTransform: 'uppercase'
                }}>
                  UPLOAD
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  <button className="btn-outline-cyan" style={{ padding: '7px 4px', fontSize: 10 }}>
                    REFRESH
                  </button>
                  <button style={{
                    background: 'rgba(255,0,64,0.12)',
                    color: '#FF0040',
                    border: '1px solid rgba(255,0,64,0.3)',
                    borderRadius: 4,
                    padding: '7px 4px',
                    fontSize: 10,
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}>
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search */}
          <div>
            <div style={{ fontSize: 10, color: '#4A5568', letterSpacing: '0.08em', marginBottom: 8, textTransform: 'uppercase' }}>
              SEARCH SYSTEM
            </div>
            <div style={{ position: 'relative' }}>
              <input
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Filter Files..."
                style={{ paddingLeft: 30 }}
              />
              <svg
                width="12" height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4A5568"
                strokeWidth="2"
                style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}
              >
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
