import Link from 'next/link';
import Logo from './logo';
import { siteConfig, whatsappUrl } from '@/data/site';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Logo light />
          <p>Encontrá el vehículo que estás buscando. Comprá, vendé o renová con Viza Automotores.</p>
          <a className="footer-social" href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
        </div>
        <div className="footer-column">
          <h3>Explorá</h3>
          <Link href="/vehiculos">Vehículos</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/cotizar">Cotizá tu usado</Link>
          <Link href="/nosotros">Nosotros</Link>
        </div>
        <div className="footer-column">
          <h3>Contacto</h3>
          <p>{siteConfig.address}</p>
          <a href={whatsappUrl('Hola Viza Automotores, quisiera hacer una consulta.')} target="_blank" rel="noreferrer">WhatsApp: {siteConfig.phoneDisplay}</a>
          <Link href="/contacto">Formulario de contacto</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Viza Automotores. Todos los derechos reservados.</span>
        <Link className="admin-footer-link" href="/administracion">Administración</Link>
        <span>Diseño y desarrollo web</span>
      </div>
    </footer>
  );
}
