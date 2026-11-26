'use client';

import { useState } from 'react';

export default function VehicleImage({ src, alt, className = '', badge }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`vehicle-media ${className}`}>
      {!failed ? (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="vehicle-placeholder" aria-label={`Fotografía pendiente: ${alt}`}>
          <span className="placeholder-mark">V</span>
          <span className="placeholder-title">{alt}</span>
          <small>Fotografía pendiente de cargar</small>
        </div>
      )}
      {badge && <span className="image-badge">{badge}</span>}
    </div>
  );
}
