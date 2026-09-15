import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  ShieldAlert, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { NavigationSection } from '../types';

interface FooterProps {
  onNavigate?: (section: NavigationSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, section: NavigationSection) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(section);
    }
  };

  return (
    <footer id="main-footer" className="bg-[#004173] text-white border-t-4 border-[#0088cc] text-xs sm:text-sm font-body">
      {/* Contenido Principal del Footer - 4 Columnas Institucionales */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Columna 1: Identidad Institucional Oficial (4 columnas) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <img 
                src="/assets/logo-mpp.png" 
                alt="Escudo de la Municipalidad Provincial de Puno" 
                className="h-16 w-auto object-contain bg-white/10 p-1.5 rounded-lg border border-white/20"
              />
              <div>
                <h3 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-white font-heading leading-tight">
                  MUNICIPALIDAD DE PUNO
                </h3>
                <p className="text-xs text-white/90 font-medium font-body mt-0.5">
                  Muni Puno Digital • GGIRS
                </p>
                <span className="text-[11px] text-[#ffd900] font-semibold block">
                  Gestión Integral de Residuos Sólidos
                </span>
              </div>
            </div>

            <p className="text-xs text-white/80 leading-relaxed font-body">
              Plataforma oficial para la consulta de las 29 rutas de recolección de basura, segregación en la fuente, fiscalización vecinal y preservación de la bahía del Lago Titicaca.
            </p>

            {/* Redes Sociales Oficiales */}
            <div className="pt-2 flex items-center gap-3 text-white">
              <a 
                href="https://www.facebook.com/municipalidadpuno" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#0088cc] flex items-center justify-center transition-colors text-white hover:text-[#ffd900]"
                aria-label="Facebook Municipalidad Provincial de Puno"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a 
                href="https://www.instagram.com/munipuno/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#0088cc] flex items-center justify-center transition-colors text-white hover:text-[#ffd900]"
                aria-label="Instagram Municipalidad Provincial de Puno"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a 
                href="https://www.tiktok.com/@tumunipuno" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#0088cc] flex items-center justify-center transition-colors text-white hover:text-[#ffd900]"
                aria-label="TikTok Municipalidad Provincial de Puno"
                title="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Números de Emergencia y Contacto Oficial (3 columnas) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffd900] font-heading">
              Números de Emergencia y Contacto
            </h4>
            <div className="space-y-3 text-xs text-white/90 font-body">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ffd900] shrink-0 mt-0.5" />
                <span>Jr. Deustua N° 458 • Plaza de Armas, Puno</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#ffd900] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold">Central Telefónica: (051) 601000</span>
                  <span className="text-white/80">Serenazgo Puno: (051) 601010</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#ffd900] shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:alcaldia@munipuno.gob.pe" className="hover:text-[#ffd900] transition-colors block">
                    alcaldia@munipuno.gob.pe
                  </a>
                  <a href="mailto:residuossolidos@munipuno.gob.pe" className="hover:text-[#ffd900] transition-colors text-white/80 block">
                    residuossolidos@munipuno.gob.pe
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#ffd900] shrink-0 mt-0.5" />
                <span>Lunes a Viernes: 08:00 AM - 04:30 PM</span>
              </div>
            </div>
          </div>

          {/* Columna 3: Servicios Digitales de Residuos Sólidos (3 columnas) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffd900] font-heading">
              Servicios Digitales GGIRS
            </h4>
            <ul className="space-y-2.5 text-xs font-body">
              <li>
                <button 
                  onClick={(e) => handleNav(e, 'rutas')}
                  className="text-white/90 hover:text-[#ffd900] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ffd900]" />
                  <span>29 Rutas de Camiones y Horarios</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleNav(e, 'recojo')}
                  className="text-white/90 hover:text-[#ffd900] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ffd900]" />
                  <span>Recojo Selectivo y Segregación</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleNav(e, 'fiscalizacion')}
                  className="text-white/90 hover:text-[#ffd900] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ffd900]" />
                  <span>Fiscalización y Denuncias Ambientales</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleNav(e, 'campanas')}
                  className="text-white/90 hover:text-[#ffd900] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ffd900]" />
                  <span>Campaña Sumac Ayni y Voluntariado</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleNav(e, 'recojo')}
                  className="text-white/90 hover:text-[#ffd900] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ffd900]" />
                  <span>Programa de Compostaje Domiciliario</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleNav(e, 'app-movil')}
                  className="text-white/90 hover:text-[#ffd900] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#ffd900]" />
                  <span>App Móvil Muni Puno Digital</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 4: Enlaces Institucionales y Transparencia (2 columnas) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ffd900] font-heading">
              Enlaces Principales
            </h4>
            <ul className="space-y-2 text-xs font-body">
              <li>
                <a 
                  href="https://www.transparencia.gob.pe/enlaces/pte_transparencia_enlaces.aspx?id_entidad=1772&id_tema=1&ver=D#.XH1JfXl8OUk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-[#ffd900] transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-[#ffd900]" />
                  <span>Portal Transparencia</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://portal.munipuno.gob.pe/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-[#ffd900] transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3 text-[#ffd900]" />
                  <span>Portal Oficial MPP</span>
                </a>
              </li>
              <li>
                <button 
                  onClick={(e) => handleNav(e, 'campanas')}
                  className="text-white/90 hover:text-[#ffd900] transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ShieldCheck className="w-3 h-3 text-[#ffd900]" />
                  <span>App Móvil Puno Limpio</span>
                </button>
              </li>
            </ul>

            <div className="pt-3">
              <div className="bg-white/10 rounded-lg p-3 border border-white/15 text-[11px] text-white/90 space-y-1">
                <span className="font-bold block text-white">Mesa de Partes</span>
                <p className="text-white/80">Lunes a Viernes de 08:00 a 16:30 hrs</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Barra Inferior de Derechos Reservados */}
      <div className="bg-[#002f54] border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/80 font-body">
          <p>
            © 2026 Municipalidad Provincial de Puno - Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-white/90">
            <span>Gestión Municipal 2023 - 2026</span>
            <span className="text-white/40">•</span>
            <span className="text-[#ffd900] font-semibold">Puno Renace</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
