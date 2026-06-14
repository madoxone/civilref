import { DISCLOSURE_CONTENT } from '../data/disclosure-content.js';

export function DisclosureView() {
  return (
    <div style={{ maxWidth: 720 }}>
      <h2 className="text-[22px] font-semibold text-text mb-2 tracking-tight">Where we stand, professionally</h2>
      <p className="text-[13px] text-textSub leading-relaxed mb-6">{DISCLOSURE_CONTENT.intro}</p>
      {DISCLOSURE_CONTENT.sections.map((s, i) => {
        const isLast = i === DISCLOSURE_CONTENT.sections.length - 1;
        return (
          <div key={i} className={`mb-6 pb-6 ${isLast ? '' : 'border-b border-border'}`}>
            <h3 className="text-[15px] font-semibold text-text mb-2">{s.h}</h3>
            <p className="text-[13px] text-textSub leading-relaxed">{s.b}</p>
          </div>
        );
      })}
    </div>
  );
}
