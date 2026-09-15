import { WasteItem } from '../types';

export const WASTE_CATEGORIES_INFO = [
  {
    id: 'organicos',
    badge: '🟢',
    title: 'RESIDUOS ORGÁNICOS',
    subtitle: 'Materia biodegradable para compostaje',
    colorName: 'Verde Institucional',
    colorHex: '#15803D',
    bgLight: '#F0FDF4',
    borderClass: 'border-emerald-200 hover:border-emerald-400',
    iconBg: 'bg-emerald-100 text-emerald-800',
    description: 'Residuos biodegradables para compostaje.',
    acceptedTitle: 'Qué colocar:',
    acceptedItems: [
      'Cáscaras de frutas y verduras',
      'Restos de café y té',
      'Hojas secas y restos de poda',
      'Cáscaras de huevo'
    ],
    prohibitedTitle: 'No colocar:',
    prohibitedItems: [
      'Huesos grandes o carnes',
      'Aceite de cocina'
    ],
    scheduleLabel: '📅 Días de recojo:',
    collectionDays: 'Lunes, Miércoles y Viernes',
    destinationIcon: '🌱',
    destinationLabel: 'Destino:',
    destination: 'Planta Municipal de Compostaje de Salcedo',
    tag: 'Bolsa Verde'
  },
  {
    id: 'inorganicos',
    badge: '🔵',
    title: 'INORGÁNICOS RECICLABLES',
    subtitle: 'Materiales secos aprovechables',
    colorName: 'Celeste / Azul Institucional',
    colorHex: '#1474B4',
    bgLight: '#F0F9FF',
    borderClass: 'border-sky-200 hover:border-sky-400',
    iconBg: 'bg-sky-100 text-sky-800',
    description: 'Materiales limpios y secos para reciclaje.',
    acceptedTitle: 'Qué colocar:',
    acceptedItems: [
      'Botellas de plástico PET',
      'Latas de conserva y bebidas',
      'Cartón y papel seco',
      'Envases de vidrio'
    ],
    prohibitedTitle: 'No colocar:',
    prohibitedItems: [
      'Papel higiénico o pañales',
      'Vidrio roto sin envolver'
    ],
    scheduleLabel: '📅 Días de recojo:',
    collectionDays: 'Martes, Jueves y Sábados',
    destinationIcon: '♻️',
    destinationLabel: 'Destino:',
    destination: 'Recicladores formalizados y Sumac Ayni',
    tag: 'Bolsa Celeste'
  },
  {
    id: 'no_aprovechables',
    badge: '⚫',
    title: 'NO APROVECHABLES',
    subtitle: 'Residuos comunes no reciclables',
    colorName: 'Gris Oscuro / Negro',
    colorHex: '#334155',
    bgLight: '#F8FAFC',
    borderClass: 'border-slate-300 hover:border-slate-500',
    iconBg: 'bg-slate-200 text-slate-800',
    description: 'Residuos comunes no reciclables para disposición final.',
    acceptedTitle: 'Qué colocar:',
    acceptedItems: [
      'Papel higiénico',
      'Toallas higiénicas y pañales',
      'Envolturas metalizadas',
      'Tecnopor',
      'Colillas y cenizas'
    ],
    prohibitedTitle: 'No colocar:',
    prohibitedItems: [
      'Pilas o baterías',
      'Medicamentos vencidos'
    ],
    scheduleLabel: '🚛 Recojo:',
    collectionDays: 'Camión compactador según ruta',
    destinationIcon: '🏭',
    destinationLabel: 'Destino:',
    destination: 'Relleno Sanitario de Itapalluni',
    tag: 'Bolsa Negra'
  }
];

export const WASTE_SEARCH_ITEMS: WasteItem[] = [
  // Orgánicos
  {
    id: 'w-1',
    name: 'Cáscara de plátano / manzana / frutas',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Ideal para compostaje. Picar en trozos pequeños para acelerar la descomposición natural.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },
  {
    id: 'w-2',
    name: 'Restos de café molido y té',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Aporta nitrógeno excelente para la tierra del jardín y las composteras domiciliarias.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },
  {
    id: 'w-3',
    name: 'Cáscaras de huevo',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Triturar con las manos antes de colocarlo en el compost para enriquecerlo con calcio.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },
  {
    id: 'w-4',
    name: 'Hojas secas y flores marchitas',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Materia marrón (carbono). Sirve como capa de cobertura para evitar olores en tu compostera.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },
  {
    id: 'w-5',
    name: 'Restos de verduras (lechuga, papa, zanahoria)',
    category: 'organico',
    categoryName: 'Residuo Orgánico',
    binColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    badgeText: 'Bolsa Verde / Compost',
    disposalTip: 'Desecho verde de alto valor para la producción de humus municipal.',
    collectionDays: 'Lunes, Miércoles y Viernes',
    canBeComposted: true
  },

  // Inorgánicos Reciclables
  {
    id: 'w-6',
    name: 'Botella de plástico PET (gaseosa, agua mineral)',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#1474B4',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Vaciar el líquido, enjuagar levemente, aplastar para reducir volumen y colocar la tapa.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-7',
    name: 'Lata de leche / atún / conservas',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#1474B4',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Enjuagar para retirar restos de comida y evitar malos olores antes de entregar al reciclador.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-8',
    name: 'Caja de cartón / Cartulina seca',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#1474B4',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Desarmar y aplanar para optimizar el espacio. Mantener seco (el cartón mojado pierde valor).',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-9',
    name: 'Frasco o botella de vidrio (sin romper)',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#1474B4',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Enjuagar y separar tapas metálicas. El vidrio es 100% e infinitamente reciclable.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-10',
    name: 'Envase Tetra Pak (leche, jugo)',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#1474B4',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Desplegar las esquinas, escurrir el líquido, aplanar y colocar en la bolsa de reciclaje.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },
  {
    id: 'w-11',
    name: 'Papel bond / Cuadernos viejos / Periódico',
    category: 'inorganico',
    categoryName: 'Inorgánico Reciclable',
    binColor: '#1474B4',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    badgeText: 'Bolsa Celeste / Reciclable',
    disposalTip: 'Apilar sin arrugar en exceso. Retirar grapas metálicas o espirales plásticos si es posible.',
    collectionDays: 'Martes, Jueves y Sábado (Recicladores Sumac Ayni)',
    canBeComposted: false
  },

  // No Aprovechables
  {
    id: 'w-12',
    name: 'Papel higiénico usado / Pañales / Toallitas',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable (Sanitario)',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'Empacar en doble bolsa cerrada para resguardar la salud de los operarios de limpieza pública.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-13',
    name: 'Envoltura de snacks / Galletas / Caramelos',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable (Metalizado)',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'Plásticos aluminizados complejos que no pueden ser procesados mecánicamente en la región.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-14',
    name: 'Tecnopor / Poliestireno expandido',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'Depositar en bolsa negra. Recuerda preferir envases biodegradables o reutilizables.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-15',
    name: 'Colillas de cigarro / Ceniza',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'Asegúrate de que estén completamente apagadas antes de tirarlas para evitar incendios en el camión.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  },
  {
    id: 'w-16',
    name: 'Pilas y Baterías usadas',
    category: 'no_aprovechable',
    categoryName: 'Residuo Peligroso / Especial (RAEE)',
    binColor: '#DC2626',
    badgeBg: 'bg-red-100 text-red-800 border-red-300',
    badgeText: 'Ánforas Municipales Especiales',
    disposalTip: 'NO TIRAR AL CAMIÓN. Llevar a los contenedores especiales en el Palacio Municipal (Jr. Deustua) o mercado Central.',
    collectionDays: 'Puntos de acopio permanente',
    canBeComposted: false
  },
  {
    id: 'w-17',
    name: 'Caja de pizza manchada de grasa',
    category: 'no_aprovechable',
    categoryName: 'No Aprovechable',
    binColor: '#475569',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-400',
    badgeText: 'Bolsa Negra / Relleno Sanitario',
    disposalTip: 'La grasa impide el reciclaje del papel. Puedes recortar la tapa limpia si no tiene grasa para reciclarla.',
    collectionDays: 'Horario habitual de camión compactador',
    canBeComposted: false
  }
];
