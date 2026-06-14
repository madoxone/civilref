import { useNavigate, useParams } from 'react-router-dom';
import { DISCS, DISC_COLORS } from '../data/disciplines.js';
import { useIsMobile } from '../hooks/useMediaQuery.js';

/**
 * Route: /:disc
 * Lets the user choose About vs Design.
 */
export function DisciplineView() {
  const { disc } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const d = DISCS[disc];
  if (!d) {
    return (
      <div className="text-center py-16 text-textMuted">
        <div className="text-2xl mb-3">◈</div>
        <div>That discipline does not exist.</div>
        <button onClick={() => navigate('/')} className="mt-5 text-sm text-blue underline bg-transparent border-none cursor-pointer">
          Back home
        </button>
      </div>
    );
  }

  const color = DISC_COLORS[disc];

  return (
    <div>
      <div
        className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-6"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <span className="text-[13px]">{d.icon}</span>
        <span className="text-[11px] font-medium" style={{ color }}>{d.label}</span>
      </div>
      <h2
        className="font-semibold text-text mb-2.5 leading-tight tracking-tight"
        style={{ fontSize: 'clamp(20px,4vw,28px)' }}
      >
        Why are you here today?
      </h2>
      <p className="text-sm text-textSub leading-relaxed mb-7" style={{ maxWidth: 520 }}>
        Two ways to use this. Pick <strong className="text-text">About</strong> if you want to understand what{' '}
        {d.label.toLowerCase()} engineering actually is. Pick <strong className="text-text">Design</strong> if you've
        got a real project and need real numbers.
      </p>

      <div className="grid gap-3.5 mb-6" style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
        <button
          onClick={() => navigate(`/${disc}/about`)}
          className="text-left bg-surface border border-border rounded-xl px-5 py-5 cursor-pointer font-sans transition-all hover:-translate-y-0.5"
          style={{ minHeight: 160 }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.borderColor = color;
              e.currentTarget.style.boxShadow = `0 8px 32px ${color}18`;
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.borderColor = '#1e3050';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <i className="ti ti-book-2 text-[22px]" style={{ color }} />
            <span className="text-[11px] text-textMuted tracking-widest uppercase">Learn the field</span>
          </div>
          <div className="text-[17px] font-semibold text-text mb-2 tracking-tight">About {d.label}</div>
          <div className="text-[13px] text-textSub leading-snug mb-3.5">
            What it covers, the kinds of projects you'd work on, who reviews your work, and what a career looks like.
            Written by Canadian engineers.
          </div>
          <div className="text-xs flex items-center gap-1.5" style={{ color }}>
            Start reading <i className="ti ti-arrow-right text-[13px]" />
          </div>
        </button>

        <button
          onClick={() => navigate(`/${disc}/select-city`)}
          className="text-left bg-surface border border-border rounded-xl px-5 py-5 cursor-pointer font-sans transition-all hover:-translate-y-0.5"
          style={{ minHeight: 160 }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.borderColor = color;
              e.currentTarget.style.boxShadow = `0 8px 32px ${color}18`;
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.borderColor = '#1e3050';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <i className="ti ti-ruler-2 text-[22px]" style={{ color }} />
            <span className="text-[11px] text-textMuted tracking-widest uppercase">I have a project</span>
          </div>
          <div className="text-[17px] font-semibold text-text mb-2 tracking-tight">Start designing</div>
          <div className="text-[13px] text-textSub leading-snug mb-3.5">
            We'll ask which city you're in and a few questions about your project. You'll walk out with the codes that
            apply, the values your municipality uses, and a calculator with a worked example.
          </div>
          <div className="text-xs flex items-center gap-1.5" style={{ color }}>
            Let's go <i className="ti ti-arrow-right text-[13px]" />
          </div>
        </button>
      </div>
    </div>
  );
}
