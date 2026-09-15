import React, { useState } from 'react';
import { X, CheckCircle2, HeartHandshake, User, Phone, Mail, Building, MapPin } from 'lucide-react';
import { CampaignEvent } from '../types';

interface VolunteerModalProps {
  campaign: CampaignEvent | null;
  onClose: () => void;
}

export const VolunteerModal: React.FC<VolunteerModalProps> = ({ campaign, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!campaign) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200 font-body">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl border border-[#E9ECEF]">
        
        {/* Header */}
        <div className="p-6 bg-[#2B2B5E] text-white flex items-start justify-between relative">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0088CC] text-white uppercase tracking-wider font-heading">
              {campaign.badge}
            </span>
            <h3 className="text-xl font-bold text-white font-heading">
              Inscripción: {campaign.title}
            </h3>
            <p className="text-xs text-white/90 font-medium font-body">
              Programa de Voluntariado Ambiental • Sumac Ayni Puno
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4 font-body">
              <div className="w-16 h-16 rounded-full bg-[#198754]/10 text-[#198754] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-[#2B2B5E] font-heading">
                ¡Registro Confirmado!
              </h4>
              <p className="text-xs text-[#797F89] leading-relaxed max-w-sm mx-auto font-body">
                Gracias por unirte a la cruzada ambiental por Puno y el Lago Titicaca. Te enviaremos las instrucciones y el punto de encuentro a tu número de WhatsApp.
              </p>
              <div className="p-3 bg-[#FFFFFF] rounded-xl border border-black/10 text-xs text-[#000000] font-body">
                <strong>Evento:</strong> {campaign.title}<br />
                <strong>Fecha:</strong> {campaign.date}
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-lg text-xs font-bold bg-[#0088CC] text-white hover:bg-[#0077B5] transition-colors cursor-pointer font-heading"
              >
                Cerrar Ventana
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-body">
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-black/10 text-xs text-[#2B2B5E] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#2B2B5E] font-heading">
                  <MapPin className="w-3.5 h-3.5 text-[#0088CC]" />
                  <span>{campaign.location}</span>
                </div>
                <div className="text-[#797F89]">{campaign.date}</div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                  Nombres y Apellidos *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#797F89] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Juan Carlos Mamani Quispe"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-black/15 text-[#000000] focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                    DNI / Documento *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="8 dígitos"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-black/15 text-[#000000] focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                    Celular WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#797F89] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="951 234 567"
                      className="w-full pl-8 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-black/15 text-[#000000] focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                  Institución, Colegio o Junta Vecinal (Opcional)
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-[#797F89] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Ej. UNA Puno, I.E. San Carlos, Barrio Laykakota..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-black/15 text-[#000000] focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-bold text-xs sm:text-sm bg-[#0088CC] hover:bg-[#0077B5] text-white transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 font-heading"
                >
                  <HeartHandshake className="w-4 h-4 text-white" />
                  <span>Confirmar Mi Participación</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
