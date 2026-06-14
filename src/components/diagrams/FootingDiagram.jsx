import { DiagramFrame } from './DiagramFrame.jsx';

export function FootingDiagram({ color }) {
  return (
    <DiagramFrame title="Spread footing & frost depth (isometric)" color={color}
      caption="A spread footing spreads the column load over the soil so the applied bearing pressure stays below the allowable bearing capacity. The footing base must sit below the frost line so frost heave cannot lift the foundation.">
      {/* Ground top */}
      <polygon points="40,90 240,90 340,150 140,150" fill="#2a3320" stroke="#3d4a2d" strokeWidth="1"/>
      {/* Front soil face */}
      <polygon points="140,150 340,150 340,255 140,255" fill="#2e2418" stroke="#3a2f22" strokeWidth="1"/>
      {/* Frost line */}
      <line x1="140" y1="185" x2="340" y2="185" stroke="#7fb8e8" strokeWidth="1" strokeDasharray="5,4" opacity="0.8"/>
      <text x="285" y="182" fill="#7fb8e8" fontSize="9.5" fontFamily="sans-serif">frost line</text>
      {/* Column */}
      <polygon points="225,90 250,90 250,210 225,210" fill="#444c5a" stroke="#5a6478" strokeWidth="1"/>
      <polygon points="225,90 250,90 262,82 237,82" fill="#525c6e" stroke="#5a6478" strokeWidth="1"/>
      <text x="255" y="120" fill={'#9ab0d4'} fontSize="10" fontFamily="sans-serif">column load</text>
      {/* Footing (below frost line) */}
      <polygon points="195,210 282,210 282,235 195,235" fill={color} stroke="#fff" strokeWidth="1" opacity="0.9"/>
      <polygon points="195,210 282,210 298,202 211,202" fill={color} stroke="#fff" strokeWidth="1" opacity="0.75"/>
      {/* Bearing pressure arrows */}
      <line x1="205" y1="245" x2="205" y2="235" stroke={'#52d09c'} strokeWidth="1.5" markerEnd="url(#up)"/>
      <line x1="238" y1="248" x2="238" y2="235" stroke={'#52d09c'} strokeWidth="1.5" markerEnd="url(#up)"/>
      <line x1="272" y1="245" x2="272" y2="235" stroke={'#52d09c'} strokeWidth="1.5" markerEnd="url(#up)"/>
      <defs><marker id="up" markerWidth="8" markerHeight="8" refX="4" refY="1" orient="auto"><path d="M0,8 L4,0 L8,8 Z" fill={'#52d09c'}/></marker></defs>
      <text x="200" y="262" fill={'#52d09c'} fontSize="9.5" fontFamily="sans-serif">soil bearing pressure</text>
      <text x="288" y="225" fill="#fff" fontSize="9.5" fontFamily="sans-serif" opacity="0.85">footing</text>
    </DiagramFrame>
  );
}
