import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { connectionsData } from '../../data/connections';

function getStatusColor(status: string) {
  switch (status) {
    case 'ONLINE': return '#00FF88';
    case 'ERROR': return '#FF0040';
    case 'ANALYSIS': return '#FFB800';
    case 'BROKEN': return '#FF6B35';
    default: return '#FF0040';
  }
}

// Extra random points for visual richness (South America)
const extraPoints: Array<{ lat: number; lng: number; online: boolean }> = [
  { lat: -23.0, lng: -45.5, online: true },
  { lat: -22.3, lng: -42.5, online: true },
  { lat: -19.0, lng: -47.9, online: false },
  { lat: -24.1, lng: -46.4, online: true },
  { lat: -17.5, lng: -39.7, online: true },
  { lat: -11.4, lng: -37.4, online: false },
  { lat: -14.9, lng: -40.1, online: true },
  { lat: -9.3, lng: -40.5, online: true },
  { lat: -18.9, lng: -48.3, online: false },
  { lat: -26.3, lng: -48.8, online: true },
  { lat: -5.1, lng: -42.8, online: true },
  { lat: -10.2, lng: -48.3, online: false },
  { lat: -20.3, lng: -40.3, online: true },
  { lat: -27.6, lng: -48.5, online: true },
  { lat: -4.9, lng: -37.4, online: true },
  { lat: -29.7, lng: -53.8, online: false },
  { lat: -21.2, lng: -47.8, online: true },
  { lat: -13.4, lng: -41.2, online: true },
  { lat: -6.7, lng: -43.0, online: false },
  { lat: -1.4, lng: -48.4, online: true },
  { lat: -7.2, lng: -35.9, online: true },
  { lat: -3.7, lng: -38.5, online: true },
  { lat: -20.5, lng: -43.6, online: false },
  { lat: -23.5, lng: -47.4, online: true },
  { lat: -22.0, lng: -47.9, online: true },
  { lat: -16.3, lng: -48.9, online: true },
  { lat: -28.7, lng: -49.3, online: false },
  { lat: -31.3, lng: -54.1, online: true },
  { lat: -33.4, lng: -70.6, online: true },
  { lat: -34.6, lng: -58.4, online: true },
  { lat: -12.0, lng: -77.0, online: false },
  { lat: 4.7, lng: -74.1, online: true },
  { lat: 10.5, lng: -66.9, online: true },
  { lat: -0.2, lng: -78.5, online: true },
];

export default function InfiltrationMap() {
  return (
    <div style={{
      background: '#111827',
      border: '1px solid #1E2A3A',
      borderRadius: 8,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid #1E2A3A',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
        background: '#0D1117'
      }}>
        <div style={{
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#00FFD4',
          boxShadow: '0 0 8px #00FFD4',
          animation: 'pulse-dot 2s ease-in-out infinite'
        }} />
        <span style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          GLOBAL INFILTRATION MAP
        </span>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', fontSize: 10 }}>
          <span style={{ color: '#00FF88', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00FF88', display: 'inline-block' }} />
            ONLINE
          </span>
          <span style={{ color: '#FF0040', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF0040', display: 'inline-block' }} />
            OFFLINE
          </span>
          <span style={{ color: '#FFB800', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFB800', display: 'inline-block' }} />
            ANALYSIS
          </span>
        </div>
      </div>

      {/* Map */}
      <div style={{ height: 310, position: 'relative' }}>
        <MapContainer
          center={[-15, -50]}
          zoom={4}
          style={{ height: '100%', width: '100%', background: '#0A1520' }}
          attributionControl={false}
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Extra background points */}
          {extraPoints.map((pt, i) => (
            <CircleMarker
              key={`extra-${i}`}
              center={[pt.lat, pt.lng]}
              radius={5}
              pathOptions={{
                color: pt.online ? '#00FF88' : '#FF0040',
                fillColor: pt.online ? '#00FF88' : '#FF0040',
                fillOpacity: 0.9,
                weight: 0
              }}
            />
          ))}

          {/* Connection markers */}
          {connectionsData.map((conn) => {
            const color = getStatusColor(conn.status);
            return (
              <CircleMarker
                key={conn.id}
                center={[conn.geolocation.latitude, conn.geolocation.longitude]}
                radius={7}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: 1,
                  weight: 2,
                  opacity: 1
                }}
              >
                <Popup>
                  <div style={{
                    background: '#111827',
                    color: '#fff',
                    padding: '10px 14px',
                    borderRadius: 6,
                    border: '1px solid #1E2A3A',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 11,
                    minWidth: 160
                  }}>
                    <div style={{ color, fontWeight: 700, marginBottom: 6 }}>{conn.device_name}</div>
                    <div style={{ color: '#8B95A5' }}>IP: <span style={{ color: '#fff' }}>{conn.ip_address}</span></div>
                    <div style={{ color: '#8B95A5' }}>OS: <span style={{ color: '#fff' }}>{conn.os}</span></div>
                    <div style={{ color: '#8B95A5' }}>City: <span style={{ color: '#fff' }}>{conn.geolocation.city}</span></div>
                    <div style={{ marginTop: 6 }}>
                      <span style={{
                        background: `${color}20`,
                        color,
                        border: `1px solid ${color}`,
                        padding: '2px 6px',
                        borderRadius: 3,
                        fontSize: 10,
                        fontWeight: 600
                      }}>{conn.status}</span>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      <style>{`
        .leaflet-tile { filter: brightness(0.35) saturate(0.2) hue-rotate(180deg) !important; }
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
          border: none !important;
        }
        .leaflet-popup-tip-container { display: none !important; }
        .leaflet-popup-content { margin: 0 !important; }
        .leaflet-control-zoom {
          border: 1px solid #1E2A3A !important;
          background: #111827 !important;
        }
        .leaflet-control-zoom a {
          background: #111827 !important;
          color: #00FFD4 !important;
          border-color: #1E2A3A !important;
          line-height: 26px !important;
          width: 26px !important;
          height: 26px !important;
        }
        .leaflet-control-zoom a:hover {
          background: #1A2332 !important;
        }
        .leaflet-control-attribution { display: none !important; }
      `}</style>
    </div>
  );
}
