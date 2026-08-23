import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  {
    path: '/',
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    )
  },
  {
    path: '/connections',
    label: 'Connections',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="5" height="5" rx="1"/>
        <rect x="17" y="7" width="5" height="5" rx="1"/>
        <rect x="9" y="14" width="6" height="6" rx="1"/>
        <path d="M4.5 12v3h15v-3"/>
        <path d="M12 14v-3"/>
      </svg>
    )
  },
  {
    path: '/files',
    label: 'File Manager',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    )
  },
  {
    path: '/payloads',
    label: 'Payloads',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    )
  },
  {
    path: '/analytics',
    label: 'Analytics',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    )
  }
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: 200,
          background: '#0D1117',
          borderRight: '1px solid #1E2A3A',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          zIndex: 50,
          position: 'relative'
        }}
        className={`
          lg:relative lg:translate-x-0 lg:flex
          fixed top-0 left-0 h-full transition-transform duration-300
          ${mobileOpen ? 'translate-x-0 flex' : '-translate-x-full hidden lg:flex'}
        `}
      >
        {/* Logo */}
        <div style={{
          padding: '16px 16px',
          borderBottom: '1px solid #1E2A3A',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          minHeight: 56
        }}>
          <div style={{
            width: 32, height: 32,
            background: '#00FFD4',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A0E17">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={{
            fontWeight: 700,
            fontSize: 16,
            color: '#FFFFFF',
            letterSpacing: '0.05em',
            fontFamily: 'JetBrains Mono, monospace'
          }}>GHOSTRAT</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {navItems.map((item) => {
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 12px',
                  borderRadius: 6,
                  marginBottom: 2,
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#0A0E17' : '#8B95A5',
                  background: isActive ? '#00FFD4' : 'transparent',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(0, 255, 212, 0.1)';
                    (e.currentTarget as HTMLElement).style.color = '#00FFD4';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#8B95A5';
                  }
                }}
              >
                <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom info */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid #1E2A3A',
          fontSize: 11
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, color: '#8B95A5' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B95A5" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
            </svg>
            Settings
          </div>
          <div style={{ color: '#4A5568', fontSize: 10 }}>
            <span>CPU <span style={{ color: '#00FFD4' }}>12%</span></span>
            <br />
            <span>RAM <span style={{ color: '#00FFD4' }}>350MB</span></span>
            <br />
            <span>LATENCY <span style={{ color: '#00FFD4' }}>4ms</span></span>
          </div>
          <div style={{
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <div style={{
              width: 6, height: 6,
              borderRadius: '50%',
              background: '#00FFD4',
              animation: 'pulse-dot 2s ease-in-out infinite'
            }} />
            <span style={{ color: '#00FFD4', fontSize: 10, fontWeight: 600 }}>ENGINE ACTIVE</span>
          </div>
        </div>
      </aside>
    </>
  );
}
