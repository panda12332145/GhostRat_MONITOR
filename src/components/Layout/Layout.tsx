import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomBar from './BottomBar';

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#0A0E17',
      overflow: 'hidden'
    }}>
      {/* Mobile top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        height: 48,
        background: '#0D1117',
        borderBottom: '1px solid #1E2A3A',
        flexShrink: 0
      }} className="lg:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#00FFD4',
            cursor: 'pointer',
            padding: 4
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <span style={{ marginLeft: 12, fontWeight: 700, fontSize: 15, fontFamily: 'JetBrains Mono, monospace', color: '#FFFFFF' }}>
          GHOSTRAT
        </span>
      </div>

      {/* Main content row */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        
        <main style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <Outlet />
          </div>
          <BottomBar />
        </main>
      </div>
    </div>
  );
}
