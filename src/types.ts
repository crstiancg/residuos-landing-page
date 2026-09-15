export type WasteCategory = 'organico' | 'inorganico' | 'no_aprovechable';

export interface RouteDetail {
  id: string;
  number: number;
  name: string;
  sector: 'Sector 1 - Centro Histórico' | 'Sector 2 - Zona Norte' | 'Sector 3 - Zona Sur' | 'Sector 4 - Zona Alta y Expansión';
  sectorCode: 1 | 2 | 3 | 4;
  schedule: string;
  shift: 'Mañana' | 'Tarde' | 'Noche';
  frequency: string;
  truckUnit: string;
  estimatedHouseholds: number;
  coverageStreets: string[];
  mainPoints: string[];
  description: string;
  status: 'Activo' | 'En Ruta' | 'Programado';
  color: string;
  coordinates?: [number, number][];
  startLatLng?: [number, number];
  endLatLng?: [number, number];
  geojsonFile?: string | null;
}

export interface WasteItem {
  id: string;
  name: string;
  category: WasteCategory;
  categoryName: string;
  binColor: string;
  badgeBg: string;
  badgeText: string;
  disposalTip: string;
  collectionDays: string;
  canBeComposted?: boolean;
}

export interface CitizenReport {
  id: string;
  ticketNumber: string;
  title: string;
  category: 'Basura en Esquina' | 'Desmonte Clandestino' | 'Camión No Pasó' | 'Contenedor Lleno' | 'Punto Crítico / Botadero';
  neighborhood: string;
  address: string;
  phone: string;
  description: string;
  photoUrl?: string;
  createdAt: string;
  status: 'Recibido' | 'En Inspección' | 'Atendido';
}

export interface CampaignEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  target: string;
  reward: string;
  badge: string;
  badgeColor: string;
  imageAlt: string;
  ctaText: string;
  description: string;
}

export interface CompostRegistration {
  fullName: string;
  dni: string;
  phone: string;
  neighborhood: string;
  address: string;
  spaceType: 'Jardín / Huerta' | 'Patio interior' | 'Terraza / Azotea' | 'Balcón / Espacio reducido';
  committed: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export type NavigationSection = 'principal' | 'rutas' | 'recojo' | 'fiscalizacion' | 'campanas' | 'noticias' | 'app-movil' | 'dashboard' | 'faq';
