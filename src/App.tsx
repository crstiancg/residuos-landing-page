import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ReciclaBot } from './components/ReciclaBot';
import { NavigationSection } from './types';

// Componentes para la estructura vertical continua de la página principal
import { HeroSection } from './components/HeroSection';
import { RoutesModule } from './components/RoutesModule';
import { SegregationModule } from './components/SegregationModule';
import { CompostModule } from './components/CompostModule';
import { CitizenReportModule } from './components/CitizenReportModule';
import { SumacAyniModule } from './components/SumacAyniModule';
import { AppDownloadSection } from './components/AppDownloadSection';
import { MunicipalNewsModule } from './components/MunicipalNewsModule';
import { EnvironmentalImpactGallery } from './components/EnvironmentalImpactGallery';
import { NoticiaDetalleSection } from './sections/NoticiaDetalleSection';

const VALID_SECTIONS: NavigationSection[] = [
  'principal',
  'rutas', 
  'recojo', 
  'fiscalizacion', 
  'campanas', 
  'noticias',
  'app-movil'
];

export default function App() {
  const parseNewsIdFromHash = (hash: string): string | null => {
    const clean = hash.replace('#', '').toLowerCase();
    if (clean.startsWith('noticias/')) {
      return clean.replace('noticias/', '');
    }
    if (clean.startsWith('noticia-')) {
      return clean;
    }
    return null;
  };

  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(() => {
    return parseNewsIdFromHash(window.location.hash);
  });

  const [activeSection, setActiveSection] = useState<NavigationSection>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (VALID_SECTIONS.includes(hash as NavigationSection)) {
      return hash as NavigationSection;
    }
    if (hash === 'segregacion' || hash === 'compostaje') return 'recojo';
    if (hash === 'reporta') return 'fiscalizacion';
    if (hash === 'sumac-ayni' || hash === 'descargar-app') return 'campanas';
    return 'principal';
  });

  // Navegación hacia una noticia individual
  const navigateToNews = useCallback((newsId: string) => {
    setSelectedNewsId(newsId);
    if (window.history.pushState) {
      window.history.pushState(null, '', `#noticias/${newsId}`);
    } else {
      window.location.hash = `#noticias/${newsId}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Navegación suave por scroll entre secciones de la página principal
  const navigateToSection = useCallback((target: string) => {
    let sectionId = target.replace('#', '').toLowerCase();

    // Mapeo retrocompatible de enlaces y alias
    if (sectionId === 'segregacion' || sectionId === 'compostaje') sectionId = 'recojo';
    if (sectionId === 'reporta') sectionId = 'fiscalizacion';
    if (sectionId === 'sumac-ayni') sectionId = 'campanas';
    if (sectionId === 'descargar-app' || sectionId === 'app') sectionId = 'app-movil';
    if (sectionId === 'informacion' || sectionId === 'impacto') sectionId = 'informacion-institucional';
    if (sectionId === 'inicio' || sectionId === 'dashboard') sectionId = 'principal';

    // Si estamos en la vista de detalle de noticia, volver a la página principal
    if (selectedNewsId) {
      setSelectedNewsId(null);
    }

    if (sectionId === 'principal') {
      setActiveSection('principal');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.history.pushState) {
        window.history.pushState(null, '', window.location.pathname);
      }
      return;
    }

    if (VALID_SECTIONS.includes(sectionId as NavigationSection)) {
      setActiveSection(sectionId as NavigationSection);
    }

    const performScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.history.pushState) {
          window.history.pushState(null, '', `#${sectionId}`);
        } else {
          window.location.hash = `#${sectionId}`;
        }
      }
    };

    if (selectedNewsId) {
      setTimeout(performScroll, 80);
    } else {
      performScroll();
    }
  }, [selectedNewsId]);

  // Actualizar sección activa en el menú al hacer scroll por la página
  useEffect(() => {
    if (selectedNewsId) return;

    const sectionsToWatch: NavigationSection[] = [
      'rutas',
      'recojo',
      'fiscalizacion',
      'campanas',
      'noticias'
    ];

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY + 180;

          if (window.scrollY < 280) {
            setActiveSection('principal');
            ticking = false;
            return;
          }

          for (let i = sectionsToWatch.length - 1; i >= 0; i--) {
            const id = sectionsToWatch[i];
            const el = document.getElementById(id);
            if (el) {
              const top = el.offsetTop;
              if (scrollPos >= top) {
                setActiveSection(id);
                ticking = false;
                return;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedNewsId]);

  // Desactivar restauración automática de scroll y enfocar en el tope si es carga inicial
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (!hash || hash === 'principal' || hash === 'banner') {
      window.scrollTo(0, 0);
    }
  }, []);

  // Desplazamiento inicial si la URL ya contiene un hash específico al cargar
  useEffect(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (!hash || hash === 'principal' || hash === 'banner') {
      window.scrollTo(0, 0);
      return;
    }
    if (hash.startsWith('noticias/') || hash.startsWith('noticia-')) return;

    const timer = setTimeout(() => {
      let target = hash;
      if (target === 'segregacion' || target === 'compostaje') target = 'recojo';
      if (target === 'reporta') target = 'fiscalizacion';
      if (target === 'sumac-ayni') target = 'campanas';
      if (target === 'descargar-app' || target === 'app') target = 'app-movil';
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Escuchar cambios de hash manuales o retroceso del navegador
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const newsId = parseNewsIdFromHash(hash);
      if (newsId) {
        setSelectedNewsId(newsId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (selectedNewsId) {
        setSelectedNewsId(null);
      }

      const cleanHash = hash.replace('#', '').toLowerCase();
      if (cleanHash) {
        let target = cleanHash;
        if (target === 'segregacion' || target === 'compostaje') target = 'recojo';
        if (target === 'reporta') target = 'fiscalizacion';
        if (target === 'sumac-ayni') target = 'campanas';
        if (target === 'descargar-app' || target === 'app') target = 'app-movil';
        if (VALID_SECTIONS.includes(target as NavigationSection)) {
          setActiveSection(target as NavigationSection);
        }
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [selectedNewsId]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col selection:bg-[#1474B4] selection:text-white">
      {/* 1. Header Fijo Institucional */}
      <Header activeSection={activeSection} onNavigate={navigateToSection} />

      {/* 2. Contenido Vertical de la Página Principal */}
      <main className="flex-1 w-full" id="main-content-flow">
        {selectedNewsId ? (
          <NoticiaDetalleSection 
            newsId={selectedNewsId}
            onBack={() => {
              setSelectedNewsId(null);
              setTimeout(() => {
                const el = document.getElementById('noticias');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 60);
            }}
            onNavigate={navigateToSection}
            onNavigateToNews={navigateToNews}
          />
        ) : (
          <div className="w-full pb-16">
            {/* ============================================================ */}
            {/* BANNER / CARRUSEL PRINCIPAL                                  */}
            {/* ============================================================ */}
            <section id="banner" className="w-full">
              <HeroSection 
                onScrollToRoutes={() => navigateToSection('rutas')}
                onScrollToReports={() => navigateToSection('fiscalizacion')}
                onScrollToApp={() => navigateToSection('app-movil')}
                onNavigate={(target) => navigateToSection(target)}
              />
            </section>

            {/* ============================================================ */}
            {/* RUTAS DE RECOLECCIÓN                                         */}
            {/* ============================================================ */}
            <div id="rutas" className="scroll-mt-24">
              <RoutesModule />
            </div>

            {/* ============================================================ */}
            {/* RECOJO / SEGREGACIÓN                                         */}
            {/* ============================================================ */}
            <div id="recojo" className="scroll-mt-24">
              <SegregationModule />
            </div>

            {/* ============================================================ */}
            {/* COMPOSTAJE                                                   */}
            {/* ============================================================ */}
            <div id="compostaje" className="scroll-mt-24">
              <CompostModule />
            </div>

            {/* ============================================================ */}
            {/* FISCALIZACIÓN                                                */}
            {/* ============================================================ */}
            <div id="fiscalizacion" className="scroll-mt-24">
              <CitizenReportModule />
            </div>

            {/* ============================================================ */}
            {/* SUMAC AYNI / CAMPAÑAS                                        */}
            {/* ============================================================ */}
            <div id="campanas" className="scroll-mt-24">
              <SumacAyniModule />
            </div>

            {/* ============================================================ */}
            {/* NOTICIAS                                                     */}
            {/* ============================================================ */}
            <div id="noticias" className="scroll-mt-24">
              <MunicipalNewsModule onNavigateToNews={navigateToNews} />
            </div>

            {/* ============================================================ */}
            {/* INFORMACIÓN INSTITUCIONAL: INDICADORES Y GALERÍA            */}
            {/* ============================================================ */}
            <div id="informacion-institucional" className="scroll-mt-24 py-12 sm:py-16 space-y-12 sm:space-y-16">
              {/* Indicadores Operativos Consolidados */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                  <div className="text-center mb-6">
                    <span className="text-[11px] uppercase font-bold text-[#004173] tracking-wider font-heading">
                      Indicadores Operativos Consolidados • Municipalidad Provincial de Puno
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
                    <div className="space-y-1">
                      <div className="text-3xl sm:text-4xl font-extrabold text-[#0088cc] font-heading">29</div>
                      <div className="text-xs font-bold text-[#004173] uppercase tracking-wider font-heading">Rutas Diarias</div>
                      <p className="text-[11px] text-[#64748b] font-body">Cobertura en los 4 conos</p>
                    </div>
                    <div className="space-y-1 pt-4 md:pt-0">
                      <div className="text-3xl sm:text-4xl font-extrabold text-[#16a34a] font-heading">100%</div>
                      <div className="text-xs font-bold text-[#004173] uppercase tracking-wider font-heading">Barrios Atendidos</div>
                      <p className="text-[11px] text-[#64748b] font-body">Centro, Norte, Sur y Alturas</p>
                    </div>
                    <div className="space-y-1 pt-4 md:pt-0">
                      <div className="text-3xl sm:text-4xl font-extrabold text-[#0088cc] font-heading">14</div>
                      <div className="text-xs font-bold text-[#004173] uppercase tracking-wider font-heading">Compactadores</div>
                      <p className="text-[11px] text-[#64748b] font-body">Flota con monitoreo GPS</p>
                    </div>
                    <div className="space-y-1 pt-4 md:pt-0">
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#004173] font-heading">Itapalluni</div>
                      <div className="text-xs font-bold text-[#004173] uppercase tracking-wider font-heading">Relleno Sanitario</div>
                      <p className="text-[11px] text-[#64748b] font-body">Disposición final tecnificada</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Galería de Impacto Ambiental */}
              <EnvironmentalImpactGallery />
            </div>

            {/* ============================================================ */}
            {/* APLICACIÓN MÓVIL OFICIAL - ESTRICTAMENTE AL FINAL DE PÁGINA  */}
            {/* ============================================================ */}
            <div id="app-movil" className="scroll-mt-24">
              <AppDownloadSection />
            </div>
          </div>
        )}
      </main>

      {/* 3. Footer Institucional Fijo */}
      <Footer onNavigate={navigateToSection} />

      {/* 4. Asistente Virtual Municipal ReciclaBot */}
      <ReciclaBot onScrollToSection={navigateToSection} />
    </div>
  );
}
