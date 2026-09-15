import React, { useState, useRef, useCallback } from 'react';
import { 
  Trees, 
  Trash2, 
  Users, 
  Calendar, 
  Play, 
  X, 
  Quote, 
  Sparkles, 
  ArrowRight, 
  Maximize2,
  Volume2,
  Info
} from 'lucide-react';

import imgAntes from '../assets/images/punto_critico_antes_1789102998548.jpg';
import imgDespues from '../assets/images/parque_recuperado_despues_1789103008845.jpg';
import thumbFlota from '../assets/images/video_flota_compactadores_1789103020190.jpg';
import thumbCompost from '../assets/images/video_planta_compostaje_1789103033960.jpg';

interface VideoModalData {
  title: string;
  category: string;
  duration: string;
  description: string;
  thumbnail: string;
}

export const EnvironmentalImpactGallery: React.FC = () => {
  // Estado para el slider Antes / Después (0 a 100%)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Estado para el modal de video
  const [activeVideo, setActiveVideo] = useState<VideoModalData | null>(null);

  // Manejador del slider Antes / Después
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const videos: VideoModalData[] = [
    {
      title: 'Flota de 29 Compactadores en Puno',
      category: 'Operatividad y Logística',
      duration: '03:45 min',
      description: 'Conoce cómo opera la moderna flota municipal de 14 camiones compactadores recorriendo diariamente los 4 sectores y 29 circuitos de la ciudad de Puno.',
      thumbnail: thumbFlota
    },
    {
      title: 'Proceso de Compostaje en Salcedo',
      category: 'Valorización Orgánica',
      duration: '04:12 min',
      description: 'Acompaña a los especialistas de la GGIRS en la transformación de residuos orgánicos recolectados en mercados y hogares en humus fértil para áreas verdes.',
      thumbnail: thumbCompost
    }
  ];

  return (
    <section id="galeria-impacto" className="py-14 sm:py-16 bg-[#FFFFFF] border-y border-slate-200 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ============================================================ */}
        {/* ENCABEZADO DE SECCIÓN                                       */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#0088cc]/10 text-[#0088cc] border border-[#0088cc]/25 font-heading">
            <Sparkles className="w-3.5 h-3.5 text-[#0088cc]" />
            <span>Gestión y Transformación Urbana</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#004173] tracking-tight font-heading">
            GALERÍA DE IMPACTO AMBIENTAL
          </h2>
          <p className="text-sm sm:text-base text-[#64748b] leading-relaxed font-normal font-body">
            Conoce cómo se han transformado los puntos críticos en áreas verdes y espacios públicos recuperados en toda la ciudad de Puno.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 4 INDICADORES INSTITUCIONALES                                */}
        {/* ============================================================ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-body">
          
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs text-center space-y-2 hover:border-[#0088cc]/40 transition-all">
            <div className="w-11 h-11 rounded-lg bg-[#0088cc]/10 text-[#0088cc] mx-auto flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0088cc] font-heading">
              15 Tn
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#004173] font-heading">
              Toneladas recuperadas
            </div>
            <p className="text-[11px] text-[#64748b]">
              Retiradas de focos clandestinos
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs text-center space-y-2 hover:border-emerald-500/40 transition-all">
            <div className="w-11 h-11 rounded-lg bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
              <Trees className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-600 font-heading">
              8
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#004173] font-heading">
              Puntos críticos erradicados
            </div>
            <p className="text-[11px] text-[#64748b]">
              Rehabilitados como áreas verdes
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs text-center space-y-2 hover:border-[#0088cc]/40 transition-all">
            <div className="w-11 h-11 rounded-lg bg-[#0088cc]/10 text-[#0088cc] mx-auto flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0088cc] font-heading">
              1,200
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#004173] font-heading">
              Voluntarios
            </div>
            <p className="text-[11px] text-[#64748b]">
              Ciudadanos puneños activos
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs text-center space-y-2 hover:border-[#004173]/40 transition-all">
            <div className="w-11 h-11 rounded-lg bg-[#004173]/10 text-[#004173] mx-auto flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#004173] font-heading">
              3
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#004173] font-heading">
              Campañas realizadas
            </div>
            <p className="text-[11px] text-[#64748b]">
              Jornadas masivas Sumac Ayni
            </p>
          </div>

        </div>

        {/* ============================================================ */}
        {/* COMPARADOR ANTES / DESPUÉS INTERACTIVO                       */}
        {/* ============================================================ */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 font-body">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#004173] font-heading">
                Comparador Antes / Después
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] font-body">
                Desplaza la barra central para comparar el estado previo de acumulación con el espacio público rehabilitado.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-[#004173] bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 font-heading font-semibold">
              <span>Laykakota / Ribera Titicaca</span>
            </div>
          </div>

          {/* Canvas Interactivo Antes/Después */}
          <div 
            ref={containerRef}
            onClick={handleContainerClick}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            className="relative w-full h-[320px] sm:h-[440px] md:h-[500px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-black/10 shadow-inner bg-slate-900"
          >
            {/* Imagen DESPUÉS (Fondo completo) */}
            <img
              src={imgDespues}
              alt="Área verde y parque recuperado en Puno"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              draggable={false}
            />
            
            {/* Badge "Después" */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider shadow-md pointer-events-none flex items-center gap-1.5 font-heading">
              <span>🌿 Después: Área Recuperada</span>
            </div>

            {/* Imagen ANTES (Clip dinámico con ancho porcentual) */}
            <div 
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={imgAntes}
                alt="Punto crítico con basura antes de la intervención"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  maxWidth: 'none'
                }}
                draggable={false}
              />
              {/* Badge "Antes" */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5 font-heading">
                <span>⚠️ Antes: Punto Crítico</span>
              </div>
            </div>

            {/* Barra Divisora y Controlador Arrastrable */}
            <div 
              className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-center justify-center"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Línea vertical blanca de alto contraste */}
              <div className="w-1 h-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)]"></div>
              
              {/* Botón circular central */}
              <div className="absolute w-10 h-10 rounded-full bg-white text-[#0088CC] shadow-xl border-2 border-[#0088CC] flex items-center justify-center text-xs font-extrabold pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                <span>⇄</span>
              </div>
            </div>

            {/* Hint inferior táctil */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/70 backdrop-blur-xs text-white text-[11px] font-medium px-3 py-1 rounded-full pointer-events-none font-body">
              Arrastra horizontalmente para comparar
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#797F89] pt-2 font-body">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
              <span>Antes: Acumulación no autorizada de residuos sólidos y escombros.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>Después: Erradicación total, cobertura con grass natural y bancas comunales.</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* VIDEOS DESTACADOS                                            */}
        {/* ============================================================ */}
        <div className="space-y-6 font-body">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#004173] font-heading">
                Videos Destacados
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] font-body">
                Acciones operativas en video de la Gerencia de Gestión Integral de Residuos Sólidos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((vid, idx) => (
              <div
                key={idx}
                onClick={() => setActiveVideo(vid)}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:border-[#0088cc]/50 transition-all cursor-pointer flex flex-col font-body"
              >
                {/* Miniatura de portada con botón Play */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Botón de Play Central */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-13 h-13 rounded-full bg-[#0088cc] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#004173] transition-all">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duración */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/75 text-white text-xs font-semibold font-body">
                    {vid.duration}
                  </div>

                  {/* Categoría */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#004173] text-white text-[11px] font-bold uppercase tracking-wider font-heading">
                    {vid.category}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h4 className="text-base sm:text-lg font-bold text-[#004173] group-hover:text-[#0088cc] transition-colors font-heading">
                      {vid.title}
                    </h4>
                    <p className="text-xs text-[#64748b] leading-relaxed font-body">
                      {vid.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0088cc] font-heading">
                    <span>Reproducir audiovisual</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* TESTIMONIOS DE VOLUNTARIOS                                   */}
        {/* ============================================================ */}
        <div className="space-y-6 font-body">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#004173] font-heading">
              Testimonios de Voluntarios
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] font-body">
              Experiencias de vecinos comprometidos con el cuidado del medio ambiente en Puno.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Testimonio 1 */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between space-y-5 hover:border-[#0088cc]/40 transition-colors font-body">
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-[#0088cc]/20" />
                <p className="text-sm sm:text-base text-[#334155] italic leading-relaxed font-body">
                  “Participar en el Sumac Ayni en la bahía del lago fue una experiencia transformadora para todo nuestro barrio.”
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0088cc]/10 text-[#0088cc] font-bold flex items-center justify-center text-sm font-heading">
                  YQ
                </div>
                <div>
                  <div className="text-sm font-bold text-[#004173] font-heading">
                    Yolanda Quispe
                  </div>
                  <div className="text-xs text-[#64748b] font-body">
                    Vecina activa • Chanu Chanu II
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonio 2 */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between space-y-5 hover:border-emerald-500/40 transition-colors font-body">
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-emerald-600/20" />
                <p className="text-sm sm:text-base text-[#334155] italic leading-relaxed font-body">
                  “La compostera municipal gratuita nos permite aprovechar todos los restos de cocina en abono.”
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 font-bold flex items-center justify-center text-sm font-heading">
                  MC
                </div>
                <div>
                  <div className="text-sm font-bold text-[#004173] font-heading">
                    Marcos Choque
                  </div>
                  <div className="text-xs text-[#64748b] font-body">
                    Beneficiario del programa • Salcedo
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* MODAL DE REPRODUCTOR DE VIDEO INSTITUCIONAL                  */}
      {/* ============================================================ */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 font-body"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-black/10 animate-in zoom-in-95 duration-200"
          >
            {/* Header Modal */}
            <div className="p-4 sm:p-5 bg-[#2B2B5E] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#0088CC] font-heading">
                  {activeVideo.category}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mt-1 font-heading">
                  {activeVideo.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors cursor-pointer"
                aria-label="Cerrar video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#0088CC] text-white flex items-center justify-center shadow-lg animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <div className="space-y-1 max-w-md">
                  <p className="text-sm font-bold text-white font-heading">Transmisión Institucional Municipal</p>
                  <p className="text-xs text-white/90 font-body">{activeVideo.description}</p>
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-4 bg-[#FFFFFF] border-t border-black/10 flex items-center justify-between font-body">
              <div className="flex items-center gap-2 text-xs text-[#797F89]">
                <Info className="w-4 h-4 text-[#0088CC]" />
                <span>Video oficial producido por la Municipalidad Provincial de Puno</span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-[#0088CC] hover:bg-[#0077B5] text-white transition-colors cursor-pointer font-heading"
              >
                Cerrar Video
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
