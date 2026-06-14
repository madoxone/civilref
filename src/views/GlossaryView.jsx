import { useState, useMemo } from 'react';
import { GLOSSARY } from '../data/glossary.js';

export function GlossaryView() {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    if (!q.trim()) return GLOSSARY;
    const needle = q.toLowerCase();
    return GLOSSARY.filter(
      (g) => g.t.toLowerCase().includes(needle) || g.d.toLowerCase().includes(needle),
    );
  }, [q]);

  return (
    <div>
      <h2 className="text-[18px] font-semibold text-text mb-1">The acronym decoder</h2>
      <p className="text-[13px] text-textSub leading-relaxed mb-5">
        Every abbreviation you'll meet in Canadian civil work, defined in language a first-year engineer would actually
        understand. {GLOSSARY.length} terms and counting.
      </p>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Type an acronym, a term, or a hunch…"
        className="w-full bg-surface border border-border rounded-lg px-3.5 py-2.5 text-[13px] text-text font-sans outline-none mb-4"
      />
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-textMuted text-[13px]">
          No matches. Try fewer letters.
        </div>
      ) : (
        <div className="grid gap-2.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {filtered.map((g, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl px-4 py-3">
              <div className="text-[13px] font-semibold text-blue mb-1">{g.t}</div>
              <div className="text-xs text-textSub leading-relaxed">{g.d}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
