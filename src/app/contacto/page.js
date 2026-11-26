import Link from 'next/link';
import LeadForm from '@/components/lead-form';
import SectionHeading from '@/components/section-heading';
import GoogleMap from '@/components/google-map';
import { siteConfig, whatsappUrl } from '@/data/site';

export const metadata = {
  title: 'Contacto',
  description: 'Contactate con Viza Automotores en Cruz Alta, Córdoba. Consultas por WhatsApp y formulario.',
};

export default function ContactPage() {
  return <div className="page-wrap"><div className="container contact-page-layout"><div className="contact-info"><SectionHeading eyebrow="CONTACTO" title="Hablemos de tu próximo vehículo." description="Dejanos tu consulta o escribinos directamente. El equipo de Viza Automotores podrá ayudarte con la información que necesitás." /><div className="contact-info-block"><small>WHATSAPP / TELÉFONO</small><a href={whatsappUrl('Hola Viza Automotores, quisiera hacer una consulta.')} target="_blank" rel="noreferrer">{siteConfig.phoneDisplay} ↗</a></div><div className="contact-info-block"><small>DIRECCIÓN</small><a className="contact-address-link" href={siteConfig.googleMapsUrl} target="_blank" rel="noreferrer">{siteConfig.address} ↗</a><p>{siteConfig.location}</p><div className="contact-hours"><strong>Horarios de atención</strong><span>{siteConfig.hours}</span><small>Horario de referencia, pendiente de confirmar.</small></div></div><div className="contact-info-block"><small>REDES SOCIALES</small><a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram @viza_automotores ↗</a></div><GoogleMap title="Mapa para llegar a Viza Automotores" /></div><div className="form-card"><div className="form-card-heading"><h2>Envianos tu consulta</h2><p>Te responderemos por el medio de contacto que nos indiques.</p></div><LeadForm type="contact" /></div></div></div>;
}
