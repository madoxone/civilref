import { useState, useMemo } from 'react';
import { GLOSSARY } from '../../data/glossary.js';

const GLOSSARY_MAP = Object.fromEntries(GLOSSARY.map((g) => [g.t.toLowerCase(), g]));

// Terms we auto-link inside requirement text. Longer phrases first so they win the match.
const LINKABLE_TERMS = [
  'self-cleansing velocity', 'peaking factor', 'bearing capacity', 'stopping sight distance',
  'design speed', 'exposure class', 'w/cm', 'CCTV', 'SDR 35', 'P.Eng.', 'AHJ', 'IDF', 'ESAL',
  'AADT', 'LOS', 'SWM', 'TSS', 'RSC', 'REC', 'QP', 'CBR', 'DLA', 'URP', 'SSD', 'HMA', 'CFEM',
  'NBC', 'CSA', 'MECP', 'MTO', 'TAC',
];

const PHRASE_DEFS = {
  'self-cleansing velocity': 'Minimum water speed in a sewer pipe that keeps solids from settling. Below this, the pipe clogs over time.',
  'peaking factor':          'Multiplier applied to average daily flow to estimate peak flow. Always design sewers to peak flow.',
  'bearing capacity':        'The maximum pressure a soil can support before failure. Foundations must not exceed the allowable bearing capacity.',
  'stopping sight distance': 'The minimum distance a driver needs to see an obstacle and stop safely. Governed by design speed.',
  'design speed':            'The speed used to derive all geometric road elements, not the posted speed.',
  'exposure class':          'A CSA A23.1 classification of the environment a concrete element is exposed to. Drives mix design and durability.',
  'w/cm':                    'Water-to-cementitious materials ratio. Lower = stronger, more durable concrete.',
};

/**
 * Renders a string, auto-linking known glossary terms with a tap-to-reveal tooltip.
 * Uses lookarounds (not \b) so terms ending in "." or containing "/" match.
 */
export function GlossaryText({ text }) {
  const [openTerm, setOpenTerm] = useState(null);

  const pattern = useMemo(() => {
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const sorted = [...LINKABLE_TERMS].sort((a, b) => b.length - a.length);
    return new RegExp(`(?<![A-Za-z0-9])(${sorted.map(esc).join('|')})(?![A-Za-z0-9])`, 'gi');
  }, []);

  if (!text || typeof text !== 'string') return text;

  const parts = [];
  let last = 0, m, idx = 0;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const matched = m[0];
    const key = matched.toLowerCase().replace(/\.$/, '');
    const def = PHRASE_DEFS[matched.toLowerCase()] || GLOSSARY_MAP[key]?.d || GLOSSARY_MAP[matched.toLowerCase()]?.d;
    const tid = `${matched}-${idx++}`;
    if (def) {
      parts.push(
        <span key={tid} className="relative inline">
          <span
            onClick={(e) => { e.stopPropagation(); setOpenTerm((o) => (o === tid ? null : tid)); }}
            className="cursor-help text-blue"
            style={{ borderBottom: '1px dotted rgba(90,160,232,0.6)' }}
          >
            {matched}
          </span>
          {openTerm === tid && (
            <span
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-[1.7em] z-[80] w-[260px] bg-surface border border-border rounded-lg px-3 py-2.5 text-xs text-textSub leading-relaxed shadow-2xl font-normal"
            >
              {def}
              <span
                onClick={() => setOpenTerm(null)}
                className="float-right cursor-pointer text-textMuted ml-1.5"
              >
                ×
              </span>
            </span>
          )}
        </span>,
      );
    } else {
      parts.push(matched);
    }
    last = m.index + matched.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
