import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Clock, Calendar, Truck, MapPin, CheckCircle, Shield, Download } from 'lucide-react';
import { RouteDetail } from '../types';
import { downloadRoutePDF } from '../utils/pdfGenerator';

interface RouteDetailModalProps {
  route: RouteDetail | null;
  onClose: () => void;
}

export const RouteDetailModal: React.FC<RouteDetailModalProps> = ({ route, onClose }) => {
  useEffect(() => {
    if (!route) return;

    // Bloquear scroll de la página mientras el modal esté abierto
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Cerrar con tecla Escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [route, onClose]);

  if (!route) return null;
  if (typeof document === 'undefined') return null;

  const modalElement = (
    <div
      id="modal-ficha-tecnica-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Ficha Técnica Completa - ${route.name}`}
    >
      <div 
        id="modal-ficha-tecnica-card"
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-xl border border-[#E9ECEF] overflow-hidden animate-in zoom-in-95 duration-200 my-auto font-body"
      >
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#2B2B5E] text-white flex items-start justify-between relative shrink-0">
          <div className="space-y-1.5 pr-4">
            <div className="flex items-center gap-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0088CC] text-white uppercase tracking-wider font-heading">
                {route.sector}
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#198754] text-white font-heading">
                🟢 {route.status || 'Servicio Activo'}
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight font-heading">
              {route.name}
            </h3>
            <p className="text-xs text-slate-200 font-medium flex items-center gap-1.5 pt-0.5 font-body">
              <Truck className="w-3.5 h-3.5 text-sky-300" />
              Unidad asignada: {route.truckUnit}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => downloadRoutePDF(route)}
              title="Descargar Ficha en PDF"
              className="p-2 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold font-heading"
            >
              <Download className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-black/10">
              <div className="flex items-center gap-1.5 text-xs text-[#797F89] font-medium mb-1 font-heading">
                <Clock className="w-4 h-4 text-[#0088CC]" />
                <span>Horario Oficial</span>
              </div>
              <p className="text-sm font-bold text-[#000000] font-heading">{route.schedule}</p>
              <span className="text-[11px] text-[#797F89] font-body">Turno: {route.shift}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-black/10">
              <div className="flex items-center gap-1.5 text-xs text-[#797F89] font-medium mb-1 font-heading">
                <Calendar className="w-4 h-4 text-[#198754]" />
                <span>Frecuencia</span>
              </div>
              <p className="text-sm font-bold text-[#000000] font-heading">{route.frequency}</p>
              <span className="text-[11px] text-[#198754] font-medium font-body">Recojo Programado</span>
            </div>

            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-black/10">
              <div className="flex items-center gap-1.5 text-xs text-[#797F89] font-medium mb-1 font-heading">
                <Shield className="w-4 h-4 text-[#0088CC]" />
                <span>Cobertura Estimada</span>
              </div>
              <p className="text-sm font-bold text-[#000000] font-heading">~{route.estimatedHouseholds.toLocaleString()} Familias</p>
              <span className="text-[11px] text-[#797F89] font-body">Padrón Municipal 2026</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#797F89] font-heading">Descripción del Circuito</h4>
            <p className="text-sm text-[#2B2B5E] leading-relaxed bg-[#FFFFFF] p-3 rounded-xl border border-black/10 font-body">
              {route.description}
            </p>
          </div>

          {/* Streets Covered */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#797F89] font-heading">
              Calles, Avenidas y Pasajes Comprendidos ({route.coverageStreets.length})
            </h4>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
              {route.coverageStreets.map((street, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-white text-[#000000] border border-black/10 font-body"
                >
                  <MapPin className="w-3 h-3 text-[#0088CC]" />
                  {street}
                </span>
              ))}
            </div>
          </div>

          {/* Main Landmark Points */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#797F89] font-heading">Puntos de Referencia y Paradas Principales</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {route.mainPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#000000] p-2.5 rounded-lg bg-[#198754]/10 border border-[#198754]/20 font-medium font-body">
                  <CheckCircle className="w-3.5 h-3.5 text-[#198754] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FFFFFF] border-t border-black/10 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => downloadRoutePDF(route)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-[#0088CC] hover:bg-[#0077B5] text-white transition-colors cursor-pointer shadow-xs font-heading"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Descargar Ficha PDF</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-white hover:bg-black/5 text-[#2B2B5E] border border-black/15 transition-colors cursor-pointer font-heading"
          >
            Cerrar Detalle
          </button>
        </div>

      </div>
    </div>
  );

  return createPortal(modalElement, document.body);
};
