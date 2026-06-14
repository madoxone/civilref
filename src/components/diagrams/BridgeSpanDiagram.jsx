import { DiagramFrame } from './DiagramFrame.jsx';

export function BridgeSpanDiagram({ color }) {
  return (
    <DiagramFrame title="Bridge span & CL-625 loading (isometric)" color={color}
      caption="Canadian highway bridges are designed for the CL-625 truck — a Canada-specific design vehicle, not the American HL-93. The deck spans between abutments (or piers) on girders; the moving truck plus a dynamic load allowance produces the maximum bending moment the girders must carry over a 75–100 year design life.">
      {/* Left abutment */}
      <polygon points="40,170 80,170 80,250 40,250" fill="#3a3a44" stroke="#4a4a54" strokeWidth="1"/>
      <polygon points="40,170 80,170 95,160 55,160" fill="#46464f" stroke="#4a4a54" strokeWidth="1"/>
      {/* Right abutment */}
      <polygon points="330,170 370,170 370,250 330,250" fill="#3a3a44" stroke="#4a4a54" strokeWidth="1"/>
      <polygon points="330,170 370,170 385,160 345,160" fill="#46464f" stroke="#4a4a54" strokeWidth="1"/>
      {/* Deck (spanning, isometric slab) */}
      <polygon points="55,160 345,160 360,150 70,150" fill="#5a5a64" stroke="#6a6a74" strokeWidth="1"/>
      <polygon points="55,160 345,160 345,176 55,176" fill={color} stroke="#fff" strokeWidth="0.8" opacity="0.85"/>
      {/* Girders under deck */}
      {[64,80].map((dy,i)=>(
        <polygon key={i} points={`80,${176+dy-64} 330,${176+dy-64} 330,${182+dy-64} 80,${182+dy-64}`} fill="#33333a" stroke="#44444c" strokeWidth="0.6"/>
      ))}
      <text x="86" y="205" fill={'#9ab0d4'} fontSize="9" fontFamily="sans-serif">girders</text>
      {/* CL-625 truck on deck */}
      <g>
        <rect x="150" y="132" width="60" height="16" rx="2" fill="#2a3548" stroke="#4a90d9" strokeWidth="1"/>
        <rect x="195" y="124" width="22" height="14" rx="2" fill="#34425a" stroke="#4a90d9" strokeWidth="1"/>
        <circle cx="160" cy="150" r="4" fill="#1a1a1e" stroke="#000"/>
        <circle cx="180" cy="150" r="4" fill="#1a1a1e" stroke="#000"/>
        <circle cx="200" cy="150" r="4" fill="#1a1a1e" stroke="#000"/>
        <text x="148" y="120" fill="#7fb8e8" fontSize="10" fontFamily="monospace">CL-625</text>
      </g>
      {/* Span dimension */}
      <line x1="80" y1="240" x2="330" y2="240" stroke={'#dba94d'} strokeWidth="1.2"/>
      <line x1="80" y1="236" x2="80" y2="244" stroke={'#dba94d'} strokeWidth="1.2"/>
      <line x1="330" y1="236" x2="330" y2="244" stroke={'#dba94d'} strokeWidth="1.2"/>
      <text x="185" y="236" fill={'#dba94d'} fontSize="10" fontFamily="monospace">span L</text>
      {/* Moment diagram hint (sagging) */}
      <path d="M 80 265 Q 205 290 330 265" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6"/>
      <text x="170" y="285" fill={color} fontSize="9" fontFamily="sans-serif">max moment at mid-span</text>
    </DiagramFrame>
  );
}
