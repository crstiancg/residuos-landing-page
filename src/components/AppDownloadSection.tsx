import React from 'react';
import { Smartphone, QrCode, CheckCircle2, Shield, Bell, Navigation, Download } from 'lucide-react';

export const AppDownloadSection: React.FC = () => {
  return (
    <section id="descargar-app" className="py-10 sm:py-14 lg:py-16 bg-[#F8F9FA]/60 border-b border-[#E9ECEF] relative overflow-hidden font-body">
      
      {/* Background subtle radial texture */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#E9ECEF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#2B2B5E] rounded-3xl p-8 sm:p-12 shadow-sm border border-black/10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-white">
          
          {/* Left Text and Features */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#0088CC] text-white border border-white/20 uppercase tracking-wider font-heading">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Aplicación Móvil Oficial</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight font-heading">
              Descarga <span className="text-[#0088CC]">Muni Puno Digital</span> y mantente informado
            </h2>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl font-body">
              Recibe alertas de recojo en tu cuadra y reporta incidencias desde tu celular en tiempo real.
            </p>

            {/* App features bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/90 pt-2 font-body">
              <div className="flex items-center gap-2.5">
                <Bell className="w-4 h-4 text-[#0088CC] shrink-0" />
                <span>Alerta sonora 5 min antes en tu cuadra</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Navigation className="w-4 h-4 text-[#0088CC] shrink-0" />
                <span>Rastreo GPS de los 29 compactadores</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Reportes directos a fiscalización</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Horarios y calendario de reciclaje</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#descargar-app"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Muni Puno Digital: Enlace oficial a Google Play Store (Versión 2.4.0 en despliegue institucional).");
                }}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-lg font-bold text-xs sm:text-sm bg-white text-[#000000] hover:bg-white/95 transition-all shadow-xs cursor-pointer font-heading"
              >
                <svg className="w-5 h-5 text-[#0088CC]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a2.43 2.43 0 0 1-.22-.986V2.8a2.43 2.43 0 0 1 .22-.986zM15.207 13.414l2.42 2.42-12.836 7.41a2.38 2.38 0 0 1-1.182.316l11.598-10.146zm0-2.828L3.609.44A2.38 2.38 0 0 1 4.791.756l12.836 7.41-2.42 2.42zm1.414 1.414l3.774 2.18a2.41 2.41 0 0 0 0-4.174l-3.774 2.18z" />
                </svg>
                <div className="text-left">
                  <span className="block text-[10px] text-[#797F89] uppercase tracking-wider font-semibold font-body">Disponible en</span>
                  <span className="text-xs sm:text-sm font-bold text-[#000000] font-heading">Google Play Store</span>
                </div>
              </a>

              <span className="text-xs text-white/80 font-body">
                Compatible con Android 8.0+ y HarmonyOS
              </span>
            </div>

          </div>

          {/* Right QR Code Box */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white text-[#000000] p-6 sm:p-7 rounded-2xl shadow-md border border-black/10 text-center space-y-4 max-w-xs w-full font-body">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#797F89] font-heading">Escaneo Rápido</span>
                <h4 className="text-base font-bold text-[#000000] font-heading">Instala en tu Celular</h4>
              </div>

              {/* Clean Vector QR Code Simulation */}
              <div className="p-4 bg-[#FFFFFF] rounded-xl border border-black/10 flex items-center justify-center">
                <div className="relative p-2 bg-white rounded-lg shadow-2xs">
                  <svg className="w-36 h-36" viewBox="0 0 100 100" fill="currentColor">
                    {/* Corner Position Detection Patterns */}
                    <rect x="0" y="0" width="30" height="30" fill="#2B2B5E" rx="4" />
                    <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                    <rect x="10" y="10" width="10" height="10" fill="#2B2B5E" rx="1" />

                    <rect x="70" y="0" width="30" height="30" fill="#2B2B5E" rx="4" />
                    <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                    <rect x="80" y="10" width="10" height="10" fill="#2B2B5E" rx="1" />

                    <rect x="0" y="70" width="30" height="30" fill="#2B2B5E" rx="4" />
                    <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                    <rect x="10" y="80" width="10" height="10" fill="#2B2B5E" rx="1" />

                    {/* QR Payload Pattern dots */}
                    <rect x="36" y="8" width="6" height="6" fill="#0088CC" />
                    <rect x="48" y="8" width="6" height="6" fill="#2B2B5E" />
                    <rect x="58" y="14" width="6" height="6" fill="#0088CC" />
                    <rect x="36" y="24" width="6" height="6" fill="#2B2B5E" />
                    <rect x="48" y="20" width="6" height="6" fill="#0088CC" />
                    
                    <rect x="8" y="36" width="6" height="6" fill="#2B2B5E" />
                    <rect x="20" y="44" width="6" height="6" fill="#0088CC" />
                    <rect x="8" y="52" width="6" height="6" fill="#2B2B5E" />
                    <rect x="36" y="36" width="12" height="12" fill="#2B2B5E" rx="2" />
                    <rect x="54" y="36" width="6" height="6" fill="#198754" />
                    <rect x="68" y="36" width="10" height="6" fill="#2B2B5E" />
                    <rect x="84" y="44" width="6" height="12" fill="#0088CC" />

                    <rect x="36" y="54" width="6" height="6" fill="#0088CC" />
                    <rect x="48" y="60" width="10" height="6" fill="#2B2B5E" />
                    <rect x="64" y="54" width="6" height="12" fill="#2B2B5E" />
                    <rect x="80" y="62" width="8" height="8" fill="#0088CC" />

                    <rect x="36" y="76" width="10" height="6" fill="#2B2B5E" />
                    <rect x="52" y="82" width="6" height="10" fill="#198754" />
                    <rect x="64" y="76" width="12" height="6" fill="#2B2B5E" />
                    <rect x="82" y="78" width="8" height="8" fill="#2B2B5E" />
                  </svg>
                </div>
              </div>

              <p className="text-xs text-[#797F89] font-medium font-body">
                Apunta con la cámara de tu smartphone para descargar directamente la app oficial.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
