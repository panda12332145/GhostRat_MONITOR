import { useEffect, useRef } from 'react';

interface GaugeChartProps {
  value: number;
  label: string;
  size?: number;
  color?: string;
}

export default function GaugeChart({ value, label, size = 90, color = '#00FFD4' }: GaugeChartProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.transition = 'stroke-dashoffset 1.2s ease';
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx="45" cy="45" r={radius}
            fill="none"
            stroke="#1A2332"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            ref={circleRef}
            cx="45" cy="45" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              filter: `drop-shadow(0 0 6px ${color}80)`,
              transition: 'stroke-dashoffset 1.2s ease'
            }}
          />
        </svg>
        {/* Center text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: 16,
            fontWeight: 700,
            color: color,
            fontFamily: 'JetBrains Mono, monospace',
            lineHeight: 1
          }}>{value}%</div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#8B95A5', textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'center' }}>
        {label}
      </div>
    </div>
  );
}
