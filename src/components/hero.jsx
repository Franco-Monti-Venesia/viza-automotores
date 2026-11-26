import Link from 'next/link';
import { siteConfig } from '@/data/site';

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
        </div>
        <div className="hero-note"><span className="hero-note-line" /> <span>Tu próximo vehículo empieza acá</span></div>
      </div>
      <form className="hero-search container" action="/vehiculos">
        <div className="search-intro"><small>ENCONTRÁ TU PRÓXIMO VEHÍCULO</small><strong>¿Qué estás buscando?</strong></div>
        <label><span>Tipo</span><select name="tipo" defaultValue=""><option value="">Todos</option><option>Auto</option><option>Camioneta</option><option>Moto</option></select></label>
        <label><span>Marca o modelo</span><input name="q" placeholder="Ej. Volkswagen, Fiat..." /></label>
        <label><span>Condición</span><select name="condicion" defaultValue=""><option value="">Todas</option><option>Nuevo</option><option>Usado</option></select></label>
        <button className="button button-dark" type="submit">Buscar vehículos <span>→</span></button>
      </form>
    </section>
  );
}
