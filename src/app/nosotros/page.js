import Link from 'next/link';
import SectionHeading from '@/components/section-heading';
import GoogleMap from '@/components/google-map';
import { siteConfig } from '@/data/site';

export const metadata = {
  title: 'Nosotros',
  description: 'Conocé Viza Automotores, agencia de compra y venta de vehículos en Cruz Alta, Córdoba.',
};

export default function AboutPage() {
  return (
    <div className="page-wrap"><div className="container">
      <div className="about-page-hero"><div className="about-page-photo" /><div className="about-page-content"><SectionHeading eyebrow="VIZA AUTOMOTORES" title="Cercanos para acompañarte en tu próxima elección." description="Somos una agencia de compra y venta de vehículos ubicada en Cruz Alta, Córdoba. Queremos que puedas conocer nuestro stock, consultar cada detalle y encontrar una opción que se adapte a lo que estás buscando." /><Link className="button button-primary" href="/vehiculos">Conocé nuestro stock <span>↗</span></Link></div></div>
      <div className="about-values"><div><span>01</span><h3>Variedad de vehículos</h3><p>Distintas opciones para que puedas comparar y elegir.</p></div><div><span>02</span><h3>Información clara</h3><p>Consultá las características y condiciones de cada publicación.</p></div><div><span>03</span><h3>Contacto directo</h3><p>Un canal simple para resolver tus dudas con la agencia.</p></div></div>
      <div className="about-location"><div><span className="eyebrow"><i /> DÓNDE ENCONTRARNOS</span><h2>Estamos en Cruz Alta.</h2><p>{siteConfig.address}</p><p>{siteConfig.location}</p><a className="text-link" href={siteConfig.googleMapsUrl} target="_blank" rel="noreferrer">Abrir ubicación en Google Maps ↗</a><div className="location-hours"><strong>Horarios de atención</strong><span>{siteConfig.hours}</span><small>Horario de referencia, pendiente de confirmar.</small></div></div><GoogleMap title="Mapa de ubicación de Viza Automotores" /></div>
    </div></div>
  );
}
