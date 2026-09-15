import React from 'react';
import { 
  Recycle, 
  Sprout, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Calendar,
  Truck,
  Bot
} from 'lucide-react';
import { WASTE_CATEGORIES_INFO } from '../data/wasteClassificationData';

export const SegregationModule: React.FC = () => {
  const handleOpenReciclaBot = () => {
    const floatingBotButton = document.getElementById('reciclabot-trigger-btn') || document.getElementById('btn-reciclabot-floating');
    if (floatingBotButton) {
      floatingBotButton.click();
    }
  };

  return (
    <section id="segregacion" className="py-10 sm:py-14 lg:py-16 bg-white border-b border-[#E9ECEF] font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* ============================================================ */}
        {/* 1. ENCABEZADO EDUCATIVO INSTITUCIONAL */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0088CC]/10 text-[#0088CC] border border-[#0088CC]/20 uppercase tracking-wider font-heading">
            <Recycle className="w-3.5 h-3.5 text-[#0088CC]" />
            <span>Segregación en la Fuente</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000000] tracking-tight font-heading">
            Segregación de Residuos en la Fuente
          </h2>
          <p className="text-sm sm:text-base text-[#797F89] leading-relaxed max-w-2xl mx-auto font-body">
            Clasifica tus residuos en casa para reciclaje y compostaje municipal con la guía oficial de la GGIRS.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2. LAS TRES TARJETAS EDUCATIVAS HORIZONTALES */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {WASTE_CATEGORIES_INFO.map((cat) => {
            const isOrg = cat.id === 'organicos';
            const isRec = cat.id === 'inorganicos';
            const Icon = isOrg ? Sprout : isRec ? Recycle : Trash2;
            const borderHoverColor = isOrg ? 'hover:border-[#198754]/40' : isRec ? 'hover:border-[#0088CC]/40' : 'hover:border-[#797F89]/40';

            return (
              <div
                key={cat.id}
                id={`card-cat-${cat.id}`}
                className={`group rounded-2xl p-6 sm:p-7 border border-black/10 ${borderHoverColor} bg-white shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 flex flex-col justify-between space-y-6 relative overflow-hidden`}
              >
                {/* Franja superior de color distintivo */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300" 
                  style={{ backgroundColor: isRec ? '#0088CC' : cat.colorHex }}
                />

                <div className="space-y-5">
                  
                  {/* Encabezado de la Categoría */}
                  <div className="flex items-start justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl leading-none">{cat.badge}</span>
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-[#000000] leading-snug font-heading">
                          {cat.title}
                        </h3>
                        <p className="text-xs font-semibold text-[#797F89] mt-0.5 font-body">
                          {cat.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cat.iconBg} shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Descripción Breve */}
                  <p className="text-xs text-[#2B2B5E] leading-relaxed font-body">
                    {cat.description}
                  </p>

                  {/* ¿Qué va aquí? (✓ Ejemplos) */}
                  <div className="space-y-2 pt-3 border-t border-black/10">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#198754] font-heading">
                      <span>✓</span>
                      <span>{cat.acceptedTitle}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {cat.acceptedItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#000000] font-body">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#198754] shrink-0 mt-0.5" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* No colocar aquí (❌ Prohibidos) */}
                  <div className="space-y-2 pt-3 border-t border-black/10">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#DC3545] font-heading">
                      <span>❌</span>
                      <span>{cat.prohibitedTitle}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {cat.prohibitedItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#797F89] font-body">
                          <XCircle className="w-3.5 h-3.5 text-[#DC3545] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Pie de la Tarjeta: Días y Destino */}
                <div className="pt-4 border-t border-black/10 space-y-2.5 bg-[#FFFFFF] -mx-6 -mb-6 p-5 rounded-b-2xl">
                  {/* Días / Horario de Recojo */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#797F89] font-heading">
                      {isOrg || isRec ? (
                        <Calendar className="w-3.5 h-3.5 text-[#0088CC]" />
                      ) : (
                        <Truck className="w-3.5 h-3.5 text-[#0088CC]" />
                      )}
                      <span>{cat.scheduleLabel}</span>
                    </div>
                    <div className="text-xs font-bold text-[#000000] pl-5 font-body">
                      {cat.collectionDays}
                    </div>
                  </div>

                  {/* Destino de los Residuos */}
                  <div className="space-y-0.5 pt-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#797F89] font-heading">
                      <span className="text-xs">{cat.destinationIcon}</span>
                      <span>{cat.destinationLabel}</span>
                    </div>
                    <div className="text-xs font-semibold text-[#2B2B5E] pl-5 leading-snug font-body">
                      {cat.destination}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* 3. CONEXIÓN VISUAL ELEGANTE CON EL CHATBOT EXISTENTE */}
        {/* ============================================================ */}
        <div className="bg-white border border-black/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg bg-[#0088CC] text-white flex items-center justify-center text-lg shrink-0 shadow-xs">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#000000] font-heading">
                ¿Dudas sobre cómo clasificar un residuo?
              </h4>
              <p className="text-xs text-[#797F89] font-body">
                Consulta en ChatBot el tipo de bolsa o contenedor correspondiente en segundos.
              </p>
            </div>
          </div>

          <button
            onClick={handleOpenReciclaBot}
            id="btn-consultar-asistente-segregacion"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs sm:text-sm bg-[#0088CC] hover:bg-[#0077B5] text-white transition-all shadow-xs cursor-pointer shrink-0 active:scale-98 font-heading"
            title="Abrir asistente virtual ChatBot"
          >
            <span>💬 Abrir ChatBot</span>
          </button>
        </div>

      </div>
    </section>
  );
};
