import { DiagramFrame } from './DiagramFrame.jsx';

export function PavementDiagram({ color }) {
  return (
    <DiagramFrame title="Pavement layer structure (isometric)" color={color}
      caption="A flexible pavement is built in layers: the asphalt surface carries traffic and sheds water, the granular base spreads the load, and the subgrade is the native soil below. In Canada the granular thickness is often set by frost protection, not just traffic load — the layers must keep frost from reaching a frost-susceptible subgrade.">
      {/* Each layer as an isometric slab, stacked */}
      {/* Subgrade (bottom, thickest) */}
      <polygon points="60,210 280,210 360,250 140,250" fill="#2e2418" stroke="#3a2f22" strokeWidth="1"/>
      <polygon points="60,210 140,250 140,265 60,225" fill="#241d14" stroke="#3a2f22" strokeWidth="1"/>
      <polygon points="140,250 360,250 360,265 140,265" fill="#2a2014" stroke="#3a2f22" strokeWidth="1"/>
      <text x="365" y="262" fill="#a89472" fontSize="9.5" fontFamily="sans-serif">subgrade</text>
      {/* Granular base */}
      <polygon points="60,188 280,188 360,228 140,228" fill="#4a5568" stroke="#5a6578" strokeWidth="1"/>
      <polygon points="60,188 140,228 140,243 60,203" fill="#3a4355" stroke="#5a6578" strokeWidth="1"/>
      <polygon points="140,228 360,228 360,243 140,243" fill="#414b5e" stroke="#5a6578" strokeWidth="1"/>
      <text x="365" y="240" fill="#8595aa" fontSize="9.5" fontFamily="sans-serif">granular base</text>
      {/* Asphalt surface (top) */}
      <polygon points="60,170 280,170 360,210 140,210" fill={color} stroke="#fff" strokeWidth="0.8" opacity="0.85"/>
      <polygon points="60,170 140,210 140,220 60,180" fill={color} stroke="#fff" strokeWidth="0.8" opacity="0.65"/>
      <polygon points="140,210 360,210 360,220 140,220" fill={color} stroke="#fff" strokeWidth="0.8" opacity="0.72"/>
      <text x="365" y="218" fill="#cfe0f8" fontSize="9.5" fontFamily="sans-serif">HMA surface</text>
      {/* Wheel load on top */}
      <ellipse cx="180" cy="178" rx="26" ry="9" fill="#1a1a1e" stroke="#000" strokeWidth="1"/>
      <ellipse cx="180" cy="174" rx="26" ry="9" fill="#33333a" stroke="#000" strokeWidth="1"/>
      <text x="155" y="162" fill="#fff" fontSize="9.5" fontFamily="sans-serif" opacity="0.8">wheel load (ESALs)</text>
      {/* Frost line dashed through subgrade */}
      <line x1="140" y1="255" x2="360" y2="255" stroke="#7fb8e8" strokeWidth="1" strokeDasharray="5,4" opacity="0.7"/>
      <text x="146" y="252" fill="#7fb8e8" fontSize="8.5" fontFamily="sans-serif">frost line</text>
      {/* Load distribution arrows (spreading downward) */}
      <line x1="180" y1="190" x2="155" y2="235" stroke="#fff" strokeWidth="0.6" opacity="0.4"/>
      <line x1="180" y1="190" x2="205" y2="235" stroke="#fff" strokeWidth="0.6" opacity="0.4"/>
    </DiagramFrame>
  );
}
