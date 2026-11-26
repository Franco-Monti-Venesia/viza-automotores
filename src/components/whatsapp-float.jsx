import { siteConfig, whatsappUrl } from '@/data/site';

export default function WhatsappFloat() {
  return (
    <a className="whatsapp-float" href={whatsappUrl('Hola Viza Automotores, quisiera recibir información.')} target="_blank" rel="noreferrer" aria-label="Consultar por WhatsApp">
      <span className="whatsapp-icon" aria-hidden="true">◔</span>
      <span>Consultar por WhatsApp</span>
    </a>
  );
}
