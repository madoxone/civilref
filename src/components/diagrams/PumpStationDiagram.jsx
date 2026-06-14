import { DiagramFrame } from './DiagramFrame.jsx';

export function PumpStationDiagram({ color }) {
  return (
    <DiagramFrame title="Pump station & force main (isometric)" color={color}
      caption="A force main is fed by a pump station, not gravity. Sewage collects in a wet well; duty and standby pumps lift it under pressure through the force main. Air release valves at high points prevent air locks, and the velocity must stay between 0.9 and 3.0 m/s.">
      {/* Ground plane */}
      <polygon points="30,150 200,150 300,205 130,205" fill="#1a2436" stroke="#243049" strokeWidth="1" opacity="0.5"/>
      {/* Wet well (sunken cylinder, front cut-away) */}
      <ellipse cx="95" cy="150" rx="42" ry="18" fill="#2a3548" stroke="#3a4860" strokeWidth="1.2"/>
      <path d="M 53 150 L 53 245 A 42 18 0 0 0 137 245 L 137 150" fill="#1c2738" stroke="#3a4860" strokeWidth="1.2"/>
      {/* Wastewater level in wet well */}
      <ellipse cx="95" cy="205" rx="42" ry="17" fill={'#45d0d0'} opacity="0.3"/>
      <path d="M 53 205 L 53 245 A 42 18 0 0 0 137 245 L 137 205 A 42 17 0 0 1 53 205" fill={'#45d0d0'} opacity="0.22"/>
      <text x="62" y="240" fill="#5fcccc" fontSize="9.5" fontFamily="sans-serif">wet well</text>
      {/* Inflow pipe (gravity sewer arriving) */}
      <polygon points="18,168 55,180 55,190 18,178" fill="#5a4a30" stroke="#6a5838" strokeWidth="1"/>
      <text x="8" y="164" fill="#b89968" fontSize="9" fontFamily="sans-serif">inflow</text>
      {/* Two pumps (duty + standby) inside */}
      <rect x="72" y="195" width="14" height="40" rx="2" fill="#444c5a" stroke="#5a6478" strokeWidth="1"/>
      <rect x="100" y="195" width="14" height="40" rx="2" fill={color} stroke="#5a6478" strokeWidth="1"/>
      <text x="60" y="258" fill={'#9ab0d4'} fontSize="9" fontFamily="sans-serif">duty + standby pumps</text>
      {/* Riser + force main leaving under pressure */}
      <rect x="105" y="120" width="9" height="78" fill={color} stroke="#fff" strokeWidth="0.8" opacity="0.9"/>
      <polygon points="109,120 320,120 320,134 109,134" fill={color} stroke="#fff" strokeWidth="0.8" opacity="0.9"/>
      {/* Air release valve at high point */}
      <circle cx="200" cy="120" r="6" fill={'#dba94d'} stroke="#fff" strokeWidth="1"/>
      <line x1="200" y1="114" x2="200" y2="104" stroke={'#dba94d'} strokeWidth="1.5"/>
      <text x="178" y="100" fill={'#dba94d'} fontSize="9" fontFamily="sans-serif">air release valve</text>
      {/* Pressure flow arrow */}
      <line x1="150" y1="127" x2="300" y2="127" stroke="#fff" strokeWidth="1.5" opacity="0.65" markerEnd="url(#pmArr)"/>
      <defs><marker id="pmArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fff" opacity="0.65"/></marker></defs>
      <text x="250" y="115" fill="#cfe0f8" fontSize="9.5" fontFamily="sans-serif">force main (pressurized)</text>
      <text x="225" y="148" fill="#fff" fontSize="9" fontFamily="sans-serif" opacity="0.6">0.9–3.0 m/s</text>
    </DiagramFrame>
  );
}
