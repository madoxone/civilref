import { useNavigate, useParams, useLocation, matchPath } from 'react-router-dom';
import { DISC_COLORS, DISCS } from '../../data/disciplines.js';

/**
 * Reads location to figure out where in the flow the user is, and renders
 * a clickable breadcrumb-like sidebar.
 *
 * Routes the sitemap recognizes:
 *   /:disc                     -> the About/Design chooser
 *   /:disc/about               -> About page
 *   /:disc/:muniSlug           -> Muni picked, in the questions flow
 *   /:disc/:muniSlug/:subtype  -> Result page
 */
export function Sitemap() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  const disc = segments[0];
  const sub  = segments[1];        // 'about' or muniSlug
  const sub2 = segments[2];        // subtype if present

  if (!disc || !DISCS[disc]) return null;

  const color = DISC_COLORS[disc] || '#5aa0e8';
  const discLabel = DISCS[disc].label;

  const onAbout    = sub === 'about';
  const muniSlug   = (!onAbout && sub) ? sub : null;
  const muniLabel  = muniSlug ? muniSlug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()) : null;
  const subtype    = sub2 || null;
  const subtypeLbl = subtype ? DISCS[disc].results?.[subtype]?.title : null;

  const node = (label, active, done, onClick, sub) => (
    <button
      onClick={onClick}
      disabled={!onClick}
      className="w-full flex items-start gap-2.5 px-2 py-1.5 rounded-md text-left bg-transparent border-none font-sans"
      style={{ cursor: onClick ? 'pointer' : 'default', background: active ? `${color}15` : 'transparent' }}
    >
      <span
        className="w-[7px] h-[7px] rounded-full flex-shrink-0 mt-1.5"
        style={{ background: active ? color : done ? `${color}80` : '#1e3050' }}
      />
      <span className="min-w-0">
        <span
          className="text-[11px] block leading-tight"
          style={{ color: active ? color : done ? '#9ab0d4' : '#6a83a8', fontWeight: active ? 600 : 400 }}
        >
          {label}
        </span>
        {sub && <span className="text-[10px] text-textMuted block mt-0.5 truncate">{sub}</span>}
      </span>
    </button>
  );

  return (
    <aside className="w-[200px] flex-shrink-0 border-r border-border py-5 px-3 overflow-y-auto bg-bg">
      <div className="text-[9px] text-textMuted tracking-widest uppercase mb-3.5 pb-2 border-b border-border">
        Sitemap
      </div>
      {node('Home', false, true, () => navigate('/'))}
      {node(discLabel, !sub, !!sub, sub ? () => navigate(`/${disc}`) : null)}

      {onAbout
        ? node('About this discipline', true, false, null)
        : (
          <>
            {muniSlug && node(muniLabel, !sub2, !!sub2, sub2 ? () => navigate(`/${disc}/${muniSlug}`) : null)}
            {subtype && node('Result', true, false, null, subtypeLbl)}
          </>
        )
      }
    </aside>
  );
}
