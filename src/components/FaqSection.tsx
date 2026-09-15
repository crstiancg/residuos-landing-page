import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { FAQ_ITEMS } from '../data/campaignsData';

export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faq" className="py-10 sm:py-14 lg:py-16 bg-[#F8F9FA]/60 border-b border-[#E9ECEF] font-body">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0088CC]/10 text-[#0088CC] border border-[#0088CC]/20 uppercase tracking-wider font-heading">
            <HelpCircle className="w-3.5 h-3.5 text-[#0088CC]" />
            <span>Orientación Vecinal y Normativa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000000] tracking-tight font-heading">
            Preguntas Frecuentes
          </h2>
          <p className="text-sm sm:text-base text-[#797F89] leading-relaxed max-w-2xl mx-auto font-body">
            Información sobre rutas, horarios, segregación en la fuente y normativa ambiental municipal.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5" id="faq-accordion-list">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div
                key={item.id}
                id={`faq-item-${item.id}`}
                className="bg-white rounded-2xl border border-black/10 shadow-xs overflow-hidden transition-all duration-200 hover:border-[#0088CC]/30"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0088CC] font-heading">
                      {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#000000] leading-snug font-heading">
                      {item.question}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#0088CC] text-white rotate-180' : 'bg-black/5 text-[#797F89]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 border-t border-black/10 text-xs sm:text-sm text-[#2B2B5E] leading-relaxed animate-in fade-in duration-200 font-body">
                    <p className="bg-[#FFFFFF] p-4 rounded-xl border border-black/10">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Assistance pill */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#797F89] font-body">
            ¿Tiene alguna consulta adicional? Comuníquese con la central de atención GGIRS: <strong className="text-[#0088CC] font-heading"> (051) 368-450</strong>
          </p>
        </div>

      </div>
    </section>
  );
};
