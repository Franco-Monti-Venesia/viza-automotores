'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getVehicleImage, formatKilometers } from '@/data/vehicles';

function Chevron({ direction = 'right' }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={`chevron-icon chevron-${direction}`}><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function VehicleCard({ vehicle }) {
  const [images, setImages] = useState([getVehicleImage(vehicle)]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const imageCount = Math.max(1, Number(vehicle.imageCount) || 8);
    const candidates = Array.from({ length: imageCount }, (_, index) => getVehicleImage(vehicle, index + 1));
    Promise.all(candidates.map((src) => new Promise((resolve) => {
      const image = new window.Image();
      image.onload = () => resolve(src);
      image.onerror = () => resolve(null);
      image.src = src;
    }))).then((loaded) => {
      if (!cancelled) {
        const available = loaded.filter(Boolean);
        if (available.length) setImages(available);
      }
    });
    return () => { cancelled = true; };
  }, [vehicle]);

  const statusClass = vehicle.status === 'Disponible' ? 'available' : vehicle.status === 'Reservado' ? 'reserved' : 'sold';
  const specs = [
    vehicle.engine && `Motor ${vehicle.engine}`,
    vehicle.transmission,
    vehicle.kilometers !== null && vehicle.kilometers !== undefined && vehicle.kilometers !== '' ? formatKilometers(vehicle.kilometers) : null,
  ].filter(Boolean);

  function moveImage(event, direction) {
    event.preventDefault();
    event.stopPropagation();
    setActive((current) => (current + direction + images.length) % images.length);
  }

  return (
    <article className="vehicle-card">
      <Link className="vehicle-card-link" href={`/vehiculos/${vehicle.slug}`} aria-label={`Ver todos los detalles de ${vehicle.title}`}>
        <div className="vehicle-card-image-wrap">
          <div className="vehicle-media">
            <img src={images[Math.min(active, images.length - 1)]} alt={vehicle.title} loading="lazy" onError={(event) => { event.currentTarget.src = '/images/placeholders/vehicle-placeholder.svg'; }} />
            <div className="vehicle-image-badges">
              <span className={`condition-badge ${vehicle.condition === 'Nuevo' ? 'condition-new' : 'condition-used'}`}>{vehicle.condition || 'Vehículo'}</span>
              <span className={`vehicle-status-badge status-${statusClass}`}>{vehicle.status || 'Consultar'}</span>
            </div>
          </div>
          {images.length > 1 && <div className="vehicle-card-arrows">
            <button type="button" onClick={(event) => moveImage(event, -1)} aria-label="Fotografía anterior"><Chevron direction="left" /></button>
            <button type="button" onClick={(event) => moveImage(event, 1)} aria-label="Fotografía siguiente"><Chevron /></button>
          </div>}
          {images.length > 1 && <span className="vehicle-card-image-count">{active + 1} / {images.length}</span>}
        </div>
        <div className="vehicle-card-body">
          <div className="vehicle-card-kicker"><span>{vehicle.category}</span><span>{vehicle.year}</span></div>
          <h3>{vehicle.title}</h3>
          <div className="vehicle-card-specs">
            {specs.map((spec) => <span key={spec}>{spec}</span>)}
          </div>
          <div className="vehicle-card-bottom">
            <strong>Consultar disponibilidad</strong>
            <span className="round-arrow" aria-hidden="true">↗</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
