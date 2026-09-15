import React from 'react';
import { SegregationModule } from '../components/SegregationModule';
import { CompostModule } from '../components/CompostModule';

export const RecojoSection: React.FC = () => {
  return (
    <div id="section-recojo" className="space-y-0 animate-in fade-in duration-300">
      {/* Módulo 1: Segregación en la Fuente */}
      <SegregationModule />

      {/* Módulo 2: Programa de Compostaje Domiciliario */}
      <CompostModule />
    </div>
  );
};
