import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Truck, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  FileText
} from 'lucide-react';
import { PUNO_ROUTES } from '../data/punoRoutesData';
import { RouteDetail } from '../types';
import { RouteDetailModal } from './RouteDetailModal';
import { RouteLeafletMap } from './RouteLeafletMap';
import { downloadRoutePDF } from '../utils/pdfGenerator';

export const RoutesModule: React.FC = () => {
  // Ruta seleccionada por defecto: Ruta 01 (para mostrar inmediatamente su recorrido y hacer fitBounds)
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>('ruta-01');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchedStreet, setSearchedStreet] = useState<string | null>(null);
  const [modalRoute, setModalRoute] = useState<RouteDetail | null>(null);

  // Reference for horizontal tabs scrolling
  const tabsScrollRef = useRef<HTMLDivElement>(null);

  // Active route (null si ninguna ruta está seleccionada)
  const activeRoute = useMemo(() => {
    if (!selectedRouteId) return null;
    return PUNO_ROUTES.find((r) => r.id === selectedRouteId) || null;
  }, [selectedRouteId]);

  // Scroll horizontal tabs
  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsScrollRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      tabsScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Ensure active tab is visible when selectedRouteId changes without scrolling the browser window
  useEffect(() => {
    if (selectedRouteId && tabsScrollRef.current) {
      const activeBtn = tabsScrollRef.current.querySelector<HTMLButtonElement>(`[data-route-id="${selectedRouteId}"]`);
      if (activeBtn) {
        const container = tabsScrollRef.current;
        const btnLeft = activeBtn.offsetLeft;
        const btnWidth = activeBtn.offsetWidth;
        const containerWidth = container.clientWidth;
        container.scrollTo({
          left: btnLeft - containerWidth / 2 + btnWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedRouteId]);

  // Search filtering
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];

    return PUNO_ROUTES.filter((route) => {
      return (
        route.name.toLowerCase().includes(q) ||
        route.description.toLowerCase().includes(q) ||
        route.coverageStreets.some((s) => s.toLowerCase().includes(q)) ||
        route.mainPoints.some((p) => p.toLowerCase().includes(q)) ||
        route.sector.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  // Handle selecting a search result
  const handleStreetSelect = (route: RouteDetail, matchedStreet?: string) => {
    setSelectedRouteId(route.id);
    setSearchedStreet(matchedStreet || null);
    setSearchQuery('');
  };

  // Clean formatted strings according to specification:
  // "Compactador C-07"
  const cleanTruckUnit = activeRoute?.truckUnit?.includes('(')
    ? activeRoute.truckUnit.split('(')[0].trim()
    : activeRoute?.truckUnit || '';

  // "Centro Histórico"
  const cleanSector = activeRoute
    ? activeRoute.sector.replace(/Sector \d+ - /, '')
    : '';

  // "Diario (Lun a Dom)"
  const cleanFrequency = activeRoute
    ? activeRoute.frequency
        .replace('Lunes a Domingo', 'Lun a Dom')
        .replace('Lunes, Miércoles y Viernes', 'Lun, Mié y Vie')
        .replace('Martes, Jueves y Sábado', 'Mar, Jue y Sáb')
    : '';

  // Short route code, e.g. "Ruta 03"
  const routeShortCode = activeRoute
    ? `Ruta ${activeRoute.number.toString().padStart(2, '0')}`
    : '';
  const routeIdCode = activeRoute
    ? `R${activeRoute.number.toString().padStart(2, '0')}`
    : '';

  return (
    <section id="rutas" className="py-10 sm:py-14 lg:py-16 bg-white border-b border-[#E9ECEF] relative font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-7">
        
        {/* ============================================================ */}
        {/* 1. ENCABEZADO INSTITUCIONAL DE RUTAS */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[11px] font-bold bg-[#0088cc]/10 text-[#0088cc] border border-[#0088cc]/25 uppercase tracking-wider font-heading">
            <Truck className="w-3.5 h-3.5 text-[#0088cc]" />
            <span>Flota Municipal Satelital • Gerencia GGIRS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#004173] tracking-tight font-heading">
            Consulta las rutas de recolección de residuos sólidos
          </h2>
          <p className="text-sm sm:text-base text-[#64748b] leading-relaxed font-normal max-w-2xl mx-auto font-body">
            Conoce por dónde pasa el recolector y consulta los horarios programados de tu zona.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2. BUSCADOR */}
        {/* ============================================================ */}
        <div className="relative max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-[#0088cc]/20 focus-within:border-[#0088cc] transition-all">
            <div className="flex items-center gap-3 px-3">
              <Search className="w-5 h-5 text-[#0088cc] shrink-0" />
              <input
                type="text"
                id="input-buscador-calles"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchedStreet(null);
                }}
                placeholder="Busca tu calle o barrio (ej. Jr. Lima, Av. Floral, Laykakota, Chanu Chanu)..."
                className="w-full text-xs sm:text-sm md:text-base text-[#1e293b] placeholder-[#94a3b8] bg-transparent border-none outline-hidden py-1.5 font-body"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchedStreet(null);
                  }}
                  className="text-xs font-semibold text-[#64748b] hover:text-[#004173] px-2.5 py-1 bg-slate-100 rounded-md cursor-pointer transition-colors"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Live Search Autocomplete Dropdown */}
            {searchQuery.trim().length > 1 && (
              <div className="mt-2 pt-2 border-t border-slate-100 px-1 max-h-64 overflow-y-auto space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] px-2 py-1 font-heading">
                  Rutas y Calles Coincidentes ({searchResults.length})
                </div>
                {searchResults.length > 0 ? (
                  searchResults.map((r) => {
                    // Check if matched on a specific street
                    const q = searchQuery.toLowerCase().trim();
                    const matchedStreet = r.coverageStreets.find((s) => s.toLowerCase().includes(q));
                    return (
                      <button
                        key={r.id}
                        onClick={() => handleStreetSelect(r, matchedStreet)}
                        className="w-full text-left flex items-center justify-between p-2.5 rounded-lg hover:bg-[#0088cc]/5 text-xs transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <MapPin className="w-4 h-4 text-[#0088cc] shrink-0" />
                          <div className="truncate">
                            <span className="font-bold text-[#004173] group-hover:text-[#0088cc] font-heading">
                              {r.name}
                            </span>
                            {matchedStreet && (
                              <span className="ml-2 px-2 py-0.5 rounded-full text-[11px] bg-[#0088cc]/10 text-[#0088cc] font-semibold border border-[#0088cc]/20">
                                Calle: {matchedStreet}
                              </span>
                            )}
                            <span className="text-[#64748b] text-[11px] ml-2 font-body">
                              • {r.schedule}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-[#0088cc] bg-[#0088cc]/10 px-2.5 py-1 rounded-full shrink-0 font-heading">
                          Ver Ruta
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-xs text-[#64748b]">
                    No se encontraron calles con el término "{searchQuery}". Intenta con Jr. Lima, Av. Floral, Laykakota o Chanu Chanu.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. PESTAÑAS DE RUTAS (desplazamiento horizontal con flechas) */}
        {/* ============================================================ */}
        <div className="relative flex items-center gap-2">
          
          {/* Botón ◀ */}
          <button
            onClick={() => scrollTabs('left')}
            id="btn-scroll-tabs-left"
            className="shrink-0 p-2.5 rounded-lg bg-white hover:bg-[#0088cc]/5 border border-slate-200 shadow-xs text-[#004173] hover:text-[#0088cc] transition-colors cursor-pointer"
            aria-label="Desplazar rutas a la izquierda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Contenedor de pestañas desplazable horizontalmente */}
          <div
            ref={tabsScrollRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PUNO_ROUTES.map((route) => {
              const isSelected = selectedRouteId === route.id;
              const label = `Ruta ${route.number.toString().padStart(2, '0')}`;

              return (
                <button
                  key={route.id}
                  data-route-id={route.id}
                  id={`tab-${route.id}`}
                  onClick={() => {
                    setSelectedRouteId(route.id);
                    setSearchedStreet(null);
                  }}
                  className={`shrink-0 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer flex items-center gap-1.5 font-heading ${
                    isSelected
                      ? 'bg-[#0088cc] text-white shadow-xs'
                      : 'bg-white text-[#004173] hover:text-[#0088cc] hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Botón ▶ */}
          <button
            onClick={() => scrollTabs('right')}
            id="btn-scroll-tabs-right"
            className="shrink-0 p-2.5 rounded-lg bg-white hover:bg-[#0088cc]/5 border border-slate-200 shadow-xs text-[#004173] hover:text-[#0088cc] transition-colors cursor-pointer"
            aria-label="Desplazar rutas a la derecha"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

        {/* ============================================================ */}
        {/* 5. DISTRIBUCIÓN: MAPA (65%) | INFORMACIÓN (35%) */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          
          {/* MAPA LEAFLET — COLUMNA IZQUIERDA (aprox 65%) */}
          <div className="w-full lg:w-[65%] flex flex-col">
            <RouteLeafletMap
              activeRoute={activeRoute}
              onSelectRoute={(id) => {
                setSelectedRouteId(id);
                setSearchedStreet(null);
              }}
              searchedStreet={searchedStreet}
            />
          </div>

          {/* INFORMACIÓN DE LA RUTA — COLUMNA DERECHA (aprox 35%) */}
          <div className="w-full lg:w-[35%] flex flex-col">
            {!activeRoute ? (
              <div className="w-full h-full bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col items-center justify-center text-center space-y-4 min-h-[460px]">
                <div className="w-14 h-14 rounded-xl bg-[#0088cc]/10 border border-[#0088cc]/20 flex items-center justify-center text-2xl shadow-2xs text-[#0088cc]">
                  <Truck className="w-7 h-7 text-[#0088cc]" />
                </div>
                <div className="space-y-2 max-w-xs">
                  <h3 className="text-lg font-bold text-[#004173] font-heading">
                    Selecciona una Ruta de Recolección
                  </h3>
                  <p className="text-xs text-[#64748b] leading-relaxed font-body">
                    Selecciona una ruta de la lista o busca tu calle para ver su recorrido y horario oficial.
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                
                <div className="space-y-4">
                  
                  {/* 🚛 RUTA SELECCIONADA */}
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3.5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#004173] text-white rounded-md">
                          {routeIdCode}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0088cc] font-heading">
                          Ruta de Recolección
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#004173] flex items-center gap-2 font-heading">
                        <span>🚛</span>
                        <span>{`Ruta ${activeRoute.number.toString().padStart(2, '0')}`}</span>
                      </h3>
                      <p className="text-xs text-[#475569] font-medium leading-snug font-body">
                        {activeRoute.name.includes(':') ? activeRoute.name.split(':')[1].trim() : activeRoute.name}
                      </p>
                    </div>

                    {/* Descarga Ficha PDF */}
                    <button
                      onClick={() => downloadRoutePDF(activeRoute)}
                      id="btn-descargar-pdf-icono"
                      title="Descargar Ficha Técnica en PDF"
                      className="p-2 rounded-lg bg-white hover:bg-[#0088cc]/10 text-[#0088cc] border border-slate-200 transition-colors cursor-pointer shrink-0"
                      aria-label="Descargar PDF de la ruta seleccionada"
                    >
                      <Download className="w-4 h-4 text-[#0088cc]" />
                    </button>
                  </div>

                  {/* CARACTERÍSTICAS DE LA RUTA */}
                  <div className="space-y-3">
                    
                    {/* 📍 Zona */}
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-1 font-heading">
                        <span className="text-sm">📍</span>
                        <span>Zona</span>
                      </div>
                      <div className="font-bold text-[#004173] text-xs sm:text-sm font-heading">
                        {cleanSector}
                      </div>
                    </div>

                    {/* 🕐 Horario */}
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-1 font-heading">
                        <span className="text-sm">🕐</span>
                        <span>Horario</span>
                      </div>
                      <div className="font-bold text-[#004173] text-xs sm:text-sm font-body">
                        {activeRoute.shift} · {activeRoute.schedule}
                      </div>
                    </div>

                    {/* 🔄 Frecuencia */}
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-1 font-heading">
                        <span className="text-sm">🔄</span>
                        <span>Frecuencia</span>
                      </div>
                      <div className="font-bold text-[#004173] text-xs sm:text-sm font-body">
                        {cleanFrequency}
                      </div>
                    </div>

                    {/* 📍 Cobertura */}
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between gap-1 text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-1.5 font-heading">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">📍</span>
                          <span>Cobertura ({activeRoute.coverageStreets.length} calles / puntos)</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto pr-1">
                        {activeRoute.coverageStreets.map((street, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-white text-[#004173] border border-slate-200 shadow-2xs font-body"
                          >
                            <span className="text-[10px] text-[#0088cc]">▪</span>
                            <span>{street}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 📡 Estado */}
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#64748b] mb-0.5 font-heading">
                          <span className="text-sm">📡</span>
                          <span>Estado</span>
                        </div>
                        <div className="font-bold text-[#16a34a] text-xs sm:text-sm flex items-center gap-1.5 font-heading">
                          <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse"></span>
                          <span>{activeRoute.status || 'Servicio Activo'}</span>
                        </div>
                      </div>
                      {activeRoute.truckUnit && (
                        <div className="text-right">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] font-heading">Unidad Asignada</div>
                          <div className="text-[11px] font-semibold text-[#004173] font-body">
                            {cleanTruckUnit}
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                </div>

                {/* Ficha Técnica */}
                <div className="pt-3 border-t border-slate-100">
                  {/* Botón [📄 Ver Ficha Técnica] */}
                  <button
                    onClick={() => setModalRoute(activeRoute)}
                    id="btn-ver-ficha-tecnica"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs sm:text-sm bg-[#0088cc] hover:bg-[#004173] text-white transition-all shadow-xs cursor-pointer font-heading"
                  >
                    <FileText className="w-4 h-4 text-white" />
                    <span>Ver Ficha Técnica Completa</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>

      {/* Modal Ficha Técnica */}
      {modalRoute && (
        <RouteDetailModal route={modalRoute} onClose={() => setModalRoute(null)} />
      )}
    </section>
  );
};
