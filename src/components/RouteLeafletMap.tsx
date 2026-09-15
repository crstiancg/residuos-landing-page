import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RouteDetail } from '../types';
import { Maximize2, Minimize2, Play, Pause, Square, RotateCcw } from 'lucide-react';
import { getRouteCoordinates } from '../data/punoRoutesData';

interface RouteLeafletMapProps {
  activeRoute: RouteDetail | null;
  onSelectRoute: (routeId: string) => void;
  searchedStreet?: string | null;
}

// Cálculo de distancia métrica en metros usando fórmula de Haversine
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Cálculo del ángulo de dirección (rumbo / bearing) en grados (0° = Norte, 90° = Este, 180° = Sur, 270° = Oeste)
function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  return ((θ * 180) / Math.PI + 360) % 360;
}

function getTruckTransform(bearing: number): string {
  // Rotación real en grados (0-360) para que el camión apunte en la dirección del movimiento
  return `rotate(${bearing}deg)`;
}

export const RouteLeafletMap: React.FC<RouteLeafletMapProps> = ({
  activeRoute,
  searchedStreet,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const currentRouteLayerRef = useRef<L.Polyline | null>(null);
  const startMarkerRef = useRef<L.Marker | null>(null);
  const endMarkerRef = useRef<L.Marker | null>(null);
  const truckMarkerRef = useRef<L.Marker | null>(null);
  const streetMarkerRef = useRef<L.Marker | null>(null);

  // Coordenadas en formato [lat, lng] de la ruta activa
  const routePointsRef = useRef<[number, number][]>([]);
  const distancesRef = useRef<number[]>([]);
  const totalDistanceRef = useRef<number>(0);

  // Estados de interfaz y animación
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Controles de animación del vehículo
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // 0 a 1
  const [speed, setSpeed] = useState<number>(1); // 0.5x, 1x, 2x

  const animFrameIdRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);
  const speedRef = useRef<number>(1);
  const isPlayingRef = useRef<boolean>(false);

  // Mantener refs sincronizadas con estado
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // 1. Inicializar mapa Leaflet con OpenStreetMap únicamente
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Centrado inicial en Puno, Perú
    const map = L.map(mapContainerRef.current, {
      center: [-15.8402, -70.0282],
      zoom: 14,
      zoomControl: false,
      attributionControl: true,
    });

    // Controles de zoom estándar (+ y -)
    L.control.zoom({ position: 'topleft' }).addTo(map);

    // Capa base única oficial: OpenStreetMap
    const osmTiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });
    osmTiles.addTo(map);

    mapInstanceRef.current = map;

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Redibujado al cambiar modo pantalla completa
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 250);
    }
  }, [isFullscreen]);

  // Obtener posición e inclinación interpolada para un progreso (0..1) usando [lat, lng]
  const getInterpolatedState = useCallback((p: number) => {
    const points = routePointsRef.current;
    if (points.length === 0) return null;
    if (points.length === 1) return { lat: points[0][0], lng: points[0][1], bearing: 0 };

    const totalDist = totalDistanceRef.current;
    if (totalDist === 0) return { lat: points[0][0], lng: points[0][1], bearing: 0 };

    const targetDist = Math.max(0, Math.min(1, p)) * totalDist;
    const distances = distancesRef.current;

    let accumulated = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const segLen = distances[i];
      if (accumulated + segLen >= targetDist || i === points.length - 2) {
        const segProgress = segLen > 0 ? (targetDist - accumulated) / segLen : 0;
        const clampedT = Math.max(0, Math.min(1, segProgress));
        const p1 = points[i];
        const p2 = points[i + 1];

        const lat = p1[0] + (p2[0] - p1[0]) * clampedT;
        const lng = p1[1] + (p2[1] - p1[1]) * clampedT;
        const bearing = calculateBearing(p1[0], p1[1], p2[0], p2[1]);

        return { lat, lng, bearing };
      }
      accumulated += segLen;
    }

    const last = points[points.length - 1];
    const prev = points[points.length - 2];
    return { lat: last[0], lng: last[1], bearing: calculateBearing(prev[0], prev[1], last[0], last[1]) };
  }, []);

  // Actualizar la posición del marcador del camión recolector usando [lat, lng]
  const updateTruckMarkerPosition = useCallback((p: number) => {
    const state = getInterpolatedState(p);
    if (!state || !truckMarkerRef.current) return;

    truckMarkerRef.current.setLatLng([state.lat, state.lng]);

    // Rotar el icono según el rumbo del trayecto
    const el = truckMarkerRef.current.getElement();
    if (el) {
      let iconInner = el.querySelector('.truck-heading-indicator') as HTMLElement | null;
      if (!iconInner) {
        el.innerHTML = `<span class="truck-heading-indicator" style="display:inline-block;transition:transform 0.1s linear;">${el.textContent?.trim() || '🚛'}</span>`;
        iconInner = el.querySelector('.truck-heading-indicator');
      }
      if (iconInner) {
        iconInner.style.transform = getTruckTransform(state.bearing);
      }
    }
  }, [getInterpolatedState]);

  // Bucle continuo de animación del vehículo
  const animateTruck = useCallback((timestamp: number) => {
    if (!isPlayingRef.current) return;

    if (!lastTimestampRef.current) {
      lastTimestampRef.current = timestamp;
    }

    const deltaSec = (timestamp - lastTimestampRef.current) / 1000;
    lastTimestampRef.current = timestamp;

    const baseDuration = 14;
    const step = (deltaSec / baseDuration) * speedRef.current;
    let nextProgress = progressRef.current + step;

    if (nextProgress >= 1) {
      nextProgress = 1;
      setIsPlaying(false);
      isPlayingRef.current = false;
    }

    setProgress(nextProgress);
    progressRef.current = nextProgress;
    updateTruckMarkerPosition(nextProgress);

    if (isPlayingRef.current) {
      animFrameIdRef.current = requestAnimationFrame(animateTruck);
    }
  }, [updateTruckMarkerPosition]);

  // Manejador de Play / Pausa
  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    } else {
      if (progress >= 1) {
        setProgress(0);
        progressRef.current = 0;
        updateTruckMarkerPosition(0);
      }
      setIsPlaying(true);
      isPlayingRef.current = true;
      lastTimestampRef.current = null;
      animFrameIdRef.current = requestAnimationFrame(animateTruck);
    }
  };

  // Manejador de Detener (Stop)
  const handleStop = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }
    setProgress(0);
    progressRef.current = 0;
    updateTruckMarkerPosition(0);
  };

  // Manejador de cambio manual en la barra de progreso
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value) / 100;
    setProgress(val);
    progressRef.current = val;
    updateTruckMarkerPosition(val);
  };

  // 2. Cargar y renderizar la ruta seleccionada
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Detener animaciones en curso
    setIsPlaying(false);
    isPlayingRef.current = false;
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
    }
    setProgress(0);
    progressRef.current = 0;

    // Limpiar capas y marcadores previos
    if (currentRouteLayerRef.current) {
      map.removeLayer(currentRouteLayerRef.current);
      currentRouteLayerRef.current = null;
    }
    if (startMarkerRef.current) {
      map.removeLayer(startMarkerRef.current);
      startMarkerRef.current = null;
    }
    if (endMarkerRef.current) {
      map.removeLayer(endMarkerRef.current);
      endMarkerRef.current = null;
    }
    if (truckMarkerRef.current) {
      map.removeLayer(truckMarkerRef.current);
      truckMarkerRef.current = null;
    }
    if (streetMarkerRef.current) {
      map.removeLayer(streetMarkerRef.current);
      streetMarkerRef.current = null;
    }

    routePointsRef.current = [];
    distancesRef.current = [];
    totalDistanceRef.current = 0;

    // Si no hay ruta seleccionada, centrar en Puno
    if (!activeRoute) {
      map.setView([-15.8402, -70.0282], 13.5, { animate: true });
      return;
    }

    const applyRouteCoordinates = (coordenadas: [number, number][]) => {
      if (!mapInstanceRef.current || !coordenadas || coordenadas.length < 2) return;
      const m = mapInstanceRef.current;

      if (currentRouteLayerRef.current) m.removeLayer(currentRouteLayerRef.current);
      if (startMarkerRef.current) m.removeLayer(startMarkerRef.current);
      if (endMarkerRef.current) m.removeLayer(endMarkerRef.current);
      if (truckMarkerRef.current) m.removeLayer(truckMarkerRef.current);
      if (streetMarkerRef.current) m.removeLayer(streetMarkerRef.current);

      routePointsRef.current = coordenadas;

      // Calcular distancias acumuladas para interpolación métrica
      const dists: number[] = [];
      let total = 0;
      for (let i = 0; i < coordenadas.length - 1; i++) {
        const d = haversineDistance(
          coordenadas[i][0],
          coordenadas[i][1],
          coordenadas[i + 1][0],
          coordenadas[i + 1][1]
        );
        dists.push(d);
        total += d;
      }
      distancesRef.current = dists;
      totalDistanceRef.current = total;

      // 2. Dibujar ruta (ahora en posición correcta)
      const polyline = L.polyline(coordenadas, {
        color: activeRoute.color || '#2E7D32',
        weight: 5,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(m);
      currentRouteLayerRef.current = polyline;

      // 3. Marcador de INICIO (primer punto)
      const startMarker = L.marker(coordenadas[0], {
        icon: L.divIcon({
          className: 'marcador-inicio',
          html: '🟢',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        }),
        zIndexOffset: 900,
      }).addTo(m);

      startMarker.bindPopup(`
        <div style="font-size: 12px; font-family: inherit; min-width: 160px;">
          <strong style="color: #15803D; font-size: 13px;">🟢 Punto de Inicio</strong><br/>
          <span style="font-weight: 600;">${activeRoute.name}</span><br/>
          <div style="color: #64748B; font-size: 11px; margin-top: 4px;">
            Horario: <strong>${activeRoute.schedule}</strong>
          </div>
        </div>
      `);
      startMarkerRef.current = startMarker;

      // 4. Marcador de FINAL (último punto)
      const endMarker = L.marker(coordenadas[coordenadas.length - 1], {
        icon: L.divIcon({
          className: 'marcador-final',
          html: '🔴',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        }),
        zIndexOffset: 900,
      }).addTo(m);

      endMarker.bindPopup(`
        <div style="font-size: 12px; font-family: inherit; min-width: 160px;">
          <strong style="color: #DC2626; font-size: 13px;">🔴 Punto Final</strong><br/>
          <span style="font-weight: 600;">Fin de Cobertura de la Ruta</span><br/>
          <div style="color: #64748B; font-size: 11px; margin-top: 4px;">
            Destino: <strong>Relleno Sanitario Itapalluni</strong>
          </div>
        </div>
      `);
      endMarkerRef.current = endMarker;

      // 5. Ajustar zoom para ver toda la ruta
      m.fitBounds(L.latLngBounds(coordenadas), {
        padding: [50, 50],
        maxZoom: 16,
      });

      // 6. Carrito animado con coordenadas corregidas
      const initialBearing = coordenadas.length >= 2
        ? calculateBearing(coordenadas[0][0], coordenadas[0][1], coordenadas[1][0], coordenadas[1][1])
        : 0;

      const initialTransform = getTruckTransform(initialBearing);

      const truckMarker = L.marker(coordenadas[0], {
        icon: L.divIcon({
          className: 'marcador-carrito',
          html: `<div class="truck-heading-indicator" style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;font-size:26px;line-height:1;filter:drop-shadow(0 2px 5px rgba(0,0,0,0.4));transform:${initialTransform};transition:transform 0.1s linear;">🚛</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        }),
        zIndexOffset: 1000,
      }).addTo(m);

      truckMarker.bindPopup(`
        <div style="font-size: 12px; font-family: inherit;">
          <strong style="color: #0B335E; font-size: 13px;">🚛 Vehículo de Recolección</strong><br/>
          <span style="font-weight: 600;">${activeRoute.truckUnit}</span><br/>
          <span style="color: #15803D; font-size: 11px;">En simulación de ruta</span>
        </div>
      `);
      truckMarkerRef.current = truckMarker;

      // Marcador de calle buscada si aplica
      if (searchedStreet) {
        const center = L.latLngBounds(coordenadas).getCenter();
        const pinIcon = L.divIcon({
          className: 'custom-street-pin',
          html: `
            <div style="
              background: #E5A91E; 
              color: #0F172A; 
              padding: 4px 8px; 
              border-radius: 6px; 
              font-size: 11px; 
              font-weight: 800; 
              white-space: nowrap; 
              border: 2px solid #FFFFFF; 
              box-shadow: 0 4px 12px rgba(0,0,0,0.25);
              display: flex;
              align-items: center;
              gap: 4px;
            ">
              <span>📍</span>
              <span>${searchedStreet}</span>
            </div>
          `,
          iconAnchor: [30, 20],
        });

        const sMarker = L.marker(center, { icon: pinIcon, zIndexOffset: 950 }).addTo(m);
        streetMarkerRef.current = sMarker;
      }
    };

    // Trazado de ruta 100% en memoria mediante TypeScript puro
    const coordenadas = (activeRoute.coordinates && activeRoute.coordinates.length >= 2)
      ? activeRoute.coordinates
      : getRouteCoordinates(activeRoute.id) || getRouteCoordinates(activeRoute.number) || [];

    if (coordenadas.length >= 2) {
      applyRouteCoordinates(coordenadas);
    }
  }, [activeRoute, searchedStreet]);

  const progressPercent = Math.round(progress * 100);

  return (
    <div
      id="contenedor-mapa-leaflet"
      className={`w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'relative min-h-[560px] h-[580px]'
      }`}
    >
      {/* ============================================================ */}
      {/* BARRA SUPERIOR: LEYENDA Y HERRAMIENTAS                       */}
      {/* ============================================================ */}
      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5 shrink-0 z-10">
        
        {/* Leyenda: 🟢 Inicio | 🔴 Final | 🚛 Vehículo */}
        <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md">
            <span>🟢</span>
            <span>Inicio</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-md">
            <span>🔴</span>
            <span>Final</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-900 border border-sky-200 px-2 py-0.5 rounded-md">
            <span>🚛</span>
            <span>Vehículo</span>
          </span>
        </div>

        {/* Herramientas de navegación: Centrar y Pantalla Completa */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => {
              if (mapInstanceRef.current && routePointsRef.current.length > 0) {
                const bounds = L.latLngBounds(routePointsRef.current);
                mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 16, animate: true });
              } else if (mapInstanceRef.current) {
                mapInstanceRef.current.setView([-15.8402, -70.0282], 14, { animate: true });
              }
            }}
            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
            title="Centrar ruta"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Centrar</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CONTENEDOR DEL MAPA LEAFLET: LIMPIO                          */}
      {/* ============================================================ */}
      <div className="relative flex-1 w-full bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* ============================================================ */}
      {/* BARRA INFERIOR: CONTROLES DE ANIMACIÓN Y PROGRESO            */}
      {/* ============================================================ */}
      {activeRoute && (
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 space-y-2 shrink-0 z-10">
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            
            {/* Controles de reproducción: Play, Pausa, Stop */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePlayPause}
                id="btn-anim-play"
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-[#15803D] hover:bg-[#166534] text-white'
                }`}
                title={isPlaying ? 'Pausar recorrido' : 'Iniciar recorrido'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pausa</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{progress >= 1 ? 'Reiniciar' : 'Play'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleStop}
                id="btn-anim-stop"
                className="px-2.5 py-1.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 transition-all cursor-pointer"
                title="Detener y volver al inicio"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Detener</span>
              </button>

              {/* Selector de Velocidad: 0.5x, 1x, 2x */}
              <div className="flex items-center rounded-xl bg-slate-100 p-0.5 ml-1 border border-slate-200">
                {([0.5, 1, 2] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSpeed(spd)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                      speed === spd
                        ? 'bg-[#0B335E] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Progreso del recorrido en porcentaje */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 ml-auto">
              <span className="text-slate-500 font-medium">Progreso:</span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[#0B335E] font-mono">
                {progressPercent}%
              </span>
            </div>
          </div>

          {/* Barra de progreso interactiva (slider) */}
          <div className="flex items-center gap-3 pt-1">
            <span className="text-[11px] font-bold text-emerald-700 shrink-0">🟢 0%</span>
            <input
              type="range"
              min="0"
              max="100"
              step="0.5"
              value={progressPercent}
              onChange={handleProgressChange}
              id="slider-progreso-ruta"
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1474B4]"
              aria-label="Progreso del recorrido"
            />
            <span className="text-[11px] font-bold text-rose-700 shrink-0">🔴 100%</span>
          </div>

        </div>
      )}
    </div>
  );
};
