import React from 'react';
import { FaqSection as FaqComponent } from '../components/FaqSection';

export const FaqSection: React.FC = () => {
  return (
    <div id="section-faq" className="animate-in fade-in duration-300">
      <FaqComponent />
    </div>
  );
};
