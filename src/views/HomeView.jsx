import { useNavigate, Link } from 'react-router-dom';
import { TABS } from '../data/nav.js';
import { DISCS, DISC_COLORS } from '../data/disciplines.js';
import { GLOSSARY } from '../data/glossary.js';
import { useIsMobile } from '../hooks/useMediaQuery.js';

export function HomeView({ onOpenSearch }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div
      className="mx-auto fade-up"
      style={{
        maxWidth: isMobile ? 720 : 1080,
        padding: isMobile ? '28px 18px 100px' : '64px 40px 80px',
      }}
    >
      <div className="inline-flex items-center gap-2 bg-surfaceHi border border-border rounded-full px-3.5 py-1 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-green" />
        <span className="text-[11px] text-textSub tracking-wide">
          Made in Canada. Built by engineers. Verified by P.Engs.
        </span>
      </div>

      {isMobile ? (
        <>
          <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-text mb-3">
            The reference you wish you had in first year.
          </h1>
          <p className="text-[14px] text-textSub leading-relaxed mb-6">
            Canadian codes, your city's values, a calculator with a worked example. In four taps.
          </p>
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center gap-2.5 bg-surface border border-borderHi rounded-xl px-4 py-3.5 cursor-pointer text-textSub text-[14px] font-sans mb-7 min-h-[52px] text-left"
          >
            <i className="ti ti-search text-lg text-blue" />
            <span className="flex-1">Search a code, term, or value…</span>
            <span className="text-[11px] text-textMuted bg-bg border border-border px-2 py-0.5 rounded-md">
              quick
            </span>
          </button>
          <div className="text-[11px] text-textMuted tracking-widest uppercase mb-2">Or pick a discipline</div>
          <div className="flex flex-col gap-1.5 mb-7">
            {TABS.filter((t) => t.id !== 'glossary').map((t) => {
              const d = DISCS[t.id];
              const c = DISC_COLORS[t.id];
              return (
                <button
                  key={t.id}
                  onClick={() => navigate(`/${t.id}`)}
                  className="bg-surface border border-border rounded-xl px-4 py-3.5 text-left cursor-pointer font-sans flex items-center gap-3.5 min-h-[60px]"
                >
                  <div className="text-[22px] w-7 text-center flex-shrink-0" style={{ color: c }}>
                    {t.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold text-text mb-0.5">{t.label}</div>
                    <div className="text-[11px] text-textSub truncate">{d.desc}</div>
                  </div>
                  <i className="ti ti-chevron-right text-textMuted text-base flex-shrink-0" />
                </button>
              );
            })}
            <button
              onClick={() => navigate('/glossary')}
              className="bg-surface border border-dashed border-border rounded-xl px-4 py-3.5 text-left cursor-pointer font-sans flex items-center gap-3.5 min-h-[60px]"
            >
              <div className="text-[22px] w-7 text-center text-textSub flex-shrink-0">≡</div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-textSub mb-0.5">Glossary</div>
                <div className="text-[11px] text-textSub">{GLOSSARY.length}+ acronyms decoded.</div>
              </div>
              <i className="ti ti-chevron-right text-textMuted text-base flex-shrink-0" />
            </button>
          </div>
        </>
      ) : (
        <>
          <h1
            className="font-semibold leading-tight tracking-tight text-text mb-4"
            style={{ fontSize: 'clamp(28px,4vw,44px)', maxWidth: 780 }}
          >
            The civil engineering reference you wish you had in your first year.
          </h1>
          <p className="text-[15px] text-textSub leading-relaxed mb-6" style={{ maxWidth: 640 }}>
            Pick your discipline. Tell us where the project is. Answer a few plain questions. We hand back the codes
            that apply, the values that work in your city, and a calculator with a worked example. No searching, no
            guessing, no vendor calls.
          </p>
          <p
            className="text-[13px] text-textMuted italic leading-relaxed mb-12"
            style={{ maxWidth: 640 }}
          >
            Built for the junior engineer who got handed a watermain replacement on day three. The PM running a project
            two provinces away from where they grew up. The intern who's been told to "just look it up" and doesn't know
            where to start.
          </p>
          <div
            className="grid gap-3.5 mb-9"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
          >
            {TABS.filter((t) => t.id !== 'glossary').map((t) => {
              const d = DISCS[t.id];
              const c = DISC_COLORS[t.id];
              return (
                <button
                  key={t.id}
                  onClick={() => navigate(`/${t.id}`)}
                  className="bg-surface border border-border rounded-xl px-5 py-5 text-left cursor-pointer transition-all font-sans hover:-translate-y-0.5"
                  style={{ minHeight: 120 }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = c;
                    e.currentTarget.style.boxShadow = `0 8px 32px ${c}18`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1e3050';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="text-[26px] mb-3.5" style={{ color: c }}>
                    {t.icon}
                  </div>
                  <div className="text-[15px] font-semibold text-text mb-1.5 tracking-tight">{t.label}</div>
                  <div className="text-xs text-textSub leading-snug mb-4">{d.desc}</div>
                  <div className="text-xs" style={{ color: c }}>Let's go →</div>
                </button>
              );
            })}
            <button
              onClick={() => navigate('/glossary')}
              className="bg-surface border border-dashed border-border rounded-xl px-5 py-5 text-left cursor-pointer transition-colors font-sans"
              style={{ minHeight: 120 }}
            >
              <div className="text-[26px] text-textSub mb-3.5">≡</div>
              <div className="text-[15px] font-semibold text-textSub mb-1.5">Glossary</div>
              <div className="text-xs text-textSub leading-snug mb-4">
                {GLOSSARY.length}+ civil terms, explained the way you wish your prof had.
              </div>
              <div className="text-xs text-textSub">Browse →</div>
            </button>
          </div>
        </>
      )}

      <div className="pt-5 border-t border-border flex gap-1.5 items-center flex-wrap">
        <span className="text-[11px] text-textSub mr-2">How to read the badges:</span>
        {[
          { c: '#52d09c', bg: '#0d3525', l: 'A real P.Eng. checked this' },
          { c: '#dba94d', bg: '#3a2810', l: 'Checked, with caveats' },
          { c: '#9ab0d4', bg: '#162032', l: 'Not yet reviewed, treat as a draft' },
        ].map(({ c, bg, l }) => (
          <div
            key={l}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5"
            style={{ background: bg }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
            <span className="text-[11px]" style={{ color: c }}>{l}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-5 border-t border-border flex gap-3.5 text-[11px] text-textSub flex-wrap">
        <Link to="/privacy" className="text-textSub underline">Privacy</Link>
        <Link to="/disclosure" className="text-textSub underline">Disclosures</Link>
        <span>· Data hosted in Canada</span>
      </div>
    </div>
  );
}
