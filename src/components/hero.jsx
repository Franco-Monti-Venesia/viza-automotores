import Link from 'next/link';
import { siteConfig } from '@/data/site';
import HeroEmblem from './hero-emblem';
import StyledSelect from './styled-select';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-photo" role="img" aria-label="Fachada de Viza Automotores" />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className="hero-copy">
          <span className="eyebrow eyebrow-light"><i /> VIZA AUTOMOTORES · CRUZ ALTA</span>
          <h1>Encontrá el vehículo<br /><em>que estás buscando.</em></h1>
          <p>Comprá, vendé o renová tu vehículo con atención personalizada y opciones para dar el próximo paso.</p>
          <div className="hero-actions">
            <Link href="/vehiculos" className="button button-primary">Explorar vehículos <span>↗</span></Link>
            <Link href="/cotizar" className="button button-glass">Cotizá tu usado</Link>
          </div>
          <a className="hero-google-rating" href={siteConfig.googleReadReviewsUrl} target="_blank" rel="noreferrer" aria-label="Ver opiniones de Viza Automotores en Google">
            <span className="google-g">G</span>
            <span className="rating-stars" aria-label="Estrellas decorativas">★★★★★</span>
            <span className="rating-copy"><strong>Opiniones en Google</strong><small>Leé las experiencias de nuestros clientes</small></span>
            <span className="rating-open">↗</span>
          </a>
        </div>
        <div className="hero-note"><span className="hero-note-line" /> <span>Tu próximo vehículo empieza acá</span></div>
        <HeroEmblem />
      </div>
      <form className="hero-search container" action="/vehiculos">
        <div className="search-intro"><small>ENCONTRÁ TU PRÓXIMO VEHÍCULO</small><strong>¿Qué estás buscando?</strong></div>
        <label><span>Tipo</span><StyledSelect name="tipo" className="styled-select-hero" defaultValue="" placeholder="Todos" options={['Auto', 'Camioneta', 'Moto', 'Utilitario']} /></label>
        <label><span>Marca o modelo</span><input name="q" placeholder="Ej. Volkswagen, Fiat..." /></label>
        <label><span>Condición</span><StyledSelect name="condicion" className="styled-select-hero" defaultValue="" placeholder="Todas" options={['Nuevo', 'Usado']} /></label>
        <button className="button button-primary" type="submit">Buscar vehículos <span>→</span></button>
      </form>
    </section>
  );
}
