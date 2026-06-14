import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { DISCS, DISC_COLORS } from '../data/disciplines.js';

function unslug(slug) {
  return slug
    .replace(/-([a-z]{2})$/, ', $1') // ", ON" etc
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export function GuidedFlowView() {
  const { disc, muniSlug } = useParams();
  const navigate = useNavigate();

  const d = DISCS[disc];
  const color = DISC_COLORS[disc];
  if (!d) return null;

  const [qIdx, setQIdx] = useState(0);
  const [picks, setPicks] = useState({});

  const questions = d.questions || [];
  const q = questions[qIdx];

  function pickOption(o) {
    if (o.isIDK) {
      // The IDK helper would normally branch the flow; for now, fall through to
      // the first option as a placeholder. Wire your IDK helper here if needed.
      return;
    }
    const updated = { ...picks, [q.id]: o.id };
    setPicks(updated);

    if (qIdx + 1 < questions.length) {
      setQIdx(qIdx + 1);
    } else {
      // Reached the end. The last pick's id is the subtype.
      navigate(`/${disc}/${muniSlug}/${o.id}`);
    }
  }

  if (!q) {
    return (
      <div className="text-textMuted text-center py-12">
        <div>No questions defined for this discipline yet.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-[11px] text-textMuted mb-4">
        Step {qIdx + 1} of {questions.length} · {unslug(muniSlug)}
      </div>
      <h2 className="text-[18px] font-semibold text-text mb-1.5 tracking-tight leading-snug">{q.q}</h2>
      {q.help && <p className="text-[13px] text-textSub leading-relaxed mb-5">{q.help}</p>}

      <div className="grid gap-2.5 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {q.opts.map((o) => (
          <button
            key={o.id}
            onClick={() => pickOption(o)}
            className="text-left bg-surface border border-border rounded-xl px-4 py-3.5 cursor-pointer font-sans transition-colors hover:border-blue"
            style={{ minHeight: 80 }}
          >
            <div className="flex items-center gap-2.5 mb-1">
              {o.i && <i className={`ti ${o.i} text-base`} style={{ color: o.isIDK ? '#9ab0d4' : color }} />}
              <span className="text-[14px] font-medium text-text">{o.l}</span>
            </div>
            {o.d && <div className="text-xs text-textSub leading-snug">{o.d}</div>}
          </button>
        ))}
      </div>

      {qIdx > 0 && (
        <button
          onClick={() => setQIdx(qIdx - 1)}
          className="text-xs bg-transparent border border-border text-textSub px-3.5 py-1.5 rounded-md cursor-pointer font-sans"
        >
          ← Back a step
        </button>
      )}
    </div>
  );
}
