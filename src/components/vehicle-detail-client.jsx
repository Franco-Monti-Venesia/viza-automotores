'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getVehicleImage, formatKilometers } from '@/data/vehicles';
import { siteConfig, whatsappUrl } from '@/data/site';
import { STORAGE_KEYS } from '@/lib/demo-storage';

function Chevron({ direction = 'right' }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className={`chevron-icon chevron-${direction}`}><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function VehicleDetailClient({ initialVehicle, slug }) {
  const [vehicle, setVehicle] = useState(initialVehicle);
  const [galleryImages, setGalleryImages] = useState([]);
  const [active, setActive] = useState(0);
  const [checkedLocal, setCheckedLocal] = useState(Boolean(initialVehicle));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');

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

  useEffect(() => {
    if (!vehicle) return undefined;
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
        setGalleryImages(available);
        setActive(0);
      }
    });
    return () => { cancelled = true; };
  }, [vehicle]);

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowLeft') setActive((current) => (current - 1 + galleryImages.length) % galleryImages.length);
      if (event.key === 'ArrowRight') setActive((current) => (current + 1) % galleryImages.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxOpen, galleryImages.length]);

  const specs = useMemo(() => [
    ['Año', vehicle?.year], ['Kilometraje', formatKilometers(vehicle?.kilometers)],
    ['Motor', vehicle?.engine], ['Potencia', vehicle?.power], ['Transmisión', vehicle?.transmission],
    ['Combustible', vehicle?.fuel], ['Tracción', vehicle?.traction], ['Carrocería', vehicle?.bodyStyle],
  ].filter((entry) => entry[1] && entry[1] !== 'Consultar'), [vehicle]);

  if (!vehicle && !checkedLocal) return <div className="container page-empty"><h1>Cargando vehículo...</h1></div>;
  if (!vehicle) return <div className="container page-empty"><h1>Vehículo no encontrado</h1><p>El vehículo puede haber sido quitado del inventario.</p><Link className="button button-dark" href="/vehiculos">Volver al catálogo</Link></div>;

  const whatsappMessage = `Hola Viza Automotores, quisiera consultar por el ${vehicle.title} ${vehicle.year}. ¿Me pueden brindar más información?`;
  const activeImage = galleryImages[active] || '/images/placeholders/vehicle-placeholder.svg';
  const statusClass = vehicle.status === 'Disponible' ? 'available' : vehicle.status === 'Reservado' ? 'reserved' : 'sold';

  function changeImage(direction) {
    setActive((current) => (current + direction + galleryImages.length) % galleryImages.length);
  }

  function updateZoom(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  }

  return (
    <div className="container vehicle-detail-page">
      <div className="breadcrumbs"><Link href="/">Inicio</Link><span>/</span><Link href="/vehiculos">Vehículos</Link><span>/</span><span>{vehicle.title}</span></div>
      <div className="detail-grid">
        <div className="detail-gallery">
          <div className="detail-main-frame" onMouseMove={updateZoom}>
            <button className="detail-main-image-button" type="button" onClick={() => galleryImages.length > 0 && setLightboxOpen(true)} aria-label="Ampliar fotografía del vehículo">
              <img className="detail-main-image" src={activeImage} alt={`${vehicle.title} - fotografía ${active + 1}`} style={{ '--zoom-origin': zoomOrigin }} onError={(event) => { event.currentTarget.src = '/images/placeholders/vehicle-placeholder.svg'; }} />
              <span className="detail-zoom-hint">⌕ Ampliar fotografía</span>
            </button>
            {galleryImages.length > 1 && <>
              <button className="gallery-arrow gallery-arrow-left" type="button" onClick={() => changeImage(-1)} aria-label="Fotografía anterior"><Chevron direction="left" /></button>
              <button className="gallery-arrow gallery-arrow-right" type="button" onClick={() => changeImage(1)} aria-label="Fotografía siguiente"><Chevron /></button>
              <span className="gallery-counter">{active + 1} / {galleryImages.length}</span>
            </>}
            <span className={`detail-status status-${statusClass}`}>{vehicle.status}</span>
          </div>
          {galleryImages.length > 1 && <div className="detail-thumbnails">
            {galleryImages.map((src, index) => <button key={src} className={active === index ? 'thumbnail active' : 'thumbnail'} onClick={() => setActive(index)} type="button" aria-label={`Ver fotografía ${index + 1}`}><img src={src} alt={`${vehicle.title} miniatura ${index + 1}`} loading="lazy" /></button>)}
          </div>}
          <div className="detail-description"><span className="eyebrow"><i /> INFORMACIÓN DEL VEHÍCULO</span><h2>Conocé todos los detalles</h2><p>{vehicle.shortDescription}</p><p className="commercial-copy">{siteConfig.financingMessage}</p></div>
        </div>
        <aside className="detail-sidebar">
          <div className="detail-badges"><span className="detail-category">{vehicle.category} · {vehicle.condition}</span><span className={`vehicle-status-badge status-${statusClass}`}>{vehicle.status}</span></div>
          <h1>{vehicle.title}</h1>
          <div className="detail-price"><small>Precio</small><strong>Consultar</strong></div>
          <div className="detail-spec-grid">{specs.map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div>
          {vehicle.highlights?.length > 0 && <div className="detail-highlights"><h3>Equipamiento y destacados</h3><ul>{vehicle.highlights.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul></div>}
          <a className="button button-primary button-wide" href={whatsappUrl(whatsappMessage)} target="_blank" rel="noreferrer">Consultar por WhatsApp <span>↗</span></a>
          <a className="button button-outline button-wide" href={`tel:+${siteConfig.whatsapp}`}>Llamar a la agencia</a>
          <small className="detail-note">La disponibilidad, el equipamiento y las condiciones comerciales están sujetos a confirmación por parte de la agencia.</small>
        </aside>
      </div>

      {lightboxOpen && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`Galería de ${vehicle.title}`} onMouseDown={(event) => { if (event.target === event.currentTarget) setLightboxOpen(false); }}>
        <button className="lightbox-close" type="button" onClick={() => setLightboxOpen(false)} aria-label="Cerrar galería">×</button>
        {galleryImages.length > 1 && <button className="gallery-arrow gallery-arrow-left" type="button" onClick={() => changeImage(-1)} aria-label="Fotografía anterior"><Chevron direction="left" /></button>}
        <img src={activeImage} alt={`${vehicle.title} ampliado`} />
        {galleryImages.length > 1 && <button className="gallery-arrow gallery-arrow-right" type="button" onClick={() => changeImage(1)} aria-label="Fotografía siguiente"><Chevron /></button>}
        <span className="lightbox-counter">{active + 1} / {galleryImages.length}</span>
      </div>}
    </div>
  );
}
