import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Calendar, 
  MapPin, 
  Award, 
  Target, 
  ArrowRight, 
  Sparkles,
  Users,
  ShieldCheck
} from 'lucide-react';
import { SUMAC_AYNI_CAMPAIGNS } from '../data/campaignsData';
import { CampaignEvent } from '../types';
import { VolunteerModal } from './VolunteerModal';

export const SumacAyniModule: React.FC = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignEvent | null>(null);

  return (
    <section id="sumac-ayni" className="py-10 sm:py-14 lg:py-16 bg-white text-[#222222] relative overflow-hidden border-b border-[#E9ECEF] font-body">
      
      {/* Architectural subtle background mesh */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#E9ECEF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0088CC]/10 text-[#0088CC] border border-[#0088CC]/20 uppercase tracking-wider font-heading">
            <HeartHandshake className="w-3.5 h-3.5 text-[#0088CC]" />
            <span>Conciencia Ambiental Puneña</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000000] tracking-tight font-heading">
            Sumac Ayni: Campañas Ambientales
          </h2>
          <p className="text-sm sm:text-base text-[#797F89] leading-relaxed font-normal font-body">
            Jornadas de reciclaje, ecotrueques y voluntariado ambiental coordinadas por la Municipalidad Provincial de Puno.
          </p>
        </div>

        {/* 3 Event Cards in Clean Light Institutional Theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SUMAC_AYNI_CAMPAIGNS.map((event) => (
            <div
              key={event.id}
              id={`card-campana-${event.id}`}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-black/10 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 flex flex-col justify-between space-y-6 group hover:border-[#0088CC]/40"
            >
              <div className="space-y-4">
                
                {/* Badge & Category */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full font-heading ${event.badgeColor}`}>
                    {event.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-[#797F89] font-body">
                    Edición 2026
                  </span>
                </div>

                {/* Title and Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-[#000000] group-hover:text-[#0088CC] transition-colors leading-snug font-heading">
                    {event.title}
                  </h3>
                  <p className="text-xs font-medium text-[#797F89] mt-1 leading-relaxed font-body">
                    {event.subtitle}
                  </p>
                </div>

                {/* Event Description */}
                <p className="text-xs text-[#2B2B5E] leading-relaxed font-body">
                  {event.description}
                </p>

                {/* Logistics Info */}
                <div className="space-y-2 pt-3 border-t border-black/10 text-xs font-body">
                  <div className="flex items-start gap-2 text-[#000000]">
                    <Calendar className="w-4 h-4 text-[#0088CC] shrink-0 mt-0.5" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-start gap-2 text-[#000000]">
                    <MapPin className="w-4 h-4 text-[#2B2B5E] shrink-0 mt-0.5" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-start gap-2 text-[#198754] font-medium">
                    <Target className="w-4 h-4 text-[#198754] shrink-0 mt-0.5" />
                    <span>{event.target}</span>
                  </div>

                  <div className="flex items-start gap-2 text-[#2B2B5E] text-[11px] bg-[#FFC107]/10 p-2.5 rounded-lg border border-[#FFC107]/20">
                    <Award className="w-4 h-4 text-[#997404] shrink-0 mt-0.5" />
                    <span><strong className="text-[#000000]">Incentivo:</strong> {event.reward}</span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => setSelectedCampaign(event)}
                  id={`btn-unirme-${event.id}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-xs sm:text-sm bg-[#0088CC] text-white hover:bg-[#0077B5] transition-all shadow-xs cursor-pointer font-heading"
                >
                  <Users className="w-4 h-4 text-white" />
                  <span>{event.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner inside Sumac Ayni */}
        <div className="bg-[#2B2B5E] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs border border-black/10">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-lg bg-white/15 text-white flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-[#0088CC]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-heading">¿Representas a una Institución, Colegio o Empresa en Puno?</h4>
              <p className="text-xs text-white/85 mt-0.5 font-body">Podemos coordinar talleres de educación ambiental in situ y certificación institucional con la Municipalidad.</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedCampaign(SUMAC_AYNI_CAMPAIGNS[0])}
            className="px-5 py-2.5 rounded-lg text-xs font-bold bg-[#0088CC] hover:bg-[#0077B5] text-white transition-colors cursor-pointer shrink-0 shadow-xs font-heading"
          >
            Solicitar Alianza Institucional
          </button>
        </div>

      </div>

      {/* Volunteer Registration Modal */}
      {selectedCampaign && (
        <VolunteerModal campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} />
      )}
    </section>
  );
};
