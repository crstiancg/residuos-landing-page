import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Camera, 
  MapPin, 
  FileText, 
  Phone, 
  ShieldAlert, 
  CheckCircle2, 
  UploadCloud, 
  Send, 
  X,
  Navigation,
  Scale
} from 'lucide-react';
import { CitizenReport } from '../types';

export const CitizenReportModule: React.FC = () => {
  const [category, setCategory] = useState<CitizenReport['category']>('Basura en Esquina');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSimulateGPS = () => {
    setGpsLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLoading(false);
          setAddress(`Coordenadas: -15.8402, -70.0219 (Puno Centro)`);
          if (!neighborhood) setNeighborhood('Centro Histórico');
        },
        () => {
          setGpsLoading(false);
          setAddress('Jr. Deustua esq. Jr. Lima, Puno');
          if (!neighborhood) setNeighborhood('Barrio Central');
        },
        { timeout: 3000 }
      );
    } else {
      setTimeout(() => {
        setGpsLoading(false);
        setAddress('Av. Floral con Jr. Universitaria, Puno');
        if (!neighborhood) setNeighborhood('Bellavista');
      }, 500);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !phone.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const randomTicket = `TKT-PUNO-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(randomTicket);
      setIsSubmitting(false);
      // reset fields
      setDescription('');
      setAddress('');
      setPhone('');
      setNeighborhood('');
      setPhotoPreview(null);
    }, 800);
  };

  return (
    <section id="reporta" className="py-10 sm:py-14 lg:py-16 bg-[#F8F9FA]/60 border-b border-[#E9ECEF] font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DC3545]/10 text-[#DC3545] border border-[#DC3545]/20 uppercase tracking-wider font-heading">
            <ShieldAlert className="w-3.5 h-3.5 text-[#DC3545]" />
            <span>Fiscalización Ciudadana</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000000] tracking-tight font-heading">
            Reporta a tu Vecino y Puntos Críticos
          </h2>
          <p className="text-sm sm:text-base text-[#797F89] leading-relaxed max-w-2xl mx-auto font-body">
            Denuncia botaderos clandestinos, acumulación fuera de horario y colabora con la fiscalización ambiental municipal.
          </p>
        </div>

        {/* 2-Column Balanced Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Benefits & Legal Ordinance */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-black/10 shadow-xs space-y-5">
              <h3 className="text-xl font-bold text-[#000000] font-heading">
                Fiscalización Ambiental Rápida
              </h3>
              
              <p className="text-xs sm:text-sm text-[#797F89] leading-relaxed font-body">
                Tu reporte activa inspección y cuadrillas de limpieza pública municipal en tiempo récord.
              </p>

              {/* 3 Key Benefits */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0088CC]/10 text-[#0088CC] flex items-center justify-center shrink-0">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#000000] font-heading">Evidencia Fotográfica</h4>
                    <p className="text-xs text-[#797F89] mt-0.5 font-body">
                      Adjunta fotos claras del punto o infractor para sustentar la sanción correspondiente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#198754]/10 text-[#198754] flex items-center justify-center shrink-0">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#000000] font-heading">Geolocalización GPS</h4>
                    <p className="text-xs text-[#797F89] mt-0.5 font-body">
                      Registra la ubicación exacta directamente con el sensor GPS de tu dispositivo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0088CC]/10 text-[#0088CC] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-[#0088CC]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#000000] font-heading">Seguimiento por Ticket</h4>
                    <p className="text-xs text-[#797F89] mt-0.5 font-body">
                      Obtén un código único para verificar la atención e inspección realizada.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Notice Card */}
            <div className="bg-[#FFC107]/10 rounded-2xl p-6 border border-[#FFC107]/30 text-[#000000] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#997404] uppercase tracking-wider font-heading">
                <Scale className="w-4 h-4 text-[#997404]" />
                <span>Ordenanza Municipal N° 092-2023-MPP</span>
              </div>
              <p className="text-xs text-[#2B2B5E] leading-relaxed font-body">
                Multas del <strong className="text-[#000000]">10% al 50% de la UIT</strong> por arrojar basura o desmonte en esquinas, avenidas y riberas del Lago Titicaca.
              </p>
              <div className="text-[11px] text-[#797F89] font-medium pt-1 font-body">
                Gerencia de Gestión Integral de Residuos Sólidos • Municipalidad Provincial de Puno
              </div>
            </div>

          </div>

          {/* Right Column: Clean Interactive Report Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-black/10 shadow-xs space-y-5">
              
              <div className="border-b border-black/10 pb-4">
                <h3 className="text-xl font-bold text-[#000000] font-heading">
                  Registrar Reporte Ciudadano
                </h3>
                <p className="text-xs text-[#797F89] mt-1 font-body">
                  Complete los campos para generar la alerta inmediata a los fiscalizadores ambientales.
                </p>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmitReport} className="space-y-4 font-body" id="form-reporte-vecinal">
                
                {/* Infracción Type Selector */}
                <div className="space-y-1.5">
                  <label htmlFor="select-tipo-infraccion" className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                    Tipo de Infracción / Reporte *
                  </label>
                  <select
                    id="select-tipo-infraccion"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CitizenReport['category'])}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-black/15 text-sm text-[#000000] bg-white focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden"
                  >
                    <option value="Basura en Esquina">Basura arrojada en esquina fuera de horario</option>
                    <option value="Desmonte Clandestino">Desmonte / Escombros de construcción en vía pública</option>
                    <option value="Punto Crítico / Botadero">Punto Crítico / Botadero Clandestino</option>
                    <option value="Contenedor Lleno">Contenedor o papelera colapsada</option>
                    <option value="Camión No Pasó">Omisión de recojo en horario programado</option>
                  </select>
                </div>

                {/* Neighborhood and Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label htmlFor="input-barrio" className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                      Barrio o Urbanización *
                    </label>
                    <input
                      id="input-barrio"
                      type="text"
                      required
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      placeholder="Ej. Barrio Laykakota, Chanu Chanu..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-black/15 text-sm text-[#000000] focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="input-direccion" className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                        Dirección o Referencia *
                      </label>
                      <button
                        type="button"
                        onClick={handleSimulateGPS}
                        className="text-[11px] font-semibold text-[#0088CC] hover:underline flex items-center gap-1 cursor-pointer font-heading"
                      >
                        <Navigation className="w-3 h-3" />
                        {gpsLoading ? 'Obteniendo...' : 'Usar mi GPS'}
                      </button>
                    </div>
                    <input
                      id="input-direccion"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ej. Jr. Independencia con Jr. Tarapacá"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-black/15 text-sm text-[#000000] focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Phone Contact */}
                <div className="space-y-1.5">
                  <label htmlFor="input-celular" className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                    Celular de Contacto (para confirmación de ticket) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#797F89] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="input-celular"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. 951 234 567"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-black/15 text-sm text-[#000000] focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label htmlFor="textarea-descripcion" className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                    Descripción del Hecho *
                  </label>
                  <textarea
                    id="textarea-descripcion"
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describa la situación, hora aproximada o detalles del vehículo/infractor si fue identificado..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-black/15 text-sm text-[#000000] focus:ring-2 focus:ring-[#0088CC]/20 focus:border-[#0088CC] focus:outline-hidden resize-none"
                  />
                </div>

                {/* Photo Upload Area */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#2B2B5E] font-heading">
                    Adjuntar Foto o Evidencia
                  </label>
                  
                  {photoPreview ? (
                    <div className="relative rounded-lg overflow-hidden border border-black/10 bg-[#FFFFFF] p-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={photoPreview} alt="Vista previa de evidencia" className="w-16 h-16 object-cover rounded-lg" />
                        <div className="text-xs">
                          <p className="font-semibold text-[#000000] font-heading">Foto adjunta con éxito</p>
                          <p className="text-[#797F89] text-[11px] font-body">Listo para ser remitido a fiscalización</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPhotoPreview(null)}
                        className="p-1.5 bg-[#DC3545]/10 hover:bg-[#DC3545]/20 text-[#DC3545] rounded-lg transition-colors cursor-pointer"
                        aria-label="Quitar foto"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-black/15 hover:border-[#0088CC] rounded-lg cursor-pointer bg-[#FFFFFF] hover:bg-black/5 transition-colors">
                      <UploadCloud className="w-7 h-7 text-[#0088CC] mb-1" />
                      <span className="text-xs font-semibold text-[#000000] font-heading">Arrastra o haz clic para subir foto</span>
                      <span className="text-[11px] text-[#797F89] font-body">Formatos JPG, PNG (Máx 5MB)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="btn-enviar-reporte"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm bg-[#0088CC] hover:bg-[#0077B5] text-white transition-all shadow-xs disabled:opacity-50 cursor-pointer font-heading"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>{isSubmitting ? 'Registrando Ticket...' : 'Enviar Reporte a Fiscalización'}</span>
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Success Modal with Generated Ticket */}
      {submittedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 font-body">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-black/10 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-[#198754]/10 text-[#198754] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#198754] font-heading">
                ¡Reporte Registrado con Éxito!
              </span>
              <h3 className="text-2xl font-bold text-[#2B2B5E] font-accent">
                Ticket #{submittedTicket}
              </h3>
              <p className="text-xs text-[#797F89] leading-relaxed font-body">
                Su denuncia ha sido ingresada al Sistema de Fiscalización de la Municipalidad Provincial de Puno. Un inspector verificará la zona en las próximas horas.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-black/10 text-xs text-left space-y-1 font-body">
              <div className="flex justify-between">
                <span className="text-[#797F89]">Categoría:</span>
                <span className="font-semibold text-[#000000]">{category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#797F89]">Estado:</span>
                <span className="font-bold text-[#0088CC]">En Cola de Inspección</span>
              </div>
            </div>

            <button
              onClick={() => setSubmittedTicket(null)}
              className="w-full py-3 rounded-lg font-bold text-sm bg-[#0088CC] hover:bg-[#0077B5] text-white transition-colors cursor-pointer font-heading"
            >
              Entendido / Cerrar
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
