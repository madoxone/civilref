import { useState } from 'react';
import { useIsMobile } from '../../hooks/useMediaQuery.js';
import { FlagButton } from './FlagButton.jsx';

export function Calc({ calc, onResults }) {
  const [vals, setVals] = useState(() => {
    const v = {};
    calc.fields.forEach((f) => {
      v[f.id] = f.default !== undefined ? f.default : f.opts ? f.opts[0].v : 0;
    });
    return v;
  });
  const [results, setResults] = useState(null);
  const [showEx, setShowEx] = useState(false);
  const isMobile = useIsMobile();

  function compute() {
    const r = calc.compute(vals);
    setResults(r);
    if (onResults) onResults({ calcId: calc.id, calcTitle: calc.title, inputs: { ...vals }, outputs: r, ts: Date.now() });
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex justify-between items-start gap-2 mb-1">
        <div className="text-[13px] font-semibold text-text">{calc.title}</div>
        <FlagButton context={`Flagging calculator: ${calc.title}`} compact />
      </div>
      <div className="text-xs text-textSub mb-3.5 leading-relaxed">{calc.desc}</div>

      <button
        onClick={() => setShowEx((o) => !o)}
        className="w-full flex justify-between items-center px-3.5 py-2.5 bg-surfaceHi border border-border rounded-lg cursor-pointer mb-3.5 font-sans"
      >
        <span className="text-xs font-medium text-amber flex items-center gap-2">
          <i className="ti ti-book-2 text-[13px]" />
          Worked example, straight from {calc.worked_example.source.split(',')[0]}
        </span>
        <i className={`ti ti-chevron-${showEx ? 'up' : 'down'} text-textMuted text-[13px]`} />
      </button>

      {showEx && (
        <div className="bg-bg border border-amber/15 rounded-lg p-4 mb-3.5">
          <div className="text-[11px] text-amber mb-2 font-medium">Source: {calc.worked_example.source}</div>
          <div className="text-[13px] font-medium text-text mb-2.5">{calc.worked_example.problem}</div>
          <pre className="font-mono text-xs text-textSub leading-loose whitespace-pre-wrap mb-2.5">
            {calc.worked_example.solution}
          </pre>
          <div className="text-[11px] text-textMuted italic">{calc.worked_example.note}</div>
        </div>
      )}

      <div className="grid gap-2.5 mb-3.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))' }}>
        {calc.fields.map((f) => (
          <div key={f.id}>
            <label className="text-xs text-textSub block mb-1">{f.label}</label>
            {f.type === 'select' ? (
              <select
                value={vals[f.id]}
                onChange={(e) => setVals((v) => ({ ...v, [f.id]: parseFloat(e.target.value) || e.target.value }))}
                className="w-full bg-surfaceHi text-text border border-border rounded-md px-2.5 py-2 text-[13px] font-sans outline-none"
              >
                {f.opts.map((o) => (
                  <option key={o.v} value={o.v}>{o.l}</option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                value={vals[f.id]}
                onChange={(e) => setVals((v) => ({ ...v, [f.id]: parseFloat(e.target.value) || 0 }))}
                step={f.step || 1}
                min={f.min}
                max={f.max}
                className="w-full bg-surfaceHi text-text border border-border rounded-md px-2.5 py-2 text-[13px] font-mono outline-none"
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={compute}
        className="bg-blueDim border border-blue/40 text-blue px-5 py-2.5 rounded-lg cursor-pointer text-[13px] font-medium font-sans min-h-[44px]"
        style={{ marginBottom: results ? 14 : 0 }}
      >
        Calculate →
      </button>

      {results && (
        <div className="bg-bg rounded-lg px-3.5 py-3 mt-3.5">
          {results.map((r, i) => (
            <div
              key={i}
              className={`flex gap-3 py-2 ${i < results.length - 1 ? 'border-b border-border' : ''} ${
                isMobile ? 'flex-col items-stretch gap-1' : 'items-start'
              }`}
            >
              <div className={`flex-shrink-0 text-xs text-textSub leading-snug ${isMobile ? 'w-auto' : 'w-[210px]'}`}>
                {r.l}
              </div>
              <div className="flex-1">
                <div className="font-mono text-[13px] text-blue font-semibold">{r.v}</div>
                {r.flag && (
                  <div
                    className={`text-[11px] mt-0.5 ${
                      r.flag.startsWith('⚠') ? 'text-amber' : r.flag.startsWith('✓') ? 'text-green' : 'text-textSub'
                    }`}
                  >
                    {r.flag}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
