import Link from 'next/link';
import SectionHeading from '@/components/section-heading';

export const metadata = {
  title: 'Servicios',
  description: 'Conocé las opciones de atención y servicios de Viza Automotores en Cruz Alta, Córdoba.',
};

const services = [
  ['01', 'Financiación', 'Consultá las alternativas disponibles para financiar parte del valor de tu próximo vehículo. Las condiciones se confirman para cada operación.'],
  ['02', 'Compra y venta', 'Te acompañamos durante el proceso de búsqueda y consulta por los vehículos publicados.'],
  ['03', 'Recibimos tu usado', 'Podés acercarnos la información de tu auto o camioneta para que el equipo evalúe una posible propuesta.'],
  ['04', 'Permutas', 'Consultá por alternativas para entregar tu vehículo como parte de pago.'],
  ['05', 'Consignaciones', 'Consultá con el equipo las posibilidades y condiciones para ofrecer tu vehículo en consignación.'],
  ['06', 'Atención personalizada', 'Contactate con la agencia para recibir información sobre disponibilidad, características y próximos pasos.'],
];

export default function ServicesPage() {
  return <div className="page-wrap"><div className="container"><div className="page-intro"><SectionHeading eyebrow="SERVICIOS VIZA" title="Acompañamiento en cada paso." description="Conocé las opciones de atención y consultá con nuestro equipo las condiciones de cada operación." /></div><div className="services-page-grid">{services.map(([num, title, desc]) => <article key={num} className="service-large-card"><span>{num}</span><div><h2>{title}</h2><p>{desc}</p></div><span className="service-arrow">↗</span></article>)}</div><div className="service-note">La disponibilidad y las condiciones de cada servicio deben confirmarse directamente con Viza Automotores.</div><div className="center-cta"><h2>¿Querés saber más?</h2><p>Escribinos y te ayudamos con tu consulta.</p><Link className="button button-primary" href="/contacto">Contactar a Viza <span>↗</span></Link></div></div></div>;
}
