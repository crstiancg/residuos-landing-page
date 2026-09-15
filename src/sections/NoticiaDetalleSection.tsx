import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Building2, 
  Tag, 
  Share2, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  FileText
} from 'lucide-react';
import { NEWS_DATA, MunicipalNewsItem } from '../data/newsData';
import { NavigationSection } from '../types';

interface NoticiaDetalleSectionProps {
  newsId: string;
  onBack: () => void;
  onNavigate?: (section: NavigationSection) => void;
  onNavigateToNews?: (newsId: string) => void;
}

export const NoticiaDetalleSection: React.FC<NoticiaDetalleSectionProps> = ({
  newsId,
  onBack,
  onNavigateToNews
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  // Buscar noticia por id exacto o normalizado
  const newsItem: MunicipalNewsItem | undefined = NEWS_DATA.find(
    (item) => item.id === newsId || item.id === `noticia-${newsId}`
  ) || NEWS_DATA[0];

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/#noticias/${newsItem.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getCategoryBadgeClass = (category: MunicipalNewsItem['category']) => {
    switch (category) {
      case 'Intervención':
        return 'bg-[#1474B4]/10 text-[#0B335E] border-[#1474B4]/30';
      case 'Campaña':
        return 'bg-emerald-500/10 text-emerald-800 border-emerald-500/25';
      case 'Logro':
        return 'bg-[#0B335E]/10 text-[#0B335E] border-[#0B335E]/25';
      case 'Anuncio Oficial':
        return 'bg-amber-500/15 text-amber-900 border-amber-500/30';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  // Otras noticias disponibles para sugerencia al pie
  const otherNews = NEWS_DATA.filter((n) => n.id !== newsItem.id).slice(0, 3);

  return (
    <div id="pagina-noticia-individual" className="min-h-screen bg-[#F8FAFC] font-body py-8 sm:py-12 animate-in fade-in duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Barra superior de Navegación / Volver */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#0B335E] hover:text-[#1474B4] hover:bg-[#1474B4]/5 border border-black/10 shadow-xs transition-all font-heading font-bold text-xs sm:text-sm cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#1474B4]" />
            <span>Volver a Noticias Principales</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-black/10 text-xs font-semibold text-[#0B335E] hover:text-[#1474B4] hover:bg-[#1474B4]/5 shadow-xs transition-colors cursor-pointer font-heading"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">¡Enlace copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#1474B4]" />
                  <span>Compartir</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECCIÓN NOTICIA COMPLETA                                     */}
        {/* ============================================================ */}
        <article className="bg-white rounded-2xl sm:rounded-3xl border border-black/10 shadow-xs overflow-hidden">
          
          {/* 1. IMAGEN GRANDE DE LA NOTICIA */}
          <div className="relative w-full h-72 sm:h-96 md:h-[460px] bg-slate-100 overflow-hidden">
            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Gradiente sutil inferior */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            
            {/* Categoría sobrepuesta */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              <span className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border backdrop-blur-md shadow-sm font-heading ${getCategoryBadgeClass(newsItem.category)}`}>
                {newsItem.category}
              </span>
            </div>
          </div>

          {/* 2. ENCABEZADO Y METADATOS */}
          <div className="p-6 sm:p-10 lg:p-12 space-y-6 sm:space-y-8">
            
            {/* Metadatos Fecha y Tiempo de Lectura */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#797F89] font-body border-b border-black/10 pb-4">
              <div className="flex items-center gap-1.5 text-[#0B335E] font-medium">
                <Calendar className="w-4 h-4 text-[#1474B4]" />
                <span>{newsItem.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-[#797F89]">
                <Clock className="w-4 h-4 text-[#1474B4]" />
                <span>{newsItem.readTime}</span>
              </div>
            </div>

            {/* TÍTULO COMPLETO GRANDE */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0B335E] leading-tight tracking-tight font-heading">
              {newsItem.title}
            </h1>

            {/* Área y Autoría Responsable */}
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-[#F8FAFC] border border-[#1474B4]/20 text-xs sm:text-sm">
              <div className="w-9 h-9 rounded-xl bg-[#1474B4]/10 flex items-center justify-center text-[#1474B4] shrink-0">
                <Building2 className="w-5 h-5 text-[#1474B4]" />
              </div>
              <div>
                <div className="font-bold text-[#0B335E] font-heading">{newsItem.author}</div>
                <div className="text-[11px] text-[#797F89] font-body">Publicación institucional oficial verificada</div>
              </div>
            </div>

            {/* 3. CONTENIDO COMPLETO (fullContent) */}
            <div className="space-y-5 text-base sm:text-lg text-[#1E293B] leading-relaxed font-body pt-2">
              {newsItem.fullContent.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Etiquetas / Tags */}
            <div className="pt-6 border-t border-black/10 flex flex-wrap items-center gap-2 font-body">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0B335E] uppercase tracking-wider font-heading mr-2">
                <Tag className="w-3.5 h-3.5 text-[#1474B4]" />
                Temas relacionados:
              </span>
              {newsItem.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 rounded-lg bg-[#F1F5F9] text-xs font-semibold text-[#0B335E] border border-black/5 hover:bg-[#1474B4]/10 hover:text-[#1474B4] transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

          </div>
        </article>

        {/* ============================================================ */}
        {/* INFORMACIÓN INSTITUCIONAL VERIFICADA                         */}
        {/* ============================================================ */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#1474B4]/25 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-body">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1474B4]/10 flex items-center justify-center text-[#1474B4] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#1474B4]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#0B335E]">
                Contenido oficial verificado y administrado exclusivamente por la GGIRS • Municipalidad Provincial de Puno.
              </p>
              <p className="text-xs text-[#797F89] font-body">
                Publicado bajo estándares de gobierno digital y transparencia pública municipal.
              </p>
            </div>
          </div>
          <div className="shrink-0 self-start sm:self-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0B335E] text-white font-heading">
              <FileText className="w-3.5 h-3.5 text-[#1474B4]" />
              Resolución de Gerencia Municipal N° 082-2026-MPP
            </span>
          </div>
        </div>

        {/* Otras Noticias de Interés */}
        {otherNews.length > 0 && onNavigateToNews && (
          <div className="pt-4 space-y-4">
            <h3 className="text-lg font-bold text-[#0B335E] font-heading">
              Otras Actualizaciones Institucionales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherNews.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigateToNews(item.id)}
                  className="bg-white rounded-xl border border-black/10 p-4 hover:border-[#1474B4]/40 hover:shadow-md transition-all cursor-pointer space-y-2 group"
                >
                  <div className="text-[11px] text-[#1474B4] font-semibold font-heading">
                    {item.category} • {item.date}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B335E] group-hover:text-[#1474B4] transition-colors line-clamp-2 font-heading">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
