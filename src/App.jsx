import { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ui/ErrorBoundary.jsx';
import { ProjectProvider } from './contexts/ProjectContext.jsx';
import { Nav } from './components/layout/Nav.jsx';
import { Sitemap } from './components/layout/Sitemap.jsx';
import { FirstVisitBanner } from './components/layout/FirstVisitBanner.jsx';
import { MobileDrawer } from './components/ui/MobileDrawer.jsx';
import { useIsMobile } from './hooks/useMediaQuery.js';
import { TABS, SECONDARY_TABS } from './data/nav.js';
import { DISC_COLORS } from './data/disciplines.js';

import { HomeView } from './views/HomeView.jsx';
import { DisciplineView } from './views/DisciplineView.jsx';
import { AboutDisciplineView } from './views/AboutDisciplineView.jsx';
import { MuniSelectorView } from './views/MuniSelectorView.jsx';
import { GuidedFlowView } from './views/GuidedFlowView.jsx';
import { ResultView } from './views/ResultView.jsx';
import { GlossaryView } from './views/GlossaryView.jsx';
import { ProjectsView } from './views/ProjectsView.jsx';
import { PrivacyView } from './views/PrivacyView.jsx';
import { DisclosureView } from './views/DisclosureView.jsx';

/**
 * Inner shell, decides whether to show the sitemap based on the current route.
 * Home and meta pages get the full-width treatment; everything else gets the sidebar.
 */
function Shell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = pathname === '/';
  const isMeta = ['/projects', '/privacy', '/disclosure', '/glossary'].includes(pathname);
  const showSidebar = !isHome && !isMeta && !isMobile;

  function go(path) {
    navigate(path);
    setMobileMenuOpen(false);
  }

  const drawer = (
    <MobileDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
      <div className="px-4 pb-3">
        <div className="text-[9px] text-textSub tracking-widest uppercase mb-2.5">Disciplines</div>
        {TABS.map((t) => {
          const c = t.id !== 'glossary' ? DISC_COLORS[t.id] : '#9ab0d4';
          const active = pathname.startsWith(`/${t.id}`);
          return (
            <button
              key={t.id}
              onClick={() => go(t.id === 'glossary' ? '/glossary' : `/${t.id}`)}
              className="w-full flex items-center gap-3 px-3 py-3 bg-transparent border-none rounded-md cursor-pointer font-sans text-[14px] mb-0.5 min-h-[44px]"
              style={{ background: active ? `${c}15` : 'transparent', color: active ? c : '#e8f0fe' }}
            >
              <span className="text-base w-[18px]">{t.icon}</span>
              {t.label}
            </button>
          );
        })}
        <div className="h-px bg-border my-3.5 mx-1" />
        <div className="text-[9px] text-textSub tracking-widest uppercase mb-2.5">More</div>
        {SECONDARY_TABS.map((t) => {
          const active = pathname === `/${t.id}`;
          return (
            <button
              key={t.id}
              onClick={() => go(`/${t.id}`)}
              className="w-full flex items-center gap-3 px-3 py-3 bg-transparent border-none rounded-md cursor-pointer font-sans text-[14px] mb-0.5 min-h-[44px]"
              style={{ background: active ? '#162032' : 'transparent', color: active ? '#e8f0fe' : '#9ab0d4' }}
            >
              <i className={`ti ${t.icon} text-[15px] w-[18px]`} />
              {t.label}
            </button>
          );
        })}
      </div>
    </MobileDrawer>
  );

  // Home renders its own full layout (its own padding, no sidebar).
  if (isHome) {
    return (
      <div className="min-h-screen bg-bg">
        <Nav onMobileMenu={() => setMobileMenuOpen(true)} onSearch={() => {}} />
        <HomeView onOpenSearch={() => {}} />
        <FirstVisitBanner />
        {drawer}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Nav onMobileMenu={() => setMobileMenuOpen(true)} onSearch={() => {}} />
      <div className="flex flex-1 min-h-0">
        {showSidebar && <Sitemap />}
        <div className="flex-1 overflow-y-auto">
          <div
            className="mx-auto fade-up"
            style={{
              maxWidth: isMeta ? 780 : 820,
              padding: isMobile ? '28px 18px 80px' : '40px 32px 80px',
            }}
          >
            <Routes>
              <Route path="/glossary"            element={<GlossaryView />} />
              <Route path="/projects"            element={<ProjectsView />} />
              <Route path="/privacy"             element={<PrivacyView />} />
              <Route path="/disclosure"          element={<DisclosureView />} />

              <Route path="/:disc"               element={<DisciplineView />} />
              <Route path="/:disc/about"         element={<AboutDisciplineView />} />
              <Route path="/:disc/select-city"   element={<MuniSelectorView />} />
              <Route path="/:disc/:muniSlug"     element={<GuidedFlowView />} />
              <Route path="/:disc/:muniSlug/:subtype" element={<ResultView />} />
            </Routes>
          </div>
        </div>
      </div>
      {drawer}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ProjectProvider>
        <Shell />
      </ProjectProvider>
    </ErrorBoundary>
  );
}
