import { CampaignEvent, FaqItem } from '../types';

export const SUMAC_AYNI_CAMPAIGNS: CampaignEvent[] = [
  {
    id: 'reciclaton-2026',
    title: 'Gran Reciclatón Puneña 2026',
    subtitle: 'Canje de botellas PET y cartón por abono y plantones nativos',
    date: 'Sábado 14 de Marzo, 2026 • 08:00 - 14:00',
    location: 'Parque Manuel Pino (Frente al Templo San Juan)',
    target: 'Meta: 15 toneladas de plástico PET y papel recuperado',
    reward: 'Por cada 5 kg: 1 bolsa de compost + 1 plantón nativo',
    badge: 'Campaña Central',
    badgeColor: 'bg-amber-400 text-slate-900',
    imageAlt: 'Reciclatón Puneña en Parque Pino',
    ctaText: 'Inscribir mi Barrio / Institución',
    description: 'Canje ecológico de reciclables por compost municipal para parques y jardines.'
  },
  {
    id: 'titicaca-limpio',
    title: 'Limpieza de Ribera del Lago Titicaca',
    subtitle: 'Recuperación ambiental de la bahía interior y Malecón',
    date: 'Domingo 22 de Marzo, 2026 • 07:00 AM',
    location: 'Bahía de Puno - De Puerto Lacustre a Chanu Chanu',
    target: 'Meta: Erradicar 8 puntos críticos en la orilla lacustre',
    reward: 'Certificado oficial de voluntariado + kit de protección',
    badge: 'Ecoturismo & Lago',
    badgeColor: 'bg-sky-400 text-slate-900',
    imageAlt: 'Limpieza de ribera del Lago Titicaca',
    ctaText: 'Unirme como Voluntario',
    description: 'Jornada de voluntariado para retiro de residuos plásticos en la orilla del lago.'
  },
  {
    id: 'ecotrueque-escolar',
    title: 'Ecotrueque Escolar "Ayni Verde"',
    subtitle: 'Intercambio de tapitas y cuadernos por útiles escolares',
    date: 'Viernes 27 de Marzo, 2026 • 09:00 - 15:00',
    location: 'Plaza Mayor y Mercado Unión y Dignidad',
    target: 'Dirigido a: Estudiantes y familias de Puno',
    reward: 'Cuadernos ecológicos, lápices plantables y semillas',
    badge: 'Educación Ambiental',
    badgeColor: 'bg-emerald-400 text-slate-900',
    imageAlt: 'Ecotrueque escolar en Puno',
    ctaText: 'Participar con mi Colegio',
    description: 'Entrega tapitas plásticas y papel en desuso a cambio de útiles escolares ecológicos.'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Rutas y Horarios',
    question: '¿A qué hora pasa el camión recolector por mi zona?',
    answer: 'Puno cuenta con 29 rutas en turnos mañana (05:00 a 11:30) y tarde (13:30 a 18:00). La campana suena 5 minutos antes de ingresar a tu cuadra.'
  },
  {
    id: 'faq-2',
    category: 'Fiscalización y Multas',
    question: '¿Cuáles son las sanciones por arrojar basura en la vía pública?',
    answer: 'La Ordenanza N° 092-2023-MPP sanciona con multas del 10% al 50% de la UIT por arrojar residuos o desmonte en la calle.'
  },
  {
    id: 'faq-3',
    category: 'Segregación en la Fuente',
    question: '¿Cómo me inscribo al programa de segregación domiciliaria?',
    answer: 'Inscríbete en este portal o en Jirón Deustua 458 para recibir bolsas diferenciadas verde y celeste.'
  },
  {
    id: 'faq-4',
    category: 'Compostaje Municipal',
    question: '¿Qué requisitos necesito para recibir una compostera municipal gratuita?',
    answer: 'Residir en Puno, presentar DNI, contar con espacio ventilado de 1 m² y separar residuos orgánicos.'
  }
];
