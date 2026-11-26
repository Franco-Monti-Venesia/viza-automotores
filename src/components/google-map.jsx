import { siteConfig } from '@/data/site';

export default function GoogleMap({ title = 'Ubicación de Viza Automotores', className = '' }) {
  return (
    <div className={`google-map-frame ${className}`}>
      <iframe
        title={title}
        src={siteConfig.mapEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
