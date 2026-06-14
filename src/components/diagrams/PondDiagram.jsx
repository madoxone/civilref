import { DiagramFrame } from './DiagramFrame.jsx';

export function PondDiagram({ color }) {
  return (
    <DiagramFrame title="Stormwater management pond (isometric)" color={color}
      caption="An SWM pond holds back runoff and releases it slowly so post-development peak flow does not exceed pre-development. A forebay traps sediment first; the outlet structure controls the release rate; a safety bench rings the permanent pool.">
      {/* Pond basin top rim */}
      <ellipse cx="200" cy="150" rx="150" ry="70" fill="#1a2436" stroke="#2d3a52" strokeWidth="1.5"/>
      {/* Water surface */}
      <ellipse cx="200" cy="155" rx="120" ry="54" fill={'#5aa0e8'} opacity="0.35" stroke={'#5aa0e8'} strokeWidth="1"/>
      <ellipse cx="200" cy="158" rx="95" ry="42" fill={'#5aa0e8'} opacity="0.3"/>
      {/* Forebay (small upstream cell) */}
      <ellipse cx="110" cy="135" rx="32" ry="16" fill={'#45d0d0'} opacity="0.4" stroke={'#45d0d0'} strokeWidth="1"/>
      <text x="80" y="120" fill="#5fcccc" fontSize="9.5" fontFamily="sans-serif">forebay</text>
      {/* Inlet */}
      <line x1="50" y1="120" x2="90" y2="132" stroke="#fff" strokeWidth="2" opacity="0.6" markerEnd="url(#inArr)"/>
      <defs><marker id="inArr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fff" opacity="0.6"/></marker></defs>
      <text x="38" y="113" fill="#fff" fontSize="9.5" fontFamily="sans-serif" opacity="0.7">inflow</text>
      {/* Outlet structure */}
      <rect x="288" y="158" width="14" height="22" fill="#444c5a" stroke="#5a6478" strokeWidth="1"/>
      <line x1="302" y1="168" x2="345" y2="178" stroke="#fff" strokeWidth="2" opacity="0.6" markerEnd="url(#inArr)"/>
      <text x="300" y="150" fill={'#9ab0d4'} fontSize="9.5" fontFamily="sans-serif">outlet</text>
      <text x="320" y="195" fill="#fff" fontSize="9.5" fontFamily="sans-serif" opacity="0.7">controlled release</text>
      {/* Safety bench note */}
      <text x="165" y="160" fill="#9fb8d8" fontSize="9.5" fontFamily="sans-serif" opacity="0.8">permanent pool</text>
    </DiagramFrame>
  );
}
