import { DiagramFrame } from './DiagramFrame.jsx';

export function ConcreteCoverDiagram({ color }) {
  return (
    <DiagramFrame title="Concrete cover & exposure (isometric section)" color={color}
      caption="Concrete cover is the distance from the surface to the nearest reinforcing bar. It protects the steel from corrosion — more cover and a denser, low water-content mix are required where the surface is exposed to de-icing salts (exposure class C-1). Too little cover, or the wrong mix, and the rebar rusts and spalls the concrete.">
      {/* Concrete block (isometric slab/beam) */}
      {/* Top face */}
      <polygon points="80,110 280,110 350,150 150,150" fill="#5a5a64" stroke="#6a6a74" strokeWidth="1"/>
      {/* Front face */}
      <polygon points="80,110 150,150 150,230 80,190" fill="#454550" stroke="#555560" strokeWidth="1"/>
      {/* Right face */}
      <polygon points="150,150 350,150 350,230 150,230" fill="#3e3e48" stroke="#555560" strokeWidth="1"/>
      {/* Exposed surface zone (salt exposure, top) */}
      <polygon points="80,110 280,110 350,150 150,150" fill={'#dba94d'} opacity="0.18"/>
      <text x="180" y="103" fill={'#dba94d'} fontSize="9.5" fontFamily="sans-serif">exposed surface (de-icing salts)</text>
      {/* Rebar (steel bars running through, near faces but set back by cover) */}
      {/* Longitudinal bars on front face, set back = cover */}
      {[168,188,208].map((y,i)=>(
        <line key={i} x1="92" y1={y} x2="338" y2={y-1} stroke={color} strokeWidth="2.2" opacity="0.9"/>
      ))}
      {/* Cover dimension (surface to first bar) */}
      <line x1="360" y1="150" x2="360" y2="168" stroke={'#52d09c'} strokeWidth="1.5"/>
      <line x1="356" y1="150" x2="364" y2="150" stroke={'#52d09c'} strokeWidth="1.5"/>
      <line x1="356" y1="168" x2="364" y2="168" stroke={'#52d09c'} strokeWidth="1.5"/>
      <text x="367" y="163" fill={'#52d09c'} fontSize="10" fontFamily="monospace">cover</text>
      {/* Rebar label */}
      <line x1="200" y1="188" x2="200" y2="245" stroke="#fff" strokeWidth="0.5" opacity="0.5"/>
      <text x="170" y="258" fill={color} fontSize="9.5" fontFamily="sans-serif">reinforcing steel</text>
      <text x="92" y="225" fill="#b8b8c0" fontSize="9.5" fontFamily="sans-serif">concrete</text>
    </DiagramFrame>
  );
}
