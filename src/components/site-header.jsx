'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const previousY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 90) {
        setHidden(false);
      } else if (currentY > previousY.current + 5) {
        setHidden(true);
        setOpen(false);
      } else if (currentY < previousY.current - 5) {
        setHidden(false);
      }
      previousY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  if (pathname?.startsWith('/administracion')) return null;

  return (
    <header className={`site-header${hidden ? ' site-header-hidden' : ''}`}>
      <div className="header-inner container">
        <div className="header-brand"><Logo /></div>
        <nav className={`main-nav${open ? ' main-nav-open' : ''}`} aria-label="Navegación principal">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>
          ))}
          <Link className="nav-mobile-cta" href="/vehiculos" onClick={() => setOpen(false)}>Ver vehículos <span>↗</span></Link>
        </nav>
        <div className="header-actions">
          <Link className="nav-cta" href="/vehiculos">Ver vehículos <span>↗</span></Link>
          <button className={`menu-toggle${open ? ' menu-toggle-open' : ''}`} type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
