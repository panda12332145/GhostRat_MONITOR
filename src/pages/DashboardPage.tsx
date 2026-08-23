import StatsCards from '../components/Dashboard/StatsCards';
import InfiltrationMap from '../components/Dashboard/InfiltrationMap';
import GhostTerminal from '../components/Dashboard/GhostTerminal';
import GaugeChart from '../components/Dashboard/GaugeChart';
import SystemAlerts from '../components/Dashboard/SystemAlerts';
import { systemConfig } from '../data/systemData';

export default function DashboardPage() {
  const { stats, resources } = systemConfig;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Stats cards */}
      <StatsCards
        totalTargets={stats.total_targets}
        onlineNow={stats.online_now}
        activePayloads={stats.active_payloads}
        serverUptime={stats.server_uptime}
      />

      {/* Main content */}
      <div style={{
        flex: 1,
        display: 'flex',
        gap: 12,
        padding: '12px 16px',
        overflow: 'hidden',
        minHeight: 0
      }}>
        {/* Left column - 75% */}
        <div style={{
          flex: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          overflow: 'auto',
          minWidth: 0
        }}>
          <InfiltrationMap />
          <GhostTerminal />
        </div>

        {/* Right column - 25% */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          minWidth: 180,
          maxWidth: 240,
          overflow: 'auto'
        }}>
          {/* Server Resources */}
          <div style={{
            background: '#111827',
            border: '1px solid #1E2A3A',
            borderRadius: 8,
            padding: '12px'
          }}>
            <div style={{
              fontSize: 11,
              color: '#8B95A5',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 16
            }}>
              SERVER RESOURCES
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <GaugeChart value={resources.cpu_percentage} label="CPU" />
              <GaugeChart value={resources.ram_percentage} label="RAM" />
            </div>
          </div>

          <SystemAlerts />
        </div>
      </div>
    </div>
  );
}
