'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './logo';

const links = [
  ['Inicio', '/'],
  ['Vehículos', '/vehiculos'],
  ['Servicios', '/servicios'],
  ['Cotizá tu usado', '/cotizar'],
  ['Nosotros', '/nosotros'],
  ['Contacto', '/contacto'],
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <Logo />
        <nav className={`main-nav${open ? ' main-nav-open' : ''}`} aria-label="Navegación principal">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link className="nav-cta" href="/vehiculos" onClick={() => setOpen(false)}>Ver vehículos <span>↗</span></Link>
        </nav>
        <button className={`menu-toggle${open ? ' menu-toggle-open' : ''}`} type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
