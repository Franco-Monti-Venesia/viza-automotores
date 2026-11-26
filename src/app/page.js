import Link from 'next/link';
import Hero from '@/components/hero';
import SectionHeading from '@/components/section-heading';
import VehicleGrid from '@/components/vehicle-grid';
import HowToBuy from '@/components/how-to-buy';
import BrandsMarquee from '@/components/brands-marquee';
import ReviewsSection from '@/components/reviews-section';
import GoogleMap from '@/components/google-map';
import { siteConfig, whatsappUrl } from '@/data/site';

export const metadata = {
  title: 'Autos y camionetas en Cruz Alta, Córdoba',
  description: 'Descubrí los vehículos disponibles en Viza Automotores. Compra, venta, financiación y tasación de usados en Cruz Alta, Córdoba.',
};

const services = [
  ['01', 'Financiación', 'Consultá las alternativas de financiación disponibles para tu próximo vehículo.'],
  ['02', 'Recibimos tu usado', 'Acercanos los datos de tu vehículo y evaluamos una posible operación.'],
  ['03', 'Permutas', 'Contanos qué vehículo tenés y cuál estás buscando.'],
  ['04', 'Atención personalizada', 'Te acompañamos para que puedas resolver tus dudas y avanzar con confianza.'],
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="section section-featured">
        <div className="container">
          <div className="section-topline"><SectionHeading eyebrow="STOCK SELECCIONADO" title="Encontrá tu próximo vehículo." description="Conocé algunas de las opciones disponibles en Viza Automotores." /><Link className="text-link" href="/vehiculos">Ver todo el catálogo <span>↗</span></Link></div>
          <VehicleGrid featuredOnly limit={3} />
        </div>
      </section>

      <HowToBuy />
      <BrandsMarquee />

      <section className="section section-services-home">
        <div className="container services-home-layout">
          <div className="services-home-intro"><SectionHeading eyebrow="MÁS QUE UNA CONCESIONARIA" title="Un equipo para acompañarte." description="Queremos ayudarte a encontrar una opción que se adapte a lo que estás buscando." /><Link className="button button-outline" href="/servicios">Conocé nuestros servicios <span>↗</span></Link></div>
          <div className="service-mini-grid">{services.map(([number, title, description]) => <article className="service-mini" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>
      </section>

      <section className="trade-banner">
        <div className="container trade-banner-inner"><div><span className="eyebrow eyebrow-light"><i /> ¿TENÉS UN VEHÍCULO?</span><h2>Tu usado también<br />puede ser el próximo.</h2><p>Compartinos sus datos y fotografías para que podamos evaluar una propuesta.</p></div><Link className="button button-light" href="/cotizar">Quiero cotizar mi vehículo <span>↗</span></Link></div>
      </section>

      <section className="section section-about-home">
        <div className="container about-home-grid"><div className="about-photo"><div className="about-photo-image" /><span>VIZA AUTOMOTORES · CRUZ ALTA</span></div><div className="about-home-copy"><SectionHeading eyebrow="SOMOS VIZA" title="Tu próximo camino comienza con una buena elección." description="En Viza Automotores trabajamos para acompañarte en la búsqueda de tu próximo vehículo. Conocé nuestro stock y comunicate con nuestro equipo para recibir más información." /><Link className="text-link" href="/nosotros">Conocé más sobre nosotros <span>↗</span></Link></div></div>
      </section>

      <section className="section location-home-section">
        <div className="container location-home-layout">
          <div className="location-home-copy"><SectionHeading eyebrow="DÓNDE ENCONTRARNOS" title="Estamos cerca tuyo." description="Acercate a Viza Automotores en Cruz Alta. Consultá por WhatsApp para coordinar una visita y conocer los vehículos disponibles." /><a className="location-address-link" href={siteConfig.googleMapsUrl} target="_blank" rel="noreferrer">{siteConfig.address} <span>↗</span></a><p className="location-hours"><strong>Horarios de atención</strong><span>{siteConfig.hours}</span><small>Horario de referencia, pendiente de confirmar con la agencia.</small></p><a className="button button-outline" href={siteConfig.googleMapsUrl} target="_blank" rel="noreferrer">Cómo llegar <span>↗</span></a></div>
          <GoogleMap title="Cómo llegar a Viza Automotores en Cruz Alta" />
        </div>
      </section>

      <ReviewsSection />

      <section className="contact-strip"><div className="container contact-strip-inner"><div><span className="eyebrow"><i /> ESTAMOS PARA AYUDARTE</span><h2>¿Tenés alguna consulta?</h2><p>Comunicate con Viza Automotores.</p></div><div className="contact-strip-actions"><a className="button button-primary" href={whatsappUrl('Hola Viza Automotores, quisiera hacer una consulta.')} target="_blank" rel="noreferrer">Escribir por WhatsApp ↗</a><Link className="button button-outline" href="/contacto">Ir a contacto</Link></div></div></section>
    </>
  );
}
