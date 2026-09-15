import React, { useState } from 'react';
import { 
  Sprout, 
  Calculator, 
  CheckCircle2, 
  Send, 
  Leaf, 
  TreePine, 
  Users, 
  HelpCircle, 
  Check, 
  Award,
  Sparkles
} from 'lucide-react';
import { CompostRegistration } from '../types';

export const CompostModule: React.FC = () => {
  // Calculator state
  const [householdMembers, setHouseholdMembers] = useState<number>(4);

  // Registration form state
  const [formData, setFormData] = useState<CompostRegistration>({
    fullName: '',
    dni: '',
    phone: '',
    neighborhood: '',
    address: '',
    spaceType: 'Patio interior',
    committed: true,
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Dynamic calculations based on household members in Puno
  const organicKgPerMonth = householdMembers * 14.5;
  const compostKgPerYear = householdMembers * 42.0;
  const co2AvoidedKg = householdMembers * 165.0;
  const treesEquivalent = Math.max(1, Math.round(householdMembers * 1.8));

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.dni || !formData.phone || !formData.address) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const programChecklist = [
    'Entrega gratuita de compostera municipal de 60L.',
    'Manual técnico ilustrado de compostaje.',
    'Kit de inicio con material secante.',
    'Asesoría técnica y monitoreo mensual.',
    'Producción de abono orgánico para tus plantas.'
  ];

  return (
    <section id="compostaje" className="py-10 sm:py-14 lg:py-16 bg-[#F8F9FA]/60 border-b border-[#E9ECEF] font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0088CC]/10 text-[#0088CC] border border-[#0088CC]/20 uppercase tracking-wider font-heading">
            <Sprout className="w-3.5 h-3.5 text-[#0088CC]" />
            <span>Programa Municipal de Compostaje</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000000] tracking-tight font-heading">
            Compostaje Domiciliario en Puno
          </h2>
          <p className="text-sm sm:text-base text-[#797F89] leading-relaxed max-w-2xl mx-auto font-body">
            Convierte tus residuos orgánicos en abono fértil y reduce la basura domiciliaria con asesoría municipal gratuita.
          </p>
        </div>

        {/* Interactive Impact Calculator Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/10 shadow-xs space-y-6 sm:space-y-7">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/10 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#198754] uppercase tracking-wider font-heading">
                <Calculator className="w-4 h-4 text-[#198754]" />
                <span>Calculadora de Impacto Ambiental</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#000000] font-heading">
                Calcula el abono generado por tu hogar
              </h3>
            </div>

            {/* Slider Control */}
            <div className="bg-[#FFFFFF] p-4 rounded-xl border border-black/10 shadow-2xs space-y-2 min-w-[260px]">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#2B2B5E] font-body">Integrantes en el hogar:</span>
                <span className="text-base font-bold text-[#0088CC] bg-white px-2.5 py-0.5 rounded-lg border border-black/10 font-heading">
                  {householdMembers} {householdMembers === 1 ? 'persona' : 'personas'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={householdMembers}
                onChange={(e) => setHouseholdMembers(parseInt(e.target.value))}
                className="w-full h-2 bg-[#E9ECEF] rounded-lg appearance-none cursor-pointer accent-[#0088CC]"
              />
              <div className="flex justify-between text-[10px] text-[#797F89] font-mono">
                <span>1 pers.</span>
                <span>5 pers.</span>
                <span>10+ pers.</span>
              </div>
            </div>
          </div>

          {/* 4 Dynamic Calculated Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-black/10 shadow-2xs space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#797F89] block font-heading">Residuos Desviados</span>
              <div className="text-3xl font-bold text-[#000000] font-accent">
                {organicKgPerMonth.toFixed(0)} <span className="text-sm font-sans font-medium text-[#797F89]">kg/mes</span>
              </div>
              <p className="text-[11px] text-[#797F89] font-body">Materia orgánica que no irá a parar a los botaderos.</p>
            </div>

            <div className="p-5 rounded-xl bg-[#198754]/5 border border-[#198754]/20 shadow-2xs space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#198754] block font-heading">Compost Producido</span>
              <div className="text-3xl font-bold text-[#198754] font-accent">
                {compostKgPerYear.toFixed(0)} <span className="text-sm font-sans font-medium text-[#198754]">kg/año</span>
              </div>
              <p className="text-[11px] text-[#198754] font-body">Nutrientes puros para enriquecer suelos puneños.</p>
            </div>

            <div className="p-5 rounded-xl bg-[#0088CC]/5 border border-[#0088CC]/20 shadow-2xs space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0088CC] block font-heading">Emisiones Evitadas</span>
              <div className="text-3xl font-bold text-[#0088CC] font-accent">
                {co2AvoidedKg.toFixed(0)} <span className="text-sm font-sans font-medium text-[#0088CC]">kg CO₂eq</span>
              </div>
              <p className="text-[11px] text-[#797F89] font-body">Menos gas metano liberado a la atmósfera andina.</p>
            </div>

            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-black/10 shadow-2xs space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#797F89] block font-heading">Equivalencia Ecológica</span>
              <div className="text-3xl font-bold text-[#000000] flex items-center gap-1 font-accent">
                <span>{treesEquivalent}</span>
                <span className="text-sm font-sans font-medium text-[#797F89]">árboles</span>
              </div>
              <p className="text-[11px] text-[#797F89] font-body">Equivale a plantar árboles nativos (Queñua) cada año.</p>
            </div>
          </div>

        </div>

        {/* 2-Column: Checklist of Benefits & Registration Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Program Benefits Checklist */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-black/10 shadow-xs space-y-5">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#198754] font-heading">Beneficios Gratuitos</span>
                <h3 className="text-xl font-bold text-[#000000] font-heading">
                  ¿Qué incluye el Programa Municipal?
                </h3>
              </div>

              <ul className="space-y-3.5">
                {programChecklist.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#000000]">
                    <div className="w-5 h-5 rounded-full bg-[#198754]/10 text-[#198754] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="leading-relaxed font-body">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-black/10 text-xs text-[#797F89] space-y-1 font-body">
                <p><strong>Requisito:</strong> Separar residuos orgánicos y residir en la provincia de Puno.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Registration Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-black/10 shadow-xs space-y-5">
              
              <div className="border-b border-black/10 pb-4">
                <h3 className="text-xl font-bold text-[#000000] font-heading">
                  Inscripción al Programa Domiciliario
                </h3>
                <p className="text-xs text-[#797F89] mt-1 font-body">
                  Regístrate para recibir tu kit de compostera en la próxima entrega barrial coordinada por la GGIRS.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8 space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#198754]/10 text-[#198754] flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-[#000000] font-heading">
                    ¡Inscripción Registrada!
                  </h4>
                  <p className="text-xs text-[#797F89] max-w-md mx-auto leading-relaxed font-body">
                    Solicitud registrada con éxito. Te contactaremos al número {formData.phone} para coordinar la entrega y capacitación técnica.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        dni: '',
                        phone: '',
                        neighborhood: '',
                        address: '',
                        spaceType: 'Patio interior',
                        committed: true
                      });
                    }}
                    className="px-6 py-2.5 rounded-lg text-xs font-bold bg-[#0088CC] text-white hover:bg-[#0077B5] transition-colors cursor-pointer font-heading"
                  >
                    Registrar otra vivienda
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 font-body" id="form-compostaje">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                      Nombres y Apellidos del Titular *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ej. Rosa Quispe Mamani"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-black/15 text-sm text-[#000000] focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden"
                    />
                  </div>

                  {/* DNI & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                        DNI / Documento *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={8}
                        value={formData.dni}
                        onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                        placeholder="8 dígitos"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-black/15 text-sm text-[#000000] focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                        Celular WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="951 234 567"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-black/15 text-sm text-[#000000] focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Neighborhood & Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                        Barrio / Urbanización *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                        placeholder="Ej. Salcedo, Chanu Chanu..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-black/15 text-sm text-[#000000] focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                        Dirección Exacta *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Jr. / Av. y número"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-black/15 text-sm text-[#000000] focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Space Type Available */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                      Espacio Disponible en Vivienda *
                    </label>
                    <select
                      value={formData.spaceType}
                      onChange={(e) => setFormData({ ...formData, spaceType: e.target.value as CompostRegistration['spaceType'] })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-black/15 text-sm text-[#000000] bg-white focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden"
                    >
                      <option value="Patio interior">Patio interior descubierto o techado</option>
                      <option value="Jardín / Huerta">Jardín o huerta con tierra directa</option>
                      <option value="Terraza / Azotea">Terraza o azotea ventilada</option>
                      <option value="Balcón / Espacio reducido">Balcón o espacio compacto de departamento</option>
                    </select>
                  </div>

                  {/* Checkbox of Commitment */}
                  <div className="pt-1 flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="check-compromiso"
                      required
                      checked={formData.committed}
                      onChange={(e) => setFormData({ ...formData, committed: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded text-[#0088CC] focus:ring-[#0088CC] border-black/20"
                    />
                    <label htmlFor="check-compromiso" className="text-xs text-[#797F89] leading-snug cursor-pointer font-body">
                      Me comprometo a separar los residuos orgánicos de mi hogar y recibir las capacitaciones técnicas brindadas por la Municipalidad Provincial de Puno.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="btn-registrar-compostaje"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm bg-[#0088CC] hover:bg-[#0077B5] text-white transition-all shadow-xs disabled:opacity-50 cursor-pointer font-heading"
                  >
                    <Leaf className="w-4 h-4 text-white" />
                    <span>{isSubmitting ? 'Registrando...' : 'Inscribirme al Programa de Compostaje'}</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
