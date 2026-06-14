import { DiagramFrame } from './DiagramFrame.jsx';

export function TrenchDiagram({ color }) {
  return (
    <DiagramFrame title="Trench cross-section (isometric)" color={color}
      caption="Cover is measured from finished grade to the crown of the pipe. Granular bedding supports and surrounds the pipe; native backfill is compacted in lifts above. Minimum cover protects against frost and traffic loads.">
      <defs>
        <linearGradient id="soilTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2f22"/><stop offset="100%" stopColor="#2a2218"/>
        </linearGradient>
      </defs>
      {/* Ground surface (top face) */}
      <polygon points="40,90 240,90 340,150 140,150" fill="#2a3320" stroke="#3d4a2d" strokeWidth="1"/>
      {/* Left soil face */}
      <polygon points="40,90 140,150 140,250 40,190" fill="#241d14" stroke="#3a2f22" strokeWidth="1"/>
      {/* Front soil face */}
      <polygon points="140,150 340,150 340,250 140,250" fill="#2e2418" stroke="#3a2f22" strokeWidth="1"/>
      {/* Trench cut (excavation void on front face) */}
      <polygon points="190,150 290,150 290,235 190,235" fill={'#09101e'} stroke="#3a2f22" strokeWidth="1"/>
      {/* Native backfill band (top of trench) */}
      <polygon points="190,150 290,150 290,178 190,178" fill="#34291b" stroke="#42352340" strokeWidth="0.5"/>
      {/* Bedding (granular) */}
      <polygon points="190,210 290,210 290,235 190,235" fill="#4a5568" stroke="#5a6578" strokeWidth="0.5"/>
      {/* Pipe (circle, front) */}
      <ellipse cx="240" cy="200" rx="22" ry="22" fill={color} stroke="#fff" strokeWidth="1.5" opacity="0.92"/>
      <ellipse cx="240" cy="200" rx="13" ry="13" fill={'#09101e'} stroke="#fff" strokeWidth="1" opacity="0.6"/>
      {/* Cover dimension line */}
      <line x1="320" y1="150" x2="320" y2="178" stroke={'#dba94d'} strokeWidth="1.5"/>
      <line x1="316" y1="150" x2="324" y2="150" stroke={'#dba94d'} strokeWidth="1.5"/>
      <line x1="316" y1="178" x2="324" y2="178" stroke={'#dba94d'} strokeWidth="1.5"/>
      <text x="326" y="167" fill={'#dba94d'} fontSize="11" fontFamily="monospace">cover</text>
      {/* Labels */}
      <text x="150" y="135" fill="#9fb37e" fontSize="11" fontFamily="sans-serif">finished grade</text>
      <text x="196" y="170" fill="#a89472" fontSize="9.5" fontFamily="sans-serif">native backfill</text>
      <line x1="240" y1="200" x2="160" y2="225" stroke="#fff" strokeWidth="0.5" opacity="0.5"/>
      <text x="95" y="230" fill="#fff" fontSize="10" fontFamily="sans-serif" opacity="0.85">pipe (crown / invert)</text>
      <text x="225" y="250" fill="#8595aa" fontSize="9.5" fontFamily="sans-serif">granular bedding</text>
    </DiagramFrame>
  );
}
