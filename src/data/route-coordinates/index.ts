import { RUTA_01_COORDINATES } from './ruta-01';
import { RUTA_02_COORDINATES } from './ruta-02';
import { RUTA_03_COORDINATES } from './ruta-03';
import { RUTA_04_COORDINATES } from './ruta-04';
import { RUTA_05_COORDINATES } from './ruta-05';
import { RUTA_06_COORDINATES } from './ruta-06';
import { RUTA_07_COORDINATES } from './ruta-07';
import { RUTA_08_COORDINATES } from './ruta-08';
import { RUTA_09_COORDINATES } from './ruta-09';
import { RUTA_10_COORDINATES } from './ruta-10';
import { RUTA_11_COORDINATES } from './ruta-11';
import { RUTA_12_COORDINATES } from './ruta-12';
import { RUTA_13_COORDINATES } from './ruta-13';
import { RUTA_14_COORDINATES } from './ruta-14';
import { RUTA_15_COORDINATES } from './ruta-15';
import { RUTA_16_COORDINATES } from './ruta-16';
import { RUTA_17_COORDINATES } from './ruta-17';
import { RUTA_18_COORDINATES } from './ruta-18';
import route19Coordinates from './ruta-19';
import { route20Coordinates } from './ruta-20';
import { route21Coordinates } from './ruta-21';
import route22Coordinates from './ruta-22';
import { route23Coordinates } from './ruta-23';
import { route24Coordinates } from './ruta-24';
import { route25Coordinates } from './ruta-25';
import { RUTA_26_COORDINATES } from './ruta-26';
import { RUTA_27_COORDINATES } from './ruta-27';
import { RUTA_28_COORDINATES } from './ruta-28';
import { RUTA_29_COORDINATES } from './ruta-29';

export const RUTA_19_COORDINATES: [number, number][] = route19Coordinates;
export const RUTA_20_COORDINATES: [number, number][] = route20Coordinates;
export const RUTA_21_COORDINATES: [number, number][] = route21Coordinates;
export const RUTA_22_COORDINATES: [number, number][] = route22Coordinates;
export const RUTA_23_COORDINATES: [number, number][] = route23Coordinates;
export const RUTA_24_COORDINATES: [number, number][] = route24Coordinates;
export const RUTA_25_COORDINATES: [number, number][] = route25Coordinates;

export {
  RUTA_01_COORDINATES,
  RUTA_02_COORDINATES,
  RUTA_03_COORDINATES,
  RUTA_04_COORDINATES,
  RUTA_05_COORDINATES,
  RUTA_06_COORDINATES,
  RUTA_07_COORDINATES,
  RUTA_08_COORDINATES,
  RUTA_09_COORDINATES,
  RUTA_10_COORDINATES,
  RUTA_11_COORDINATES,
  RUTA_12_COORDINATES,
  RUTA_13_COORDINATES,
  RUTA_14_COORDINATES,
  RUTA_15_COORDINATES,
  RUTA_16_COORDINATES,
  RUTA_17_COORDINATES,
  RUTA_18_COORDINATES,
  RUTA_26_COORDINATES,
  RUTA_27_COORDINATES,
  RUTA_28_COORDINATES,
  RUTA_29_COORDINATES,
};

/**
 * Mapeo modular de ID de ruta ('ruta-01' a 'ruta-29') a coordenadas nativas [lat, lng].
 * Todas las rutas están implementadas en TypeScript puro sin necesidad de archivos GeoJSON externos.
 */
export const ROUTE_COORDINATES_MAP: Record<string, [number, number][]> = {
  'ruta-01': RUTA_01_COORDINATES,
  'ruta-02': RUTA_02_COORDINATES,
  'ruta-03': RUTA_03_COORDINATES,
  'ruta-04': RUTA_04_COORDINATES,
  'ruta-05': RUTA_05_COORDINATES,
  'ruta-06': RUTA_06_COORDINATES,
  'ruta-07': RUTA_07_COORDINATES,
  'ruta-08': RUTA_08_COORDINATES,
  'ruta-09': RUTA_09_COORDINATES,
  'ruta-10': RUTA_10_COORDINATES,
  'ruta-11': RUTA_11_COORDINATES,
  'ruta-12': RUTA_12_COORDINATES,
  'ruta-13': RUTA_13_COORDINATES,
  'ruta-14': RUTA_14_COORDINATES,
  'ruta-15': RUTA_15_COORDINATES,
  'ruta-16': RUTA_16_COORDINATES,
  'ruta-17': RUTA_17_COORDINATES,
  'ruta-18': RUTA_18_COORDINATES,
  'ruta-19': RUTA_19_COORDINATES,
  'ruta-20': RUTA_20_COORDINATES,
  'ruta-21': RUTA_21_COORDINATES,
  'ruta-22': RUTA_22_COORDINATES,
  'ruta-23': RUTA_23_COORDINATES,
  'ruta-24': RUTA_24_COORDINATES,
  'ruta-25': RUTA_25_COORDINATES,
  'ruta-26': RUTA_26_COORDINATES,
  'ruta-27': RUTA_27_COORDINATES,
  'ruta-28': RUTA_28_COORDINATES,
  'ruta-29': RUTA_29_COORDINATES,
};

/**
 * Obtiene las coordenadas de trazado de una ruta por su ID ('ruta-01') o número (1..29).
 */
export function getRouteCoordinates(routeIdOrNumber: string | number): [number, number][] | null {
  const key = typeof routeIdOrNumber === 'number'
    ? `ruta-${routeIdOrNumber.toString().padStart(2, '0')}`
    : routeIdOrNumber;
  return ROUTE_COORDINATES_MAP[key] || null;
}

/**
 * Puntos GPS de anclaje de inicio y fin para las 29 rutas de Puno.
 * Calculados automáticamente a partir de las coordenadas reales en formato TypeScript.
 */
export const DEFAULT_ROUTE_COORDINATES: Record<
  number,
  { start: [number, number]; end: [number, number]; geojsonFile: null }
> = Array.from({ length: 29 }, (_, i) => i + 1).reduce((acc, num) => {
  const key = `ruta-${num.toString().padStart(2, '0')}`;
  const coords = ROUTE_COORDINATES_MAP[key];
  if (coords && coords.length > 0) {
    acc[num] = {
      start: coords[0],
      end: coords[coords.length - 1],
      geojsonFile: null,
    };
  } else {
    acc[num] = {
      start: [-15.8402, -70.0219],
      end: [-15.8368, -70.0245],
      geojsonFile: null,
    };
  }
  return acc;
}, {} as Record<number, { start: [number, number]; end: [number, number]; geojsonFile: null }>);
