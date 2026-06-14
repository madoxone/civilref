import { useNavigate, useLocation } from 'react-router-dom';
import { TABS } from '../../data/nav.js';
import { DISC_COLORS } from '../../data/disciplines.js';
import { useIsMobile } from '../../hooks/useMediaQuery.js';

export function Nav({ onMobileMenu, onSearch }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  // Pick the active tab from the URL.
  // /utilities/... -> "utilities", /glossary -> "glossary", etc.
  const seg = pathname.split('/').filter(Boolean)[0] || null;
  const activeTab = TABS.find((t) => t.id === seg)?.id || null;

  return (
    <nav className="border-b border-border px-3 h-[52px] flex items-center justify-between sticky top-0 bg-bg z-50 flex-shrink-0 gap-2">
      {isMobile && (
        <button
          onClick={onMobileMenu}
          aria-label="Open menu"
          className="bg-transparent border-none text-text p-2 cursor-pointer text-lg min-h-[44px] min-w-[44px]"
        >
          <i className="ti ti-menu-2" />
        </button>
      )}

      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer flex-shrink-0"
      >
        <div className="w-[26px] h-[26px] rounded-md bg-blueDim border border-blue/30 flex items-center justify-center text-[13px] text-blue">◈</div>
        <span className="font-semibold text-[15px] text-text">
          CivilRef<span className="text-blue">.ca</span>
        </span>
      </button>

      {!isMobile && (
        <div className="flex gap-0 overflow-x-auto flex-1 justify-center">
          {TABS.map((t) => {
            const c = t.id !== 'glossary' ? DISC_COLORS[t.id] : '#9ab0d4';
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => navigate(t.id === 'glossary' ? '/glossary' : `/${t.id}`)}
                className="px-3 h-[52px] text-xs bg-transparent border-none cursor-pointer whitespace-nowrap font-sans transition-colors"
                style={{
                  fontWeight: active ? 600 : 400,
                  color: active ? c : '#9ab0d4',
                  borderBottom: active ? `2px solid ${c}` : '2px solid transparent',
                }}
              >
                {t.icon} {t.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex gap-1.5 items-center flex-shrink-0">
        {!isMobile && (
          <button
            onClick={() => navigate('/projects')}
            aria-label="Projects"
            className="bg-surface border border-border rounded-lg px-2.5 py-1.5 cursor-pointer text-textSub text-xs min-h-[38px] flex items-center gap-1"
            style={pathname.startsWith('/projects') ? { background: '#1a3a6a', borderColor: '#5aa0e8', color: '#5aa0e8' } : null}
          >
            <i className="ti ti-folder text-[13px]" /> Projects
          </button>
        )}
        <button
          onClick={onSearch}
          aria-label="Search"
          className="flex items-center gap-1.5 bg-surface border border-border rounded-lg px-2.5 py-1.5 cursor-pointer text-textSub text-xs flex-shrink-0 min-h-[38px] min-w-[38px] justify-center"
        >
          <i className="ti ti-search text-sm" />
        </button>
      </div>
    </nav>
  );
}
