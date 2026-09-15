import React from 'react';
import { 
  Truck, 
  Recycle, 
  AlertTriangle, 
  HeartHandshake, 
  Sprout, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { NavigationSection } from '../types';

interface MunicipalServicesGridProps {
  onNavigate: (section: NavigationSection) => void;
}

interface ServiceCardItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ElementType;
  targetSection: NavigationSection;
  actionText: string;
  badge: string;
}

export const MunicipalServicesGrid: React.FC<MunicipalServicesGridProps> = ({ onNavigate }) => {
  const services: ServiceCardItem[] = [
    {
      id: 'servicio-rutas',
      title: '29 Rutas de Camiones',
      category: 'Monitoreo Satelital',
      badge: 'GPS en Vivo',
      description: 'Consulta el plano satelital con los 29 recorridos oficiales, paradas programadas y turnos en los 4 conos.',
      icon: Truck,
      targetSection: 'rutas',
      actionText: 'Consultar Rutas'
    },
    {
      id: 'servicio-segregacion',
      title: 'Segregación',
      category: 'Recolección Selectiva',
      badge: 'En la Fuente',
      description: 'Guía oficial para clasificar residuos orgánicos, reciclables y no aprovechables según el código de colores.',
      icon: Recycle,
      targetSection: 'recojo',
      actionText: 'Ver Guía de Recojo'
    },
    {
      id: 'servicio-reporta',
      title: 'Reporta al Vecino',
      category: 'Fiscalización Ciudadana',
      badge: 'Respuesta < 24h',
      description: 'Denuncias ambientales por arrojo de basura en vía pública con fotografía y geolocalización satelital.',
      icon: AlertTriangle,
      targetSection: 'fiscalizacion',
      actionText: 'Reportar Infracción'
    },
    {
      id: 'servicio-sumac-ayni',
      title: 'Sumac Ayni',
      category: 'Conservación Lacustre',
      badge: 'Voluntariado',
      description: 'Jornadas cívicas de limpieza en las orillas del Lago Titicaca, ecocanjes y educación ambiental comunitaria.',
      icon: HeartHandshake,
      targetSection: 'campanas',
      actionText: 'Ver Campañas'
    },
    {
      id: 'servicio-compostaje',
      title: 'Compostaje',
      category: 'Valorización Orgánica',
      badge: 'Kits Gratuitos',
      description: 'Solicitud de composteras domiciliarias y capacitación técnica para transformar residuos en abono natural.',
      icon: Sprout,
      targetSection: 'recojo',
      actionText: 'Solicitar Compostera'
    }
  ];

  return (
    <section id="servicios-residuos" className="py-12 sm:py-14 bg-[#F8FAFC] border-b border-[#E2E8F0] font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Encabezado Institucional del Bloque de Servicios */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#0088cc]/10 text-[#0088cc] border border-[#0088cc]/25 font-heading">
            <span>Plataforma de Atención Ciudadana</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#004173] tracking-tight font-heading mt-2">
            SERVICIOS DE GESTIÓN DE RESIDUOS SÓLIDOS
          </h2>
          <p className="text-sm sm:text-base text-[#64748b] leading-relaxed mt-1.5 font-normal">
            Accede a las herramientas oficiales y módulos operativos para mantener una ciudad limpia y proteger el Lago Titicaca.
          </p>
        </div>

        {/* Rejilla de Tarjetas de Servicios Digitales (5 Tarjetas Requeridas) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => onNavigate(service.targetSection)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onNavigate(service.targetSection);
                  }
                }}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-[#0088cc] transition-all duration-200 flex flex-col justify-between cursor-pointer group select-none text-left"
                aria-label={`Ir al servicio de ${service.title}`}
              >
                <div className="space-y-3.5">
                  {/* Icono y Badge de categoría */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-lg bg-[#0088cc]/10 text-[#0088cc] flex items-center justify-center border border-[#0088cc]/20 group-hover:bg-[#0088cc] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-105" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-[#004173] border border-slate-200">
                      {service.badge}
                    </span>
                  </div>

                  {/* Título y Categoría */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#0088cc] block leading-none">
                      {service.category}
                    </span>
                    <h3 className="text-base font-bold text-[#004173] group-hover:text-[#0088cc] transition-colors leading-snug font-heading">
                      {service.title}
                    </h3>
                  </div>

                  {/* Descripción concisa */}
                  <p className="text-xs text-[#64748b] leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Enlace inferior de acción */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0088cc] group-hover:text-[#004173] font-heading">
                  <span>{service.actionText}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
