export const initialVehicles = [
  {
    id: 'viza-fiat-cronos-2021',
    slug: 'fiat-cronos-drive-13-2021',
    brand: 'Fiat',
    model: 'Cronos',
    version: 'Drive 1.3',
    title: 'Fiat Cronos Drive 1.3',
    year: 2021,
    kilometers: 85000,
    price: null,
    priceLabel: 'Consultar',
    condition: 'Usado',
    category: 'Auto',
    bodyStyle: 'Sedán',
    engine: '1.3 naftero',
    power: '99 CV',
    transmission: 'Manual de 5 marchas',
    traction: 'Delantera',
    fuel: 'Nafta',
    color: 'Gris',
    shortDescription: 'Fiat Cronos Drive 1.3, año 2021. Consultá por disponibilidad y financiación.',
    highlights: ['Motor naftero 1.3', '99 CV', 'Transmisión manual de 5 marchas', 'Tracción delantera', 'Carrocería sedán'],
    featured: true,
    status: 'Disponible',
    imageFolder: '/images/vehiculos/fiat-cronos-drive-13-2021',
    imageCount: 7,
    imageExtension: 'jpg',
  },
  {
    id: 'viza-vw-amarok-2014',
    slug: 'volkswagen-amarok-highline-2014',
    brand: 'Volkswagen',
    model: 'Amarok',
    version: 'Highline',
    title: 'Volkswagen Amarok Highline',
    year: 2014,
    kilometers: null,
    price: null,
    priceLabel: 'Consultar',
    condition: 'Usado',
    category: 'Camioneta',
    bodyStyle: 'Pick-up',
    engine: '2.0',
    power: '180 HP',
    transmission: 'Automática',
    traction: '',
    fuel: 'Diésel',
    color: '',
    shortDescription: 'Volkswagen Amarok Highline 2.0 de 180 HP, automática. Consultá por más información.',
    highlights: ['Tapizado de cuero', 'Tapa rígida / cobertor', '4 cubiertas nuevas', 'Butacas calefaccionadas', 'Sensores de estacionamiento'],
    featured: true,
    status: 'Disponible',
    imageFolder: '/images/vehiculos/volkswagen-amarok-highline-2014',
    imageCount: 8,
    imageExtension: 'jpg',
  },
  {
    id: 'viza-ford-mondeo-2019',
    slug: 'ford-mondeo-sel-2019',
    brand: 'Ford',
    model: 'Mondeo',
    version: 'SEL',
    title: 'Ford Mondeo SEL',
    year: 2019,
    kilometers: 105000,
    price: null,
    priceLabel: 'Consultar',
    condition: 'Usado',
    category: 'Auto',
    bodyStyle: 'Sedán',
    engine: '2.0',
    power: '240 CV',
    transmission: 'Automática',
    traction: '',
    fuel: 'Nafta',
    color: '',
    shortDescription: 'Ford Mondeo SEL 2.0 automático, año 2019. Equipamiento destacado y excelente confort.',
    highlights: [
      '4 cubiertas recién colocadas',
      'Pantalla multimedia',
      'Sensores y cámara de estacionamiento',
      'Butacas eléctricas y calefaccionadas',
      'Tapizado de cuero',
      'Techo solar',
    ],
    featured: true,
    status: 'Disponible',
    imageFolder: '/images/vehiculos/ford-mondeo-sel-2019',
    imageCount: 8,
    imageExtension: 'jpg',
  },
];

export function getVehicleBySlug(slug) {
  return initialVehicles.find((vehicle) => vehicle.slug === slug);
}

export function getVehicleImage(vehicle, index = 1) {
  if (!vehicle) return '/images/placeholders/vehicle-placeholder.svg';
  const file = `${String(index).padStart(2, '0')}.${vehicle.imageExtension || 'jpg'}`;
  return `${vehicle.imageFolder}/${file}`;
}

export function formatKilometers(value) {
  if (value === null || value === undefined || value === '') return 'Consultar';
  return `${new Intl.NumberFormat('es-AR').format(value)} km`;
}
