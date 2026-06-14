import { useNavigate, useParams } from 'react-router-dom';
import { DISCS, DISC_COLORS } from '../data/disciplines.js';
import { ABOUT_CONTENT } from '../data/about-content.js';
import { GlossaryText } from '../components/ui/GlossaryText.jsx';

const isPlaceholder = (t) => typeof t === 'string' && t.trim().startsWith('[') && t.trim().endsWith(']');

export function AboutDisciplineView() {
  const { disc } = useParams();
  const navigate = useNavigate();

  const d = DISCS[disc];
  const content = ABOUT_CONTENT[disc];
  const color = DISC_COLORS[disc];

  if (!d || !content) {
    return (
      <div className="text-center py-16 text-textMuted">
        <div className="text-2xl mb-3">◈</div>
        <div>The About page for this discipline hasn't been written yet.</div>
        <button
          onClick={() => navigate(`/${disc}`)}
          className="mt-5 text-sm text-textSub border border-border px-4 py-2 rounded-lg bg-transparent cursor-pointer"
        >
          ← Back
        </button>
      </div>
    );
  }

  const headlineIsPh = isPlaceholder(content.headline);

  return (
    <div>
      <div
        className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-4"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <span className="text-[13px]">{d.icon}</span>
        <span className="text-[11px] font-medium" style={{ color }}>About {d.label}</span>
      </div>

      <h2
        className="font-semibold text-text leading-tight tracking-tight"
        style={{ fontSize: 'clamp(22px,4vw,32px)', marginBottom: headlineIsPh ? 6 : 24 }}
      >
        {headlineIsPh ? (
          <span className="text-textMuted font-normal italic text-lg">Headline, to be written</span>
        ) : (
          content.headline
        )}
      </h2>

      {headlineIsPh && (
        <div className="bg-amberDim border border-amber/30 rounded-xl px-5 py-3.5 text-[13px] text-amber leading-relaxed mb-8">
          <strong>Honest moment.</strong> Nobody's written this page yet. The sections below are scaffolding, waiting
          for a working {d.label.toLowerCase()} engineer to fill them in. If you came here for an actual project, head
          over to Design instead, that side works.
          <div className="mt-2.5">
            <button
              onClick={() => navigate(`/${disc}/select-city`)}
              className="text-xs bg-amber border-none text-[#1a1408] px-3.5 py-1.5 rounded-md cursor-pointer font-medium font-sans"
            >
              Take me to Design
            </button>
          </div>
        </div>
      )}

      {content.sections.map((s, i) => {
        const empty = isPlaceholder(s.b);
        const isLast = i === content.sections.length - 1;
        return (
          <div key={i} className={`mb-7 pb-7 ${isLast ? '' : 'border-b border-border'}`}>
            <h3 className="text-base font-semibold text-text mb-2.5 flex items-center gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: empty ? '#6a83a8' : color }}
              />
              {s.h}
              {empty && (
                <span className="text-[10px] bg-surfaceHi text-textMuted px-2 py-0.5 rounded-full font-normal tracking-wide">
                  not yet written
                </span>
              )}
            </h3>
            {empty ? (
              <div className="text-[13px] text-textMuted leading-relaxed italic pl-4 border-l-2 border-dashed border-border">
                {s.b}
              </div>
            ) : (
              <div className="text-sm text-textSub leading-relaxed">
                <GlossaryText text={s.b} />
              </div>
            )}
          </div>
        );
      })}

      <div className="bg-surfaceHi border border-dashed border-border rounded-xl px-5 py-4 mt-2 mb-6">
        <div className="text-[13px] font-medium text-text mb-1">Could you write a section?</div>
        <div className="text-xs text-textSub leading-relaxed mb-2.5">
          If you've worked in {d.label.toLowerCase()} long enough to have opinions, we'd take one section in your own
          words over five sections written by someone who hasn't. Your name and credential go right under whatever you
          write.
        </div>
        <a
          href={`mailto:contributors@civilref.ca?subject=About%20${encodeURIComponent(d.label)}%20contribution`}
          className="no-underline"
        >
          <span className="inline-block text-xs bg-blueDim border border-blue/30 text-blue px-3.5 py-1.5 rounded-md cursor-pointer">
            Drop us a line
          </span>
        </a>
      </div>

      <div className="flex gap-2.5 flex-wrap pb-5">
        <button
          onClick={() => navigate(`/${disc}`)}
          className="flex items-center gap-1.5 text-[13px] bg-transparent border border-border text-textSub px-4 py-2 rounded-lg cursor-pointer font-sans min-h-[44px]"
        >
          <i className="ti ti-arrow-left" /> Back
        </button>
        <button
          onClick={() => navigate(`/${disc}/select-city`)}
          className="flex items-center gap-1.5 text-[13px] bg-blueDim border border-blue/30 text-blue px-4 py-2 rounded-lg cursor-pointer font-sans min-h-[44px]"
        >
          <i className="ti ti-ruler-2" /> Switch to Design path
        </button>
      </div>
    </div>
  );
}
