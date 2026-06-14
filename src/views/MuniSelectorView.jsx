import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { DISCS, DISC_COLORS } from '../data/disciplines.js';
import { ALL_MUNIS, VERIFIED_MUNIS } from '../data/municipalities.js';

function slugify(muni) {
  return muni.toLowerCase().replace(/,\s*/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function MuniSelectorView() {
  const { disc } = useParams();
  const navigate = useNavigate();
  const [muni, setMuni] = useState('');

  const d = DISCS[disc];
  const color = DISC_COLORS[disc];
  if (!d) return null;

  function next() {
    if (!muni) return;
    navigate(`/${disc}/${slugify(muni)}`);
  }

  return (
    <div>
      <div
        className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-4"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <span className="text-[13px]">{d.icon}</span>
        <span className="text-[11px] font-medium" style={{ color }}>{d.label}</span>
      </div>

      <h2 className="font-semibold text-text mb-2.5 leading-tight tracking-tight"
        style={{ fontSize: 'clamp(16px,3vw,22px)' }}
      >
        Where's the project?
      </h2>
      <p className="text-[13px] text-textSub leading-relaxed mb-6" style={{ maxWidth: 480 }}>
        Cover depths in Edmonton aren't cover depths in Vancouver. The reviewing authority in Toronto isn't the one in
        Calgary. Pick your city and we'll give you the version that matches.
      </p>

      <select
        value={muni}
        onChange={(e) => setMuni(e.target.value)}
        className="w-full max-w-[420px] bg-surface text-text border border-border rounded-lg px-3.5 py-2.5 text-[14px] font-sans outline-none mb-3.5"
      >
        <option value="">Choose a city…</option>
        {ALL_MUNIS.map((m) => (
          <option key={m} value={m}>
            {m} {VERIFIED_MUNIS.includes(m) ? '✓' : ''}
          </option>
        ))}
      </select>

      {muni && !VERIFIED_MUNIS.includes(muni) && (
        <div
          className="bg-amberDim border border-amber/30 rounded-lg px-3.5 py-2.5 text-xs text-amber leading-relaxed mb-4"
          style={{ maxWidth: 480 }}
        >
          We don't have <strong className="font-medium">{muni}</strong> verified yet. You'll get the provincial baseline
          plus pointers to confirm the local specifics with the city.
        </div>
      )}

      <button
        onClick={next}
        disabled={!muni}
        className="px-5 py-2.5 rounded-lg text-[13px] font-medium cursor-pointer font-sans min-h-[44px] border-none"
        style={{
          background: muni ? color : '#162032',
          color: muni ? '#fff' : '#6a83a8',
          cursor: muni ? 'pointer' : 'not-allowed',
        }}
      >
        Continue →
      </button>
    </div>
  );
}
