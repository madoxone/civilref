import { DiagramFrame } from './DiagramFrame.jsx';

export function CrossingDiagram({ color }) {
  return (
    <DiagramFrame title="Watermain–sewer crossing (isometric)" color={color}
      caption="At every crossing the watermain must sit at least 300 mm above the sewer, with 3.0 m horizontal separation elsewhere. This prevents sewage from contaminating the drinking water pipe if either line leaks.">
      {/* ground reference plane */}
      <polygon points="40,80 250,80 380,150 170,150" fill="#1a2436" stroke="#243049" strokeWidth="1" opacity="0.5"/>
      {/* Sewer (lower, running left-front to right-back) */}
      <g>
        <polygon points="60,210 300,210 360,178 120,178" fill="#5a4a30" stroke="#6a5838" strokeWidth="1"/>
        <ellipse cx="60" cy="210" rx="9" ry="16" fill="#3a2f1e" stroke="#6a5838" strokeWidth="1"/>
        <ellipse cx="300" cy="178" rx="9" ry="16" fill="#3a2f1e" stroke="#6a5838" strokeWidth="1" opacity="0.6"/>
        <text x="62" y="235" fill="#b89968" fontSize="10" fontFamily="sans-serif">sewer (lower)</text>
      </g>
      {/* Watermain (upper, running left-back to right-front, crossing above) */}
      <g>
        <polygon points="120,130 360,130 300,162 60,162" fill={color} stroke="#fff" strokeWidth="1" opacity="0.9"/>
        <ellipse cx="120" cy="130" rx="9" ry="16" fill={'#09101e'} stroke="#fff" strokeWidth="1"/>
        <ellipse cx="360" cy="130" rx="9" ry="16" fill={'#09101e'} stroke="#fff" strokeWidth="1" opacity="0.6"/>
        <text x="300" y="120" fill="#cfe0f8" fontSize="10" fontFamily="sans-serif">watermain (upper)</text>
      </g>
      {/* Vertical separation dimension */}
      <line x1="205" y1="150" x2="205" y2="192" stroke={'#52d09c'} strokeWidth="1.5"/>
      <line x1="201" y1="150" x2="209" y2="150" stroke={'#52d09c'} strokeWidth="1.5"/>
      <line x1="201" y1="192" x2="209" y2="192" stroke={'#52d09c'} strokeWidth="1.5"/>
      <text x="212" y="175" fill={'#52d09c'} fontSize="11" fontFamily="monospace">≥300mm</text>
    </DiagramFrame>
  );
}
