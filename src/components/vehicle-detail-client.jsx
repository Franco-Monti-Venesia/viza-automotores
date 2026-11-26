'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import VehicleImage from './vehicle-image';
import { getVehicleImage, formatKilometers } from '@/data/vehicles';
import { siteConfig, whatsappUrl } from '@/data/site';
import { STORAGE_KEYS } from '@/lib/demo-storage';

export default function VehicleDetailClient({ initialVehicle, slug }) {
  const [vehicle, setVehicle] = useState(initialVehicle);
  const [active, setActive] = useState(1);
  const [checkedLocal, setCheckedLocal] = useState(Boolean(initialVehicle));

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.vehicles);
      if (saved) {
        const list = JSON.parse(saved);
        const local = list.find((item) => item.slug === slug);
        if (local) setVehicle(local);
      }
    } catch { /* Se mantiene el vehículo inicial. */ }
    setCheckedLocal(true);
  }, [slug]);

  if (!vehicle && !checkedLocal) return <div className="container page-empty"><h1>Cargando vehículo...</h1></div>;
  if (!vehicle) return <div className="container page-empty"><h1>Vehículo no encontrado</h1><p>El vehículo puede haber sido quitado del inventario.</p><Link className="button button-dark" href="/vehiculos">Volver al catálogo</Link></div>;

  const whatsappMessage = `Hola Viza Automotores, quisiera consultar por el ${vehicle.title} ${vehicle.year}. ¿Me pueden brindar más información?`;
  const galleryCount = Math.max(1, Math.min(Number(vehicle.imageCount || 8), 8));
  const gallery = Array.from({ length: galleryCount }, (_, index) => getVehicleImage(vehicle, index + 1));
  const specs = [
    ['Año', vehicle.year], ['Kilometraje', formatKilometers(vehicle.kilometers)],
    ['Motor', vehicle.engine], ['Potencia', vehicle.power], ['Transmisión', vehicle.transmission],
    ['Combustible', vehicle.fuel], ['Tracción', vehicle.traction], ['Carrocería', vehicle.bodyStyle],
  ].filter((entry) => entry[1]);

  return (
    <div className="container vehicle-detail-page">
      <div className="breadcrumbs"><Link href="/">Inicio</Link><span>/</span><Link href="/vehiculos">Vehículos</Link><span>/</span><span>{vehicle.title}</span></div>
      <div className="detail-grid">
        <div className="detail-gallery">
          <VehicleImage className="detail-main-image" src={gallery[active - 1]} alt={`${vehicle.title} - fotografía ${active}`} badge={vehicle.status} />
          <div className="detail-thumbnails">
            {gallery.slice(0, 8).map((src, index) => <button key={src} className={active === index + 1 ? 'thumbnail active' : 'thumbnail'} onClick={() => setActive(index + 1)} type="button" aria-label={`Ver fotografía ${index + 1}`}><VehicleImage src={src} alt={`${vehicle.title} miniatura ${index + 1}`} /></button>)}
          </div>
          <div className="detail-description"><span className="eyebrow"><i /> INFORMACIÓN DEL VEHÍCULO</span><h2>Conocé todos los detalles</h2><p>{vehicle.shortDescription}</p><p className="commercial-copy">{siteConfig.financingMessage}</p></div>
        </div>
        <aside className="detail-sidebar">
          <span className="detail-category">{vehicle.category} · {vehicle.condition}</span>
          <h1>{vehicle.title}</h1>
          <div className="detail-price"><small>Precio</small><strong>Consultar</strong></div>
          <div className="detail-spec-grid">{specs.map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div>
          {vehicle.highlights?.length > 0 && <div className="detail-highlights"><h3>Equipamiento y destacados</h3><ul>{vehicle.highlights.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul></div>}
          <a className="button button-primary button-wide" href={whatsappUrl(whatsappMessage)} target="_blank" rel="noreferrer">Consultar por WhatsApp <span>↗</span></a>
          <a className="button button-outline button-wide" href={`tel:+${siteConfig.whatsapp}`}>Llamar a la agencia</a>
          <small className="detail-note">La disponibilidad, el equipamiento y las condiciones comerciales están sujetos a confirmación por parte de la agencia.</small>
        </aside>
      </div>
    </div>
  );
}
