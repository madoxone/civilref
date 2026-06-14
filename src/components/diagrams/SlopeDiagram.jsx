import { DiagramFrame } from './DiagramFrame.jsx';

export function SlopeDiagram({ color }) {
  return (
    <DiagramFrame title="Gravity sewer slope (isometric)" color={color}
      caption="Gravity sewers are laid on a downward slope so flow reaches the minimum self-cleansing velocity (0.75 m/s) and solids do not settle. Too flat and the pipe clogs; too steep and the flow erodes the pipe and joints.">
      {/* Two manholes connected by a sloped pipe */}
      {/* Upstream manhole (higher) */}
      <g>
        <polygon points="60,80 100,80 100,150 60,150" fill="#2a3548" stroke="#3a4860" strokeWidth="1"/>
        <polygon points="60,80 100,80 118,68 78,68" fill="#34425a" stroke="#3a4860" strokeWidth="1"/>
        <polygon points="100,80 118,68 118,138 100,150" fill="#222d3e" stroke="#3a4860" strokeWidth="1"/>
        <text x="58" y="70" fill={'#9ab0d4'} fontSize="9.5" fontFamily="sans-serif">upstream MH</text>
      </g>
      {/* Downstream manhole (lower) */}
      <g>
        <polygon points="300,140 340,140 340,210 300,210" fill="#2a3548" stroke="#3a4860" strokeWidth="1"/>
        <polygon points="300,140 340,140 358,128 318,128" fill="#34425a" stroke="#3a4860" strokeWidth="1"/>
        <polygon points="340,140 358,128 358,198 340,210" fill="#222d3e" stroke="#3a4860" strokeWidth="1"/>
        <text x="300" y="226" fill={'#9ab0d4'} fontSize="9.5" fontFamily="sans-serif">downstream MH</text>
      </g>
      {/* Sloped pipe between them */}
      <polygon points="95,125 305,185 305,200 95,140" fill={color} stroke="#fff" strokeWidth="1" opacity="0.85"/>
      {/* Flow arrow */}
      <line x1="130" y1="138" x2="280" y2="180" stroke="#fff" strokeWidth="1.5" opacity="0.7" markerEnd="url(#flowArr)"/>
      <defs><marker id="flowArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fff" opacity="0.7"/></marker></defs>
      {/* Slope annotation */}
      <line x1="95" y1="140" x2="305" y2="140" stroke={'#dba94d'} strokeWidth="0.75" strokeDasharray="3,3" opacity="0.6"/>
      <text x="180" y="135" fill={'#dba94d'} fontSize="10" fontFamily="monospace">slope ≥ 0.5%</text>
      <text x="155" y="172" fill="#fff" fontSize="10" fontFamily="sans-serif" opacity="0.8">flow →</text>
    </DiagramFrame>
  );
}
