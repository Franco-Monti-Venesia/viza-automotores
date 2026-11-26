export const siteConfig = {
  name: 'Viza Automotores',
  shortName: 'VIZA',
  tagline: 'Encontrá el vehículo que estás buscando.',
  description:
    'Compra y venta de vehículos en Cruz Alta, Córdoba. Consultá por autos, camionetas y más en Viza Automotores.',
  location: 'Cruz Alta, Córdoba, Argentina',
  address: 'Juan Domingo Perón y Ruta 6, Cruz Alta, Córdoba',
  whatsapp: '543467439967',
  phoneDisplay: '3467 439967',
  instagram: 'https://www.instagram.com/viza_automotores/',
  financingMessage:
    'FINANCIAMOS HASTA EL 60% DEL VALOR DEL VEHICULO SOLO CON DNI, CUOTAS FIJAS Y EN PESOS. RECIBIMOS TU USADO. VIZA AUTOMOTORES, CRUZ ALTA, CORDOBA.',
  logoPath: '/images/brand/logo%20viza%20automotores.png',
  heroImagePath: '/images/brand/viza%20automotores%20fachada.jpg',
};

export function whatsappUrl(message = 'Hola, quisiera recibir más información.') {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
