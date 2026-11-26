'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './logo';
import { siteConfig, whatsappUrl } from '@/data/site';

export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith('/administracion')) return null;

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
          <a href={siteConfig.googleMapsUrl} target="_blank" rel="noreferrer">{siteConfig.address} ↗</a>
          <a href={whatsappUrl('Hola Viza Automotores, quisiera hacer una consulta.')} target="_blank" rel="noreferrer">WhatsApp: {siteConfig.phoneDisplay}</a>
          <Link href="/contacto">Formulario de contacto</Link>
          <div className="footer-hours"><strong>Horarios de atención</strong><span>{siteConfig.hours}</span><small>Horario de referencia, pendiente de confirmar.</small></div>
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
