import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { DISCS, DISC_COLORS } from '../data/disciplines.js';
import { MUNI_PROFILES, VERIFIED_MUNIS, PROV_CONTEXT } from '../data/municipalities.js';
import { LEARN_INTRO } from '../data/learn-intro.js';
import { CONTEXT_CONTENT } from '../data/context-content.js';
import { useIsMobile } from '../hooks/useMediaQuery.js';
import { useProjects } from '../hooks/useProjects.js';
import { Section } from '../components/ui/Section.jsx';
import { CodeCard } from '../components/ui/CodeCard.jsx';
import { Calc } from '../components/ui/Calc.jsx';
import { FlagButton } from '../components/ui/FlagButton.jsx';
import { GlossaryText } from '../components/ui/GlossaryText.jsx';
import { DIAGRAMS, SECONDARY_DIAGRAMS } from '../components/diagrams/index.js';

function unslug(slug) {
  return slug.replace(/-([a-z]{2})$/, ', $1').replace(/\b\w/g, (m) => m.toUpperCase());
}

function HeadlineNumber({ disc, subtype, muni, color }) {
  const profile = MUNI_PROFILES[muni];
  const data = DISCS[disc]?.results?.[subtype];
  if (!data) return null;

  let value = null;
  let label = null;
  let citySpecific = false;

  if (disc === 'utilities' && profile) {
    const w = profile.water;
    if (subtype === 'watermain' && w.coverWater) {
      value = w.coverWater; label = 'Minimum cover, in ' + muni.split(',')[0]; citySpecific = true;
    } else if (subtype === 'sanitary' && w.coverSan) {
      value = w.coverSan; label = 'Minimum cover, in ' + muni.split(',')[0]; citySpecific = true;
    } else if (subtype === 'storm' && w.idf) {
      value = w.idf; label = 'IDF curve source for ' + muni.split(',')[0]; citySpecific = true;
    }
  }
  if (!value && data.reqs?.length > 0) {
    value = data.reqs[0].v;
    label = data.reqs[0].l;
  }
  if (!value) return null;

  return (
    <div
      className="rounded-xl px-5 py-5 mb-5 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}18, ${color}05)`,
        border: `1px solid ${color}55`,
      }}
    >
      <div
        className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}22 0%, transparent 70%)` }}
      />
      <div className="text-[10px] text-textSub tracking-widest uppercase mb-2 font-medium relative">
        {citySpecific ? "The one you're probably here for" : 'Top of the table'}
      </div>
      <div
        className="font-semibold tracking-tight leading-tight mb-2 font-mono relative"
        style={{ fontSize: 'clamp(22px,3.5vw,30px)', color }}
      >
        {value}
      </div>
      <div className="text-xs text-textSub leading-relaxed relative" style={{ maxWidth: 520 }}>
        {label}{citySpecific ? '' : ' (broader regional value, see the spotlight below for your city)'}
      </div>
    </div>
  );
}

function MuniNote({ muni }) {
  const prov = muni.split(',')[1]?.trim();
  const provBody = PROV_CONTEXT[prov]?.body || 'the municipal engineering department';
  return (
    <div className="bg-amberDim border border-amber/30 rounded-lg px-5 py-3.5 text-[13px] text-amber leading-relaxed mb-5">
      <strong className="font-semibold block mb-1.5">Heads up about {muni}</strong>
      We haven't had a P.Eng. confirm the local specifics for this city yet. What you're seeing is the {prov} provincial
      baseline, which gets you in the ballpark but isn't a substitute for the city's own criteria.
      <div className="mt-2.5 pt-2.5 border-t border-amber/20">
        <strong className="font-medium block mb-1">Three things to do before you stamp anything:</strong>
        <div className="mb-0.5">1. Reach out to {provBody}.</div>
        <div className="mb-0.5">2. Ask for their current Design Criteria for Sewers and Watermains.</div>
        <div>3. Double-check the cover depth, minimum pipe diameter, and IDF curves against that document.</div>
      </div>
    </div>
  );
}

function MuniSpotlight({ disc, subtype, muni, color }) {
  const profile = MUNI_PROFILES[muni];
  const isMobile = useIsMobile();
  if (!profile) return null;

  const w = profile.water || {};
  const rows = [];
  if (disc === 'utilities') {
    if (subtype === 'watermain') {
      if (w.coverWater)  rows.push({ label: 'Min. cover (watermain)', value: w.coverWater, key: true });
      if (w.minDia)      rows.push({ label: 'Min. diameter', value: w.minDia });
      if (w.material)    rows.push({ label: 'Preferred material', value: w.material });
    } else if (subtype === 'sanitary') {
      if (w.coverSan)    rows.push({ label: 'Min. cover (sanitary)', value: w.coverSan, key: true });
      if (w.minSlope)    rows.push({ label: 'Min. slope', value: w.minSlope });
    } else if (subtype === 'storm') {
      if (w.idf)         rows.push({ label: 'IDF curve', value: w.idf, key: true });
      if (w.swmStandard) rows.push({ label: 'SWM standard', value: w.swmStandard });
    }
  }
  if (!rows.length) return null;

  return (
    <div className="bg-surface border border-border rounded-xl px-5 py-4">
      <div className="text-[11px] font-semibold text-textSub uppercase tracking-wider mb-3">
        Specific to {muni}
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className={`flex gap-3 py-2 ${i < rows.length - 1 ? 'border-b border-border' : ''} ${
            isMobile ? 'flex-col gap-1 items-stretch' : 'items-start'
          }`}
        >
          <div className={`flex-shrink-0 text-xs text-textSub leading-snug ${isMobile ? 'w-auto' : 'w-[180px]'}`}>
            {r.label}
          </div>
          <div className="flex-1">
            <div className="text-[13px] leading-snug" style={{ color: r.key ? color : '#e8f0fe', fontWeight: r.key ? 600 : 400 }}>
              <GlossaryText text={r.value} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResultView() {
  const { disc, muniSlug, subtype } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { projects, current, actions } = useProjects();

  const [path, setPath] = useState('design');
  const [calcResult, setCalcResult] = useState(null);

  const muni = unslug(muniSlug || '');
  const data = DISCS[disc]?.results?.[subtype];
  const color = DISC_COLORS[disc];

  if (!data) {
    return (
      <div className="text-center py-12 text-textMuted">
        <div className="text-2xl mb-3">◈</div>
        <div className="mb-2 text-textSub">This one's still cooking.</div>
        <div className="text-xs mb-5">
          We wait for a P.Eng. to review before publishing. Check back, or flag a related page if you'd like us to
          prioritize this topic.
        </div>
        <button
          onClick={() => navigate(`/${disc}`)}
          className="text-[13px] bg-transparent border border-border text-textSub px-4 py-2 rounded-lg cursor-pointer font-sans"
        >
          ← Start over
        </button>
      </div>
    );
  }

  const Diagram = DIAGRAMS[subtype];
  const Secondary = SECONDARY_DIAGRAMS[subtype];
  const tabs = [
    { id: 'learn',  label: 'Learn',  icon: 'ti-bulb',             desc: 'The why' },
    { id: 'design', label: 'Design', icon: 'ti-ruler-2',          desc: 'The numbers' },
    { id: 'codes',  label: 'Codes',  icon: 'ti-file-certificate', desc: 'The rulebook' },
  ];

  return (
    <div>
      <h2 className="text-[20px] font-semibold text-text mb-1 tracking-tight">{data.title}</h2>
      <div className="text-xs text-textMuted mb-5">{DISCS[disc].label} · {muni}</div>

      {!VERIFIED_MUNIS.includes(muni) && <MuniNote muni={muni} />}

      <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1">
        {tabs.map((t) => {
          const active = path === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setPath(t.id)}
              className="px-3.5 py-2 rounded-lg cursor-pointer font-sans text-xs flex items-center gap-1.5 whitespace-nowrap"
              style={{
                background: active ? `${color}15` : 'transparent',
                border: `1px solid ${active ? color : '#1e3050'}`,
                color: active ? color : '#9ab0d4',
                fontWeight: active ? 600 : 400,
              }}
            >
              <i className={`ti ${t.icon} text-sm`} />
              <span>{t.label}</span>
              <span className="text-[10px] opacity-70">· {t.desc}</span>
            </button>
          );
        })}
      </div>

      {path === 'learn' && (
        <div className="flex flex-col gap-5">
          <Section n="" title="What this actually is" color={color}>
            <div className="text-[13px] text-textSub leading-relaxed">
              <GlossaryText
                text={
                  LEARN_INTRO[subtype] ||
                  `${data.title} is governed by the Canadian codes listed under the Codes tab. The Design tab gives you the specific parameters and a worked example. Underlined terms throughout have plain-language definitions, tap any of them.`
                }
              />
            </div>
          </Section>
          {Diagram && (
            <Diagram color={color} />
          )}
          {Secondary && (
            <Secondary color={color} />
          )}
          <div className="text-center">
            <button
              onClick={() => setPath('design')}
              className="bg-transparent border-none cursor-pointer text-xs font-sans"
              style={{ color }}
            >
              Head to Design for the full table and the calculator →
            </button>
          </div>
        </div>
      )}

      {path === 'design' && (
        <div className="flex flex-col gap-5">
          <HeadlineNumber disc={disc} subtype={subtype} muni={muni} color={color} />
          <MuniSpotlight disc={disc} subtype={subtype} muni={muni} color={color} />

          <Section n="1" title="Key design requirements" color={color} action={<FlagButton context="Flagging a design requirement value" compact />}>
            <div className="text-xs text-textMuted mb-3.5 leading-relaxed">
              The block above is what's specific to {muni}. The table below is the broader picture, the values that apply
              across the region. Anything underlined has a definition behind it. Tap to read.
            </div>
            {data.reqs.map((r, i) => (
              <div
                key={i}
                className={`flex gap-3.5 py-2.5 ${i < data.reqs.length - 1 ? 'border-b border-border' : ''} ${
                  isMobile ? 'flex-col items-stretch gap-1' : 'items-start'
                }`}
              >
                <div className={`flex-shrink-0 text-xs text-textSub leading-snug ${isMobile ? 'w-auto' : 'w-[210px]'}`}>
                  <GlossaryText text={r.l} />
                </div>
                <div className="flex-1">
                  <div className="font-mono text-[13px] font-semibold leading-snug" style={{ color }}>{r.v}</div>
                  {r.n && (
                    <div className="text-[11px] text-textSub mt-0.5 leading-snug">
                      <GlossaryText text={r.n} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Section>

          {data.calculator && (
            <Section n="2" title="Calculator" color={color}>
              <Calc calc={data.calculator} onResults={setCalcResult} />
            </Section>
          )}
        </div>
      )}

      {path === 'codes' && (
        <Section n="" title="Applicable Canadian codes" color={color}>
          <div className="text-xs text-textMuted mb-3 leading-relaxed">
            Canadian standards, in plain order. Anything labelled "International" is borrowed from an American or ISO
            standard. Confirm your city accepts the specific edition before you cite it. If something here looks off,
            flag it.
          </div>
          {data.codes.map((c, i) => <CodeCard key={i} c={c} />)}
        </Section>
      )}

      <div className="mt-7 pt-5 border-t border-border text-[11px] text-textMuted leading-relaxed">
        This is reference material, not a stamped design. Anything that gets built in Canada needs a P.Eng. licensed in
        the right province to put their seal on it. And codes change. Always check the city's current criteria before
        you finalize anything.
      </div>

      <div className="flex gap-2.5 flex-wrap mt-5 pb-5">
        <button
          onClick={() => navigate(`/${disc}`)}
          className="flex items-center gap-1.5 text-[13px] bg-transparent border border-border text-textSub px-4 py-2 rounded-lg cursor-pointer font-sans min-h-[44px]"
        >
          <i className="ti ti-refresh" /> Start fresh
        </button>
      </div>
    </div>
  );
}
