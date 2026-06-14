import { useState } from 'react';
import { CONTRIBUTORS } from '../../data/contributors.js';

const STYLES = {
  high:   { className: 'text-green bg-green/10',     label: 'Verified' },
  medium: { className: 'text-amber bg-amber/10',     label: 'Partially verified' },
  low:    { className: 'text-textMuted bg-surfaceHi', label: 'Unverified' },
};

/**
 * Renders the verifier badge with an optional click-to-reveal contributor card.
 * `ver` is a key into CONTRIBUTORS; if no match, the badge is non-interactive.
 */
export function VerBadge({ ver, date, conf }) {
  const [open, setOpen] = useState(false);
  const style = STYLES[conf] || STYLES.low;
  const contrib = CONTRIBUTORS[ver];

  const dotColor = conf === 'high' ? '#52d09c' : conf === 'medium' ? '#dba94d' : '#6a83a8';

  return (
    <div className="relative inline-block">
      <div
        onClick={() => contrib && setOpen((o) => !o)}
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 ${style.className} ${contrib ? 'cursor-pointer' : ''}`}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: dotColor }} />
        <span className="text-[11px] font-medium">{style.label}</span>
        {contrib && (
          <>
            <span className="text-[11px]">· {contrib.name.split(',')[0]}</span>
            <span className="text-[10px] opacity-70">▾</span>
          </>
        )}
      </div>
      {open && contrib && (
        <div className="absolute left-0 top-[2.4em] bg-surface border border-border rounded-lg p-4 z-[80] w-[282px] shadow-2xl">
          <div className="flex gap-2.5 items-center mb-2.5">
            <div className="w-9 h-9 rounded-full bg-blueDim flex items-center justify-center text-sm font-semibold text-blue flex-shrink-0">
              {contrib.avatar}
            </div>
            <div>
              <div className="text-[13px] font-medium text-text">{contrib.name}</div>
              <div className="text-[11px] text-blue">{contrib.cred}</div>
            </div>
          </div>
          <div className="text-xs text-textSub leading-relaxed mb-2">{contrib.bio}</div>
          <div className="text-[11px] text-textMuted">Verified {date} · {contrib.prov}</div>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2.5 right-3 bg-transparent border-none cursor-pointer text-textMuted text-base"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
