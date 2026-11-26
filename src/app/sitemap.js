import { initialVehicles } from '@/data/vehicles';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export default function sitemap() {
  const routes = ['', '/vehiculos', '/servicios', '/cotizar', '/nosotros', '/contacto'];
  const pages = routes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: new Date(), changeFrequency: route === '' ? 'weekly' : 'monthly', priority: route === '' ? 1 : 0.7 }));
  const vehicles = initialVehicles.map((vehicle) => ({ url: `${siteUrl}/vehiculos/${vehicle.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 }));
  return [...pages, ...vehicles];
}
