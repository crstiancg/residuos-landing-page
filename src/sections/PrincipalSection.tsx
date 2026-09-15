import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { MunicipalServicesGrid } from '../components/MunicipalServicesGrid';
import { EnvironmentalImpactGallery } from '../components/EnvironmentalImpactGallery';
import { MunicipalNewsModule } from '../components/MunicipalNewsModule';
import { NavigationSection } from '../types';

interface PrincipalSectionProps {
  onNavigate: (section: NavigationSection) => void;
  onNavigateToNews?: (newsId: string) => void;
}

export const PrincipalSection: React.FC<PrincipalSectionProps> = ({ onNavigate, onNavigateToNews }) => {
  return (
    <div id="section-principal" className="space-y-12 sm:space-y-16 pb-20 animate-in fade-in duration-300">
      
      {/* 1. Banner Institucional Horizontal */}
      <HeroSection 
        onScrollToRoutes={() => onNavigate('rutas')}
        onScrollToReports={() => onNavigate('fiscalizacion')}
        onScrollToApp={() => onNavigate('campanas')}
      />

      {/* 2. Bloque Independiente: Servicios de Gestión de Residuos Sólidos (5 Tarjetas) */}
      <MunicipalServicesGrid onNavigate={onNavigate} />

      {/* 3. Indicadores Operativos Consolidados (Estilo Municipal Sobrio) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="text-center mb-6">
            <span className="text-[11px] uppercase font-bold text-[#004173] tracking-wider font-heading">
              Indicadores Operativos Consolidados • Municipalidad Provincial de Puno
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0088cc] font-heading">29</div>
              <div className="text-xs font-bold text-[#004173] uppercase tracking-wider font-heading">Rutas Diarias</div>
              <p className="text-[11px] text-[#64748b] font-body">Cobertura en los 4 conos</p>
            </div>
            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#16a34a] font-heading">100%</div>
              <div className="text-xs font-bold text-[#004173] uppercase tracking-wider font-heading">Barrios Atendidos</div>
              <p className="text-[11px] text-[#64748b] font-body">Centro, Norte, Sur y Alturas</p>
            </div>
            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0088cc] font-heading">14</div>
              <div className="text-xs font-bold text-[#004173] uppercase tracking-wider font-heading">Compactadores</div>
              <p className="text-[11px] text-[#64748b] font-body">Flota con monitoreo GPS</p>
            </div>
            <div className="space-y-1 pt-4 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#004173] font-heading">Itapalluni</div>
              <div className="text-xs font-bold text-[#004173] uppercase tracking-wider font-heading">Relleno Sanitario</div>
              <p className="text-[11px] text-[#64748b] font-body">Disposición final tecnificada</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Galería de Impacto Ambiental */}
      <EnvironmentalImpactGallery />

      {/* 5. Noticias / Actualizaciones Institucionales */}
      <MunicipalNewsModule onNavigateToNews={onNavigateToNews} />

    </div>
  );
};

export const DashboardSection = PrincipalSection;
