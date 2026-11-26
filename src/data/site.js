export const siteConfig = {
  name: 'Viza Automotores',
  shortName: 'VIZA',
  tagline: 'Encontrá el vehículo que estás buscando.',
  description:
    'Compra y venta de vehículos en Cruz Alta, Córdoba. Consultá por autos, camionetas y más en Viza Automotores.',
  location: 'Cruz Alta, Córdoba, Argentina',
  address: 'Juan Domingo Perón y Ruta 6, Cruz Alta, Córdoba',
  hours: 'Todos los días · 10:00 a 19:00 hs',
  whatsapp: '543467439967',
  phoneDisplay: '3467 439967',
  instagram: 'https://www.instagram.com/viza_automotores/',
  googleMapsPlaceId: 'ChIJM51uEQC7yZURj_ZL6gpRH6o',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=VIZA%20AUTOMOTORES&query_place_id=ChIJM51uEQC7yZURj_ZL6gpRH6o',
  googleReviewsUrl: 'https://search.google.com/local/writereview?placeid=ChIJM51uEQC7yZURj_ZL6gpRH6o',
  googleReadReviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJM51uEQC7yZURj_ZL6gpRH6o',
  mapEmbedUrl: 'https://www.google.com/maps?q=Juan%20Domingo%20Per%C3%B3n%20y%20Ruta%206%2C%20Cruz%20Alta%2C%20C%C3%B3rdoba&output=embed',
  financingMessage:
    'FINANCIAMOS HASTA EL 60% DEL VALOR DEL VEHICULO SOLO CON DNI, CUOTAS FIJAS Y EN PESOS. RECIBIMOS TU USADO. VIZA AUTOMOTORES, CRUZ ALTA, CORDOBA.',
  logoPath: '/images/brand/logo%20viza%20automotores3.png',
  heroImagePath: '/images/brand/viza%20automotores%20fachada.jpg',
};

export function whatsappUrl(message = 'Hola, quisiera recibir más información.') {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
