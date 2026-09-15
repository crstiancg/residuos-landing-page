import { PUNO_ROUTES } from './punoRoutesData';
import { WASTE_CATEGORIES_INFO, WASTE_SEARCH_ITEMS } from './wasteClassificationData';
import { FAQ_ITEMS, SUMAC_AYNI_CAMPAIGNS } from './campaignsData';

export interface BotAction {
  label: string;
  targetSection: string;
}

export interface BotResponse {
  text: string;
  actions?: BotAction[];
  suggestedQuestions?: string[];
}

export interface PresetTopic {
  id: string;
  title: string;
  icon: string;
  prompt: string;
}

export const BOT_PRESET_TOPICS: PresetTopic[] = [
  {
    id: 'rutas',
    title: 'Horario de camiones',
    icon: '🚛',
    prompt: '¿A qué hora pasa el camión de basura por mi zona?'
  },
  {
    id: 'segregacion',
    title: '¿Cómo separar basura?',
    icon: '♻️',
    prompt: '¿Cómo debo separar mis residuos y qué va en cada bolsa?'
  },
  {
    id: 'compostaje',
    title: 'Compostera gratis',
    icon: '🌿',
    prompt: '¿Cómo solicito una compostera municipal gratuita para mi casa?'
  },
  {
    id: 'reportes',
    title: 'Reportar mal vecino',
    icon: '📋',
    prompt: '¿Cómo denuncio a un vecino que arroja basura y cuáles son las multas?'
  },
  {
    id: 'sumac-ayni',
    title: 'Lago Titicaca & Voluntariado',
    icon: '🌊',
    prompt: '¿Qué es Sumac Ayni y cuándo es la próxima limpieza del Lago Titicaca?'
  },
  {
    id: 'app-movil',
    title: 'Descargar la App',
    icon: '📱',
    prompt: '¿Dónde descargo la app Muni Puno Digital para rastrear los camiones?'
  }
];

// Helper: Normalize query string
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Knowledge Engine for ReciclaBot
 * Strict rule: Responses must be clear, helpful, municipal, and MAXIMUM 3 SENTENCES.
 */
export function getReciclaBotAnswer(userQuery: string): BotResponse {
  const q = normalize(userQuery);

  // 1. GREETING / PRESENTATION
  if (
    q === 'hola' ||
    q === 'buenos dias' ||
    q === 'buenas tardes' ||
    q === 'buenas noches' ||
    q.includes('quien eres') ||
    q.includes('como te llamas') ||
    q.includes('que puedes hacer')
  ) {
    return {
      text: '¡Hola, estimado(a) vecino(a)! 🤖 Soy ChatBot, el asistente oficial de Gestión de Residuos Sólidos de la Municipalidad Provincial de Puno. Puedo informarte sobre las 29 rutas de recolección, horarios de tu barrio, segregación en casa, compostaje y cómo denunciar botaderos. ♻️ ¿De qué barrio nos visitas o qué duda tienes hoy? 🌿',
      actions: [
        { label: 'Ver las 29 Rutas', targetSection: 'rutas' },
        { label: 'Segregación en Fuente', targetSection: 'segregacion' }
      ],
      suggestedQuestions: [
        '¿A qué hora pasa el camión?',
        '¿Cómo solicito una compostera gratis?',
        '¿Cuáles son las multas por tirar basura?'
      ]
    };
  }

  // 2. CHECK SPECIFIC NEIGHBORHOODS OR STREETS FOR THE 29 ROUTES
  const matchedRoute = PUNO_ROUTES.find((route) => {
    const routeName = normalize(route.name);
    const sectorName = normalize(route.sector);
    const hasStreet = route.coverageStreets.some((st) => q.includes(normalize(st)));
    const hasPoint = route.mainPoints.some((pt) => q.includes(normalize(pt)));
    
    // Key neighborhood terms
    const keywords = [
      'centro', 'plaza mayor', 'lima', 'deustua', 'laykakota', 'arco deustua', 'puerto', 'titicaca',
      'san antonio', 'huajsapata', 'porteno', 'malecon', 'bellavista', 'victoria', 'santa rosa',
      'floral', 'universidad', 'una puno', 'yanamayo', 'san salvador', 'alto puno', 'kuntur wasi',
      'machallata', 'huayna pucara', 'manto', 'san jose', 'vallecito', 'santa catalina', 'chulluni',
      'uros', 'chanu chanu', 'costanera', 'salcedo', 'jayllihuaya', 'san luis', 'huascar', 'rinconada',
      'los pinos', 'villa del lago', 'terminal', 'chejona', 'azoguine', 'cerrito colorado', 'santa barbara',
      'pirhua', 'esteves', 'cancharani', 'san jeronimo', 'llavini'
    ];

    const matchedKeyword = keywords.find((kw) => q.includes(kw) && (routeName.includes(kw) || sectorName.includes(kw) || hasStreet || hasPoint));
    return matchedKeyword || hasStreet || hasPoint;
  });

  if (matchedRoute) {
    return {
      text: `🚛 Para tu zona corresponde la ${matchedRoute.name}, asignada al ${matchedRoute.sector}. Atiende en turno ${matchedRoute.shift.toLowerCase()} (${matchedRoute.schedule}) con frecuencia ${matchedRoute.frequency.toLowerCase()} mediante el ${matchedRoute.truckUnit}. Recuerda sacar tus residuos cuando suene la campana municipal o verificar su llegada en tiempo real con la app móvil. 📱`,
      actions: [
        { label: `Ver detalles de ${matchedRoute.name.split(':')[0]}`, targetSection: 'rutas' },
        { label: 'Rastrear en la App', targetSection: 'descargar-app' }
      ],
      suggestedQuestions: [
        '¿Cómo separar la basura?',
        '¿Dónde descargo la app móvil?',
        '¿Qué hago si el camión no pasa?'
      ]
    };
  }

  // 3. GENERAL TRUCK SCHEDULES / FREQUENCY / BELL
  if (
    q.includes('horario') ||
    q.includes('hora pasa') ||
    q.includes('cuando pasa') ||
    q.includes('frecuencia') ||
    q.includes('campana') ||
    q.includes('recolector') ||
    q.includes('camion')
  ) {
    return {
      text: '🚛 La recolección en Puno cubre 29 rutas en turnos de mañana (05:00 a 11:30 AM), tarde (01:30 a 06:00 PM) y noche para mercados (06:00 a 10:30 PM). Los operarios hacen sonar la campana tradicional 5 minutos antes de ingresar a cada cuadra. 📱 Puedes consultar tu ruta exacta escribiendo el nombre de tu barrio o descargando la app para recibir alertas GPS.',
      actions: [
        { label: 'Consultar las 29 Rutas', targetSection: 'rutas' },
        { label: 'Descargar App con Alertas GPS', targetSection: 'descargar-app' }
      ],
      suggestedQuestions: [
        'Ruta para Bellavista',
        'Ruta para Salcedo',
        'Ruta para Chanu Chanu'
      ]
    };
  }

  // 4. SPECIFIC WASTE ITEM QUERY (What goes where?)
  const matchedItem = WASTE_SEARCH_ITEMS.find((item) => {
    const itemName = normalize(item.name);
    return q.includes(itemName) || itemName.split(' ').some((word) => word.length > 3 && q.includes(word));
  });

  if (matchedItem) {
    const isOrganic = matchedItem.category === 'organico';
    const isRecyclable = matchedItem.category === 'inorganico';
    const emoji = isOrganic ? '🌿' : isRecyclable ? '♻️' : '🗑️';

    return {
      text: `${emoji} "${matchedItem.name}" se clasifica como ${matchedItem.categoryName} y debe depositarse en ${matchedItem.badgeText}. ${matchedItem.disposalTip} ${isRecyclable ? 'Entrégalo limpio a los recicladores de Sumac Ayni.' : isOrganic ? 'Sirve para generar abono en Salcedo.' : 'Irá seguro al relleno de Itapalluni.'}`,
      actions: [
        { label: 'Ver Guía de Segregación', targetSection: 'segregacion' },
        { label: 'Programa de Compostaje', targetSection: 'compostaje' }
      ],
      suggestedQuestions: [
        '¿Dónde van las botellas de plástico?',
        '¿Qué hago con las pilas y baterías?',
        '¿Cómo solicito una compostera?'
      ]
    };
  }

  // 5. GENERAL SEGREGATION / COLORS OF BAGS AND BINS
  if (
    q.includes('segreg') ||
    q.includes('separar') ||
    q.includes('clasific') ||
    q.includes('tacho') ||
    q.includes('bolsa') ||
    q.includes('recicl') ||
    q.includes('plastico') ||
    q.includes('papel') ||
    q.includes('vidrio') ||
    q.includes('carton')
  ) {
    return {
      text: '♻️ En Puno clasificamos en 3 grupos: bolsa verde para residuos orgánicos (cáscaras y restos vegetales), celeste para inorgánicos reciclables secos (plástico PET, latas, cartón) y negra para no aprovechables. Los recicladores formales de Sumac Ayni recogen los reciclables en tu puerta los martes, jueves y sábados. ¡Separar en casa evita que el plástico llegue a la bahía del Lago Titicaca! 🌊',
      actions: [
        { label: 'Explorar Guía de Segregación', targetSection: 'segregacion' },
        { label: 'Conocer Sumac Ayni', targetSection: 'sumac-ayni' }
      ],
      suggestedQuestions: [
        '¿Qué residuos van a la bolsa verde?',
        '¿Cómo contactar a los recicladores?',
        '¿Dónde se botan las pilas usadas?'
      ]
    };
  }

  // 6. COMPOSTING / FREE COMPOSTER PROGRAM
  if (
    q.includes('compost') ||
    q.includes('abono') ||
    q.includes('organico') ||
    q.includes('lombriz') ||
    q.includes('tierra') ||
    q.includes('huerto')
  ) {
    return {
      text: '🌿 La Municipalidad entrega composteras domiciliarias y kits de microorganismos 100% gratuitos a vecinos que cuenten con al menos 1 m² de espacio en su vivienda. Puedes inscribirte llenando el formulario en esta plataforma con tu DNI y dirección de Puno. 🏡 Los técnicos de la GGIRS te brindarán capacitación mensual para que produzcas abono fértil para tus plantas.',
      actions: [
        { label: 'Inscribirme a Compostaje Gratis', targetSection: 'compostaje' },
        { label: 'Calcular Ahorro de Abono', targetSection: 'compostaje' }
      ],
      suggestedQuestions: [
        '¿Qué restos puedo echar a la compostera?',
        '¿Cuánto tarda en hacerse el compost?',
        '¿Cómo separar la basura orgánica?'
      ]
    };
  }

  // 7. COMPLAINTS / MAL VECINO / FINES / ILLEGAL DUMPING / BOTS CRITICOS
  if (
    q.includes('report') ||
    q.includes('denuncia') ||
    q.includes('vecino') ||
    q.includes('multa') ||
    q.includes('sancion') ||
    q.includes('botadero') ||
    q.includes('infraccion') ||
    q.includes('sucio') ||
    q.includes('esquina') ||
    q.includes('fiscaliz')
  ) {
    return {
      text: '📋 Según la Ordenanza Municipal N° 092-2023-MPP, arrojar basura en la vía pública o fuera de horario acarrea multas del 10% al 50% de la UIT. Puedes registrar una denuncia con fotografía y GPS en el módulo "Reporta a tu Vecino" de esta plataforma. ⚠️ La fiscalización ambiental interviene en un plazo máximo de 24 a 48 horas con número de ticket.',
      actions: [
        { label: 'Reportar Punto Crítico o Vecino', targetSection: 'reporta' },
        { label: 'Descargar App Móvil', targetSection: 'app-movil' }
      ],
      suggestedQuestions: [
        '¿Cuánto es la multa en soles?',
        '¿Puedo hacer un reporte anónimo?',
        '¿Qué horario tiene el camión en mi barrio?'
      ]
    };
  }

  // 8. SUMAC AYNI / LAKE TITICACA / VOLUNTEERING / CAMPAIGNS
  if (
    q.includes('sumac') ||
    q.includes('ayni') ||
    q.includes('lago') ||
    q.includes('titicaca') ||
    q.includes('voluntar') ||
    q.includes('campana') ||
    q.includes('limpieza') ||
    q.includes('reciclaton') ||
    q.includes('ecotrueque')
  ) {
    return {
      text: '🌊 Sumac Ayni es el programa de economía circular y voluntariado ambiental de Puno, enfocado en dignificar a los recicladores y limpiar las riberas del Lago Titicaca. Realizamos reciclatones en el Parque Pino y ecotrueques donde canjeas botellas por plantones y compost municipal. 🌿 Puedes inscribirte como voluntario ambiental desde esta web y recibir certificación oficial.',
      actions: [
        { label: 'Ver Campañas Sumac Ayni', targetSection: 'sumac-ayni' },
        { label: 'Unirme como Voluntario', targetSection: 'sumac-ayni' }
      ],
      suggestedQuestions: [
        '¿Cuándo es la próxima Reciclatón?',
        '¿Dónde entrego botellas para ecotrueque?',
        '¿Cómo solicito una compostera?'
      ]
    };
  }

  // 9. APP DOWNLOAD / GPS TRACKING
  if (
    q.includes('app') ||
    q.includes('descarg') ||
    q.includes('celular') ||
    q.includes('movil') ||
    q.includes('apk') ||
    q.includes('gps') ||
    q.includes('notific') ||
    q.includes('play store')
  ) {
    return {
      text: '📱 La app Muni Puno Digital te muestra en tiempo real dónde está el camión compactador de tu ruta y te avisa cuando se encuentre a 300 metros de tu casa. Puedes descargar el archivo de instalación APK directamente desde la sección "Descargar App" de esta web. 🚛 ¡Es gratuita, liviana y no consume tus datos móviles!',
      actions: [
        { label: 'Ir a Descargar la App', targetSection: 'descargar-app' },
        { label: 'Ver las 29 Rutas', targetSection: 'rutas' }
      ],
      suggestedQuestions: [
        '¿Cómo funciona la alerta sonora?',
        '¿A qué hora pasa el camión por mi casa?',
        '¿Cómo reportar a un vecino sucio?'
      ]
    };
  }

  // 10. PHONE NUMBER / CONTACT / OFFICE
  if (
    q.includes('telefono') ||
    q.includes('numero') ||
    q.includes('contacto') ||
    q.includes('llamar') ||
    q.includes('oficina') ||
    q.includes('direccion') ||
    q.includes('donde queda')
  ) {
    return {
      text: '📞 La Gerencia de Gestión Integral de Residuos Sólidos (GGIRS) de Puno atiende consultas en la central telefónica (051) 368-450. Su oficina de atención presencial queda en el Jr. Deustua N° 458, Palacio Municipal, de lunes a viernes de 08:00 AM a 04:00 PM. 🏛️ ¡También estamos a tu servicio aquí en la plataforma digital!',
      actions: [
        { label: 'Descargar App Móvil', targetSection: 'app-movil' },
        { label: 'Reportar Incidencia', targetSection: 'reporta' }
      ],
      suggestedQuestions: [
        '¿A qué hora pasa el camión de basura?',
        '¿Cómo denunciar un botadero ilegal?',
        '¿Cómo inscribirme a compostaje?'
      ]
    };
  }

  // 11. PILAS / BATERIAS / MEDICINAS (Special waste)
  if (
    q.includes('pila') ||
    q.includes('bateria') ||
    q.includes('medicina') ||
    q.includes('medicamento') ||
    q.includes('peligroso') ||
    q.includes('raee') ||
    q.includes('foco') ||
    q.includes('aceite')
  ) {
    return {
      text: '⚠️ Las pilas, baterías, medicamentos vencidos y focos son residuos peligrosos y jamás deben arrojarse al camión compactador ni al desagüe. Debes llevarlos a las ánforas municipales ubicadas en el Palacio Municipal (Jr. Deustua N° 458) o mercados autorizados. ♻️ El aceite usado de cocina debe entregarse en botellas plásticas selladas en las carpas de ecotrueque.',
      actions: [
        { label: 'Ver Clasificación de Residuos', targetSection: 'segregacion' },
        { label: 'Campañas de Ecotrueque', targetSection: 'sumac-ayni' }
      ],
      suggestedQuestions: [
        '¿Qué hago con las botellas de plástico?',
        '¿Cómo denuncio a un mal vecino?',
        '¿A qué hora pasa el recolector?'
      ]
    };
  }

  // 12. FALLBACK / GENERAL MUNICIPAL ASSISTANCE (Strictly <= 3 sentences)
  return {
    text: '🤖 Con gusto te oriento: en Puno contamos con 29 rutas oficiales de recolección, programa gratuito de compostaje domiciliario y fiscalización con multas para botaderos clandestinos. Puedes escribir el nombre de tu barrio (ejemplo: Bellavista, Salcedo, Laykakota) o elegir una de las opciones rápidas. ♻️ Para consultas directas, la central municipal atiende en el (051) 368-450.',
    actions: [
      { label: 'Consultar Rutas de Recolección', targetSection: 'rutas' },
      { label: 'Descargar App Móvil', targetSection: 'app-movil' }
    ],
    suggestedQuestions: [
      '¿A qué hora pasa el camión?',
      '¿Cómo solicito una compostera gratis?',
      '¿Cuáles son las multas por tirar basura?'
    ]
  };
}
