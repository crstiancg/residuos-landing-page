import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Newspaper, 
  Calendar, 
  ArrowRight, 
  Share2, 
  Building2, 
  Clock, 
  CheckCircle2, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NEWS_DATA, MunicipalNewsItem } from '../data/newsData';

export type { MunicipalNewsItem };
export { NEWS_DATA };

interface MunicipalNewsModuleProps {
  onNavigateToNews?: (newsId: string) => void;
}

export const MunicipalNewsModule: React.FC<MunicipalNewsModuleProps> = ({ onNavigateToNews }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [visibleCards, setVisibleCards] = useState<number>(3);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const categories = ['Todos', 'Intervención', 'Campaña', 'Anuncio Oficial'];

  const filteredNews = selectedCategory === 'Todos'
    ? NEWS_DATA
    : NEWS_DATA.filter((item) => item.category === selectedCategory);

  // Detección responsive para tarjetas visibles (3 en escritorio, 2 en tablet, 1 en móvil)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, filteredNews.length - visibleCards);

  // Reiniciar índice al cambiar categoría
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Avance automático cada 7 segundos con reinicio al interactuar manualmente
  const resetAutoAdvanceTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (!isPaused && maxIndex > 0) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 7000);
    }
  }, [isPaused, maxIndex]);

  useEffect(() => {
    resetAutoAdvanceTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [resetAutoAdvanceTimer]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    resetAutoAdvanceTimer();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    resetAutoAdvanceTimer();
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    resetAutoAdvanceTimer();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const handleViewNews = (news: MunicipalNewsItem) => {
    if (onNavigateToNews) {
      onNavigateToNews(news.id);
    } else {
      window.location.hash = `#noticias/${news.id}`;
    }
  };

  const handleShare = (news: MunicipalNewsItem) => {
    const shareUrl = `${window.location.origin}/#noticias/${news.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedId(news.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const getCategoryBadgeClass = (category: MunicipalNewsItem['category']) => {
    switch (category) {
      case 'Intervención':
        return 'bg-[#1474B4]/10 text-[#0B335E] border-[#1474B4]/30 font-heading';
      case 'Campaña':
        return 'bg-emerald-500/10 text-emerald-800 border-emerald-500/25 font-heading';
      case 'Logro':
        return 'bg-[#0B335E]/10 text-[#0B335E] border-[#0B335E]/25 font-heading';
      case 'Anuncio Oficial':
        return 'bg-amber-500/15 text-amber-900 border-amber-500/30 font-heading';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 font-heading';
    }
  };

  return (
    <section id="noticias-municipales" className="py-16 sm:py-20 bg-[#FFFFFF] border-t border-black/10 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ============================================================ */}
        {/* ENCABEZADO INSTITUCIONAL CON CONTROLES DEL CARRUSEL           */}
        {/* ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1474B4]/10 text-[#0B335E] border border-[#1474B4]/20 font-heading">
              <Newspaper className="w-3.5 h-3.5 text-[#1474B4]" />
              <span>Canal Informativo Oficial</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B335E] tracking-tight font-heading">
              Noticias y Actualizaciones Institucionales
            </h2>
            <p className="text-sm text-[#797F89] leading-relaxed font-body">
              Comunicados, jornadas de limpieza, resultados de fiscalización y avisos emitidos por la Municipalidad Provincial de Puno.
            </p>
          </div>

          {/* Filtros por Categoría y Botones de Navegación */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto font-heading">
            <div className="flex flex-wrap items-center gap-1.5 bg-[#FFFFFF] p-1.5 rounded-xl border border-black/10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    resetAutoAdvanceTimer();
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0B335E] text-white shadow-xs'
                      : 'text-[#797F89] hover:text-[#1474B4] hover:bg-[#1474B4]/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Botones de Navegación Anterior / Siguiente */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-xl border border-black/10 bg-white text-[#0B335E] flex items-center justify-center shadow-xs hover:border-[#1474B4] hover:text-[#1474B4] hover:bg-[#1474B4]/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Noticia anterior"
                title="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="w-10 h-10 rounded-xl border border-black/10 bg-white text-[#0B335E] flex items-center justify-center shadow-xs hover:border-[#1474B4] hover:text-[#1474B4] hover:bg-[#1474B4]/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                aria-label="Siguiente noticia"
                title="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CARRUSEL HORIZONTAL DE NOTICIAS (3 VISIBLES EN DESKTOP)      */}
        {/* ============================================================ */}
        <div 
          className="relative overflow-hidden py-4 -my-4 px-1 -mx-1"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="flex transition-transform duration-700 ease-in-out -mx-3 font-body"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
            }}
          >
            {filteredNews.map((news) => (
              <div 
                key={news.id} 
                className="px-3 shrink-0"
                style={{ width: `${100 / visibleCards}%` }}
              >
                <article
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-black/10 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#1474B4]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full select-none"
                >
                  {/* Imagen Grande y Categoría */}
                  <div 
                    onClick={() => handleViewNews(news)}
                    className="relative h-64 sm:h-72 lg:h-80 w-full overflow-hidden bg-slate-100 shrink-0 cursor-pointer"
                  >
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold border backdrop-blur-md shadow-xs ${getCategoryBadgeClass(news.category)}`}>
                        {news.category}
                      </span>
                    </div>
                  </div>

                  {/* Contenido Principal con Espaciado Generoso */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-[#797F89] font-body">
                        <Calendar className="w-3.5 h-3.5 text-[#1474B4]" />
                        <span>{news.date}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5 text-[#1474B4]" />
                        <span>{news.readTime}</span>
                      </div>

                      <h3 
                        onClick={() => handleViewNews(news)}
                        className="text-lg sm:text-xl font-bold text-[#0B335E] group-hover:text-[#1474B4] transition-colors leading-snug line-clamp-2 font-heading min-h-[3.5rem] cursor-pointer"
                      >
                        {news.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#797F89] leading-relaxed line-clamp-3 font-body">
                        {news.summary}
                      </p>
                    </div>

                    {/* Botón "Ver noticia" y Compartir */}
                    <div className="pt-4 border-t border-black/10 flex items-center justify-between font-heading mt-auto">
                      <button
                        onClick={() => handleViewNews(news)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#1474B4] text-white hover:bg-[#0B335E] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group/btn"
                      >
                        <span>Ver noticia</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={() => handleShare(news)}
                        className="p-2.5 rounded-xl text-[#797F89] hover:text-[#1474B4] hover:bg-[#1474B4]/10 transition-colors cursor-pointer"
                        title="Copiar enlace directo"
                        aria-label="Compartir noticia"
                      >
                        {copiedId === news.id ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de Página / Puntos del Carrusel */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-[#1474B4]' : 'w-2 bg-black/15 hover:bg-black/30'
                }`}
                aria-label={`Ir a diapositiva ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Nota Institucional de Publicación Controlada */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#FFFFFF] border border-[#1474B4]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#797F89] font-body">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-[#1474B4]" />
            <span>
              Contenido oficial verificado y administrado exclusivamente por la GGIRS • Municipalidad Provincial de Puno.
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#0B335E] font-heading">
            Resolución de Gerencia Municipal N° 082-2026-MPP
          </span>
        </div>

      </div>
    </section>
  );
};
