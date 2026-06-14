import { DiagramFrame } from './DiagramFrame.jsx';

export function GradingDiagram({ color }) {
  return (
    <DiagramFrame title="Site grading & drainage (isometric)" color={color}
      caption="Site grading shapes the ground so water drains away from buildings toward the stormwater system. Canadian practice requires a minimum 2% slope for the first 1.8 m away from a foundation — below that, surface water collects against the wall and causes basement flooding. Fill must be compacted in lifts to support what sits above it.">
      {/* Ground plane (graded, sloping away from building) */}
      <polygon points="40,150 200,150 330,215 170,215" fill="#2a3320" stroke="#3d4a2d" strokeWidth="1"/>
      {/* Building footprint (raised pad) */}
      <polygon points="120,130 200,130 240,150 160,150" fill="#3a3a44" stroke="#4a4a54" strokeWidth="1"/>
      <polygon points="120,130 160,150 160,110 120,90" fill="#33333d" stroke="#4a4a54" strokeWidth="1"/>
      <polygon points="200,130 240,150 240,110 200,90" fill="#2c2c35" stroke="#4a4a54" strokeWidth="1"/>
      <polygon points="120,90 200,90 240,110 160,110" fill="#42424d" stroke="#4a4a54" strokeWidth="1"/>
      <text x="148" y="78" fill={'#9ab0d4'} fontSize="9.5" fontFamily="sans-serif">building</text>
      {/* Slope-away arrows on graded ground (downhill from building) */}
      <line x1="160" y1="158" x2="120" y2="178" stroke={'#5aa0e8'} strokeWidth="1.5" markerEnd="url(#grArr)" opacity="0.85"/>
      <line x1="220" y1="158" x2="270" y2="183" stroke={'#5aa0e8'} strokeWidth="1.5" markerEnd="url(#grArr)" opacity="0.85"/>
      <defs><marker id="grArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={'#5aa0e8'}/></marker></defs>
      {/* Slope annotation */}
      <text x="78" y="190" fill={'#5aa0e8'} fontSize="10" fontFamily="monospace">≥2% away</text>
      <text x="255" y="198" fill={'#5aa0e8'} fontSize="10" fontFamily="monospace">≥2%</text>
      {/* Catch basin at low point */}
      <polygon points="280,195 300,195 300,205 280,205" fill="#1a1a1e" stroke="#44444c" strokeWidth="1"/>
      <line x1="282" y1="197" x2="298" y2="197" stroke="#555" strokeWidth="0.5"/>
      <line x1="282" y1="200" x2="298" y2="200" stroke="#555" strokeWidth="0.5"/>
      <line x1="282" y1="203" x2="298" y2="203" stroke="#555" strokeWidth="0.5"/>
      <text x="270" y="222" fill={'#6a83a8'} fontSize="9" fontFamily="sans-serif">catch basin (low point)</text>
      {/* Water drop hint near foundation showing it moves away */}
      <text x="40" y="145" fill="#9fb37e" fontSize="9" fontFamily="sans-serif">graded ground</text>
    </DiagramFrame>
  );
}
