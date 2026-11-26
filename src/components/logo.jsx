'use client';

import { useState } from 'react';
import { siteConfig } from '@/data/site';

export default function Logo({ light = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <a className={`brand-lockup${light ? ' brand-lockup-light' : ''}`} href="/" aria-label="Viza Automotores - Inicio">
      {!failed && (
        <img
          className="brand-image"
          src={siteConfig.logoPath}
          alt="Logo de Viza Automotores"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <span className="brand-fallback">
          <strong>VIZA</strong>
          <small>AUTOMOTORES</small>
        </span>
      )}
    </a>
  );
}
