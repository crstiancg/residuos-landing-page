import React from 'react';
import { SumacAyniModule } from '../components/SumacAyniModule';
import { AppDownloadSection } from '../components/AppDownloadSection';

export const CampanasSection: React.FC = () => {
  return (
    <div id="section-campanas" className="space-y-0 animate-in fade-in duration-300">
      {/* 1. Sumac Ayni: Campañas Ambientales y Ecocanjes */}
      <SumacAyniModule />

      {/* 2. Descarga de la Aplicación Móvil Municipal */}
      <AppDownloadSection />
    </div>
  );
};
