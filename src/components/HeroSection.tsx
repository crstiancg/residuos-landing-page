import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Truck, 
  Recycle,
  AlertTriangle, 
  Sprout, 
  HeartHandshake, 
  ArrowRight
} from 'lucide-react';

import imgRutas from '../assets/images/monitoreo_rutas_gps_1788407715510.jpg';
import imgSegregacion from '../assets/images/noticia_recojo_rutas_1789103124006.jpg';
import imgReporta from '../assets/images/reporta_vecino_puntos_1788407733995.jpg';
import imgSumacAyni from '../assets/images/sumac_ayni_voluntarios_1788407770390.jpg';
import imgCompostaje from '../assets/images/compostaje_domiciliario_1788407752455.jpg';

export interface HeroSectionProps {
  onScrollToRoutes?: () => void;
  onScrollToReports?: () => void;
  onScrollToApp?: () => void;
  onNavigate?: (target: string) => void;
}

interface BannerSlide {
  id: string;
  category: string;
  categoryIcon: React.ElementType;
  title: string;
  description: string;
  primaryActionText: string;
  primaryTarget: string;
  secondaryActionText?: string;
  secondaryTarget?: string;
  image: string;
  imageAlt: string;
}

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 'banner-rutas',
    category: 'Gestión Ambiental Satelital',
    categoryIcon: Truck,
    title: '29 Rutas de Camiones',
    description: 'Monitoreo satelital GPS en tiempo real de la flota de compactadores en los 4 conos de Puno.',
    primaryActionText: 'Ver Rutas de Recolección',
    primaryTarget: 'rutas',
    secondaryActionText: 'Horarios por Barrio',
    secondaryTarget: 'rutas',
    image: imgRutas,
    imageAlt: '29 Rutas de Camiones en Puno con monitoreo satelital'
  },
  {
    id: 'banner-segregacion',
    category: 'Segregación en Fuente',
    categoryIcon: Recycle,
    title: 'Segregación',
    description: 'Clasificación diferenciada de residuos aprovechables, orgánicos y no aprovechables en cada hogar puneño.',
    primaryActionText: 'Ver Guía de Segregación',
    primaryTarget: 'segregacion',
    secondaryActionText: 'Turnos de Recojo',
    secondaryTarget: 'recojo',
    image: imgSegregacion,
    imageAlt: 'Segregación en la fuente y recolección diferenciada en Puno'
  },
  {
    id: 'banner-reportes',
    category: 'Fiscalización Ciudadana',
    categoryIcon: AlertTriangle,
    title: 'Reporta al Vecino',
    description: 'Módulo de fiscalización y denuncias vecinales con foto y GPS para erradicar botaderos clandestinos.',
    primaryActionText: 'Reportar Punto Crítico',
    primaryTarget: 'reporta',
    secondaryActionText: 'Multas y Ordenanzas',
    secondaryTarget: 'fiscalizacion',
    image: imgReporta,
    imageAlt: 'Fiscalización ambiental y erradicación de botaderos en Puno'
  },
  {
    id: 'banner-sumac-ayni',
    category: 'Conservación Lacustre',
    categoryIcon: HeartHandshake,
    title: 'Sumac Ayni',
    description: 'Jornadas comunitarias de voluntariado y limpieza colectiva en la Bahía del Lago Titicaca.',
    primaryActionText: 'Sumarme a Campañas',
    primaryTarget: 'sumac-ayni',
    secondaryActionText: 'Ecocanjes y Puntos',
    secondaryTarget: 'campanas',
    image: imgSumacAyni,
    imageAlt: 'Voluntariado ambiental y campaña Sumac Ayni en Puno'
  },
  {
    id: 'banner-compostaje',
    category: 'Valorización Orgánica',
    categoryIcon: Sprout,
    title: 'Compostaje',
    description: 'Entrega gratuita de composteras domiciliarias y capacitación técnica para la producción de bioabono.',
    primaryActionText: 'Solicitar Compostera',
    primaryTarget: 'compostaje',
    secondaryActionText: 'Guía de Manejo',
    secondaryTarget: 'recojo',
    image: imgCompostaje,
    imageAlt: 'Compostaje domiciliario y valorización de residuos orgánicos en Puno'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToRoutes,
  onScrollToReports,
  onScrollToApp,
  onNavigate,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
      }, 3000); // Avance automático cada 3 segundos
    }
  }, [isPaused]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [resetAutoplay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetAutoplay();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    resetAutoplay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
    resetAutoplay();
  };

  const handleAction = (target: string) => {
    if (onNavigate) {
      onNavigate(target);
      return;
    }
    if (target === 'rutas' && onScrollToRoutes) {
      onScrollToRoutes();
    } else if ((target === 'reporta' || target === 'fiscalizacion') && onScrollToReports) {
      onScrollToReports();
    } else if ((target === 'descargar-app' || target === 'app-movil' || target === 'campanas' || target === 'sumac-ayni') && onScrollToApp) {
      onScrollToApp();
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const activeSlide = BANNER_SLIDES[currentSlide];

  return (
    <div 
      className="relative w-full bg-[#004173] overflow-hidden select-none border-b border-slate-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Banner institucional de gestión de residuos sólidos en Puno"
    >
      {/* Contenedor del Banner Principal - Portada que ocupa la primera pantalla */}
      <div className="relative w-full min-h-[calc(100vh-112px)] min-h-[calc(100dvh-112px)] flex items-center">
        
        {/* Diapositivas con Imagen de Fondo Visible */}
        {BANNER_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              {/* Imagen en alta resolución y proporción de banner */}
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
              />

              {/* Degradado institucional sobrio: la imagen se aprecia con total claridad */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#004173]/90 via-[#004173]/65 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#004173]/70 via-transparent to-transparent"></div>
            </div>
          );
        })}

        {/* Estructura Central de Contenido Institucional */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-10">
          <div className="max-w-2xl space-y-3.5 sm:space-y-4">
            
            {/* ETIQUETA / CATEGORÍA */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-white/15 text-white border border-white/25 backdrop-blur-xs font-heading">
              {React.createElement(activeSlide.categoryIcon, { className: "w-3.5 h-3.5 text-[#ffd900]" })}
              <span>{activeSlide.category}</span>
            </div>

            {/* TÍTULO INSTITUCIONAL */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight font-heading drop-shadow-sm">
                {activeSlide.title}
              </h1>
            </div>

            {/* DESCRIPCIÓN */}
            <p className="text-xs sm:text-sm lg:text-base text-white/95 leading-relaxed font-normal max-w-xl font-body drop-shadow-xs">
              {activeSlide.description}
            </p>

            {/* BOTONES DE ACCIÓN MUNICIPALES */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleAction(activeSlide.primaryTarget)}
                id={`banner-cta-primary-${activeSlide.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[#0088cc] hover:bg-[#0073ad] text-white transition-colors shadow-sm cursor-pointer font-heading active:scale-98"
              >
                <span>{activeSlide.primaryActionText}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              {activeSlide.secondaryActionText && activeSlide.secondaryTarget && (
                <button
                  onClick={() => handleAction(activeSlide.secondaryTarget!)}
                  id={`banner-cta-secondary-${activeSlide.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-xs transition-colors cursor-pointer font-heading"
                >
                  <span>{activeSlide.secondaryActionText}</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Flechas de Navegación Lateral */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/30 hover:bg-[#0088cc] text-white flex items-center justify-center transition-colors backdrop-blur-xs cursor-pointer"
          aria-label="Anterior diapositiva"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/30 hover:bg-[#0088cc] text-white flex items-center justify-center transition-colors backdrop-blur-xs cursor-pointer"
          aria-label="Siguiente diapositiva"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicadores Inferiores del Banner */}
        <div className="absolute bottom-3 left-0 right-0 z-30 flex items-center justify-center gap-2">
          {BANNER_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive ? 'w-8 bg-[#ffd900]' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Ir a diapositiva ${slide.title}`}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
};
