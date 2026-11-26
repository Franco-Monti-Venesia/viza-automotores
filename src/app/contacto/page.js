import Link from 'next/link';
import LeadForm from '@/components/lead-form';
import SectionHeading from '@/components/section-heading';
import { siteConfig, whatsappUrl } from '@/data/site';

export const metadata = {
  title: 'Contacto',
  description: 'Contactate con Viza Automotores en Cruz Alta, Córdoba. Consultas por WhatsApp y formulario.',
};

export default function ContactPage() {
  return <div className="page-wrap"><div className="container contact-page-layout"><div className="contact-info"><SectionHeading eyebrow="CONTACTO" title="Hablemos de tu próximo vehículo." description="Dejanos tu consulta o escribinos directamente. El equipo de Viza Automotores podrá ayudarte con la información que necesitás." /><div className="contact-info-block"><small>WHATSAPP / TELÉFONO</small><a href={whatsappUrl('Hola Viza Automotores, quisiera hacer una consulta.')} target="_blank" rel="noreferrer">{siteConfig.phoneDisplay} ↗</a></div><div className="contact-info-block"><small>DIRECCIÓN</small><p>{siteConfig.address}</p><p>{siteConfig.location}</p></div><div className="contact-info-block"><small>REDES SOCIALES</small><a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram @viza_automotores ↗</a></div><div className="contact-map-card"><span>VIZA AUTOMOTORES</span><strong>Cruz Alta, Córdoba</strong><small>Juan Domingo Perón y Ruta 6</small></div></div><div className="form-card"><div className="form-card-heading"><h2>Envianos tu consulta</h2><p>Te responderemos por el medio de contacto que nos indiques.</p></div><LeadForm type="contact" /></div></div></div>;
}
