import { DiagramFrame } from './DiagramFrame.jsx';

export function RoadDiagram({ color }) {
  return (
    <DiagramFrame title="Urban road cross-section (isometric)" color={color}
      caption="A typical urban cross-section: travel lanes crowned for drainage, with curb, sidewalk, and often a bike lane. Lane width and cross-fall come from the TAC Geometric Design Guide and the design speed.">
      {/* Road base (front face) */}
      <polygon points="40,170 300,170 360,200 100,200" fill="#2a2a2e" stroke="#3a3a40" strokeWidth="1"/>
      {/* Road surface (top) */}
      <polygon points="40,150 300,150 360,180 100,180" fill="#33333a" stroke="#44444c" strokeWidth="1"/>
      {/* Lane markings */}
      <line x1="100" y1="162" x2="250" y2="162" stroke={'#dba94d'} strokeWidth="1.5" strokeDasharray="10,8" opacity="0.8"/>
      <line x1="70" y1="178" x2="130" y2="178" stroke="#fff" strokeWidth="1" opacity="0.4"/>
      {/* Sidewalk (raised, left) */}
      <polygon points="40,150 70,150 88,162 58,162" fill="#3a3a42" stroke="#4a4a52" strokeWidth="1"/>
      <polygon points="40,150 58,162 58,178 40,166" fill="#2e2e34" stroke="#4a4a52" strokeWidth="1"/>
      {/* Bike lane (green tint) */}
      <polygon points="70,150 100,150 118,162 88,162" fill={'#52d09c'} stroke="#4a4a52" strokeWidth="0.5" opacity="0.4"/>
      {/* crown indicator */}
      <path d="M 130 156 Q 200 150 270 156" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8"/>
      {/* Labels */}
      <text x="38" y="142" fill={'#9ab0d4'} fontSize="9.5" fontFamily="sans-serif">sidewalk</text>
      <text x="74" y="142" fill="#7fbf9f" fontSize="9.5" fontFamily="sans-serif">bike</text>
      <text x="150" y="142" fill={'#9ab0d4'} fontSize="10" fontFamily="sans-serif">travel lanes (3.0–3.7 m)</text>
      <line x1="200" y1="158" x2="200" y2="135" stroke={color} strokeWidth="0.5" opacity="0.5"/>
      <text x="178" y="130" fill={color} fontSize="9.5" fontFamily="monospace">crown</text>
    </DiagramFrame>
  );
}
