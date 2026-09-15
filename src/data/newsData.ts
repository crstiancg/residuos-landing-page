import imgEcocanje from '../assets/images/noticia_ecocanje_plaza_1789103110884.jpg';
import imgRecojo from '../assets/images/noticia_recojo_rutas_1789103124006.jpg';
import imgBahia from '../assets/images/sumac_ayni_voluntarios_1788407770390.jpg';
import imgPunto from '../assets/images/parque_recuperado_despues_1789103008845.jpg';

export interface MunicipalNewsItem {
  id: string;
  category: 'Intervención' | 'Campaña' | 'Logro' | 'Anuncio Oficial';
  title: string;
  summary: string;
  fullContent: string[];
  date: string;
  author: string;
  readTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export const NEWS_DATA: MunicipalNewsItem[] = [
  {
    id: 'noticia-1',
    category: 'Intervención',
    title: 'Recuperación integral del punto crítico en Jr. Carabaya y Laykakota',
    summary: 'La GGIRS erradicó 15 toneladas de escombros y basura acumulada, instalando grass natural, bancas y luminarias comunales.',
    fullContent: [
      'En el marco del Plan Provincial de Recuperación de Espacios Públicos, la Municipalidad Provincial de Puno, a través de la Gerencia de Gestión Integral de Residuos Sólidos (GGIRS), concluyó con éxito la intervención integral del punto crítico ubicado en la intersección de Jr. Carabaya con el barrio Laykakota.',
      'Durante las jornadas de trabajo se retiraron más de 15 toneladas métricas de residuos sólidos y desmonte arrojados de manera clandestina. El equipo de áreas verdes procedió a la nivelación del terreno, colocación de 240 m² de grass natural y arborización con queñuas y kantutas, especies nativas de la región.',
      'Asimismo, la subgerencia de fiscalización ambiental instaló cámaras de vigilancia preventiva y carteles con las sanciones estipuladas en la Ordenanza Municipal N° 014-2023, que sanciona el arrojo indebido de residuos con multas de hasta el 50% de una UIT.',
      'Los vecinos de la zona se comprometieron formalmente a constituir un comité de vigilancia barrial para asegurar la preservación del nuevo parque vecinal.'
    ],
    date: '10 de Septiembre, 2026',
    author: 'Gerencia de Gestión Integral de Residuos Sólidos (GGIRS)',
    readTime: '3 min de lectura',
    image: imgPunto,
    tags: ['Áreas Verdes', 'Erradicación', 'Fiscalización'],
    featured: true
  },
  {
    id: 'noticia-2',
    category: 'Campaña',
    title: 'Gran jornada de Ecocanje en Plaza Mayor: Más de 1,200 plantones entregados',
    summary: 'Cientos de familias puneñas canjearon botellas PET, latas y papel por plantones nativos y abono orgánico del programa de compostaje.',
    fullContent: [
      'Con masiva asistencia ciudadana se desarrolló la tercera edición del año de la campaña "Ecocanje Puno Limpio" en la Plaza Mayor de la ciudad.',
      'La iniciativa permitió acopiar más de 3.8 toneladas de materiales reciclables debidamente segregados, incluyendo botellas de plástico, cartón, papel bond y envases de hojalata. A cambio, los vecinos recibieron plantones ornamentales, compost orgánico enriquecido y kits de bolsas reutilizables.',
      'El material recolectado fue transferido a las asociaciones de recicladores formalizados de la ciudad de Puno, impulsando la economía circular y la inclusión laboral digna de nuestros recicladores urbanos.'
    ],
    date: '05 de Septiembre, 2026',
    author: 'Subgerencia de Valorización de Residuos Sólidos',
    readTime: '2 min de lectura',
    image: imgEcocanje,
    tags: ['Ecocanje', 'Reciclaje', 'Plaza Mayor']
  },
  {
    id: 'noticia-3',
    category: 'Campaña',
    title: 'Próxima jornada de voluntariado Sumac Ayni en la ribera de la Bahía del Titicaca',
    summary: 'Convocatoria abierta para estudiantes universitarios, juntas vecinales y colectivos ambientales este sábado desde las 7:00 a.m.',
    fullContent: [
      'La Municipalidad Provincial de Puno convoca a toda la ciudadanía a participar en la "Gran Jornada Sumac Ayni 2026" destinada a la limpieza y conservación de la ribera lacustre en el sector Bahía El Espinar y Chanu Chanu.',
      'La comuna provincial proveerá guantes de protección, costales reforzados, mascarillas, hidratación y certificados de participación comunitaria a todos los voluntarios inscritos.',
      'El punto de concentración será en el muelle Banchero Rossi a las 7:00 a.m. Las inscripciones continúan abiertas a través del portal Muni Puno Digital y el módulo de voluntariado ambiental.'
    ],
    date: '02 de Septiembre, 2026',
    author: 'Oficina de Educación Ambiental y Participación Ciudadana',
    readTime: '3 min de lectura',
    image: imgBahia,
    tags: ['Lago Titicaca', 'Voluntariado', 'Sumac Ayni']
  },
  {
    id: 'noticia-4',
    category: 'Anuncio Oficial',
    title: 'Refuerzo de rutas nocturnas de recolección en los 4 conos de Puno',
    summary: 'Se incorporan 2 camiones compactadores reacondicionados para optimizar la cobertura en los sectores Centro, Norte, Sur y Chejoña.',
    fullContent: [
      'Con el objetivo de garantizar el cumplimiento estricto de los horarios de recolección domiciliaria, la flota municipal de 14 camiones compactadores contará con un refuerzo operativo en los turnos nocturnos.',
      'La optimización permitirá reducir los tiempos de paso en los circuitos 04, 07 y 18, garantizando que el camión recolector no exceda los 15 minutos respecto al itinerario oficial fijado en el mapa satelital del portal.',
      'Se recuerda a los ciudadanos sacar las bolsas cerradas únicamente al toque de la campana tradicional de recolección para evitar la dispersión de desechos por canes callejeros.'
    ],
    date: '28 de Agosto, 2026',
    author: 'Subgerencia de Limpieza Pública y Flota',
    readTime: '2 min de lectura',
    image: imgRecojo,
    tags: ['Rutas', 'Flota Compactadores', 'Horarios']
  }
];
