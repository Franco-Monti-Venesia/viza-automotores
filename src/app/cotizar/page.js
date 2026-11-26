import LeadForm from '@/components/lead-form';
import SectionHeading from '@/components/section-heading';

export const metadata = {
  title: 'Cotizá tu usado',
  description: 'Ofrecé tu auto, camioneta o moto a Viza Automotores en Cruz Alta, Córdoba.',
};

export default function QuotePage() {
  return <div className="page-wrap"><div className="container quote-layout"><div className="quote-intro"><SectionHeading eyebrow="RECIBIMOS TU USADO" title="Tu vehículo puede ser parte de una nueva oportunidad." description="Completá los datos de tu vehículo y compartinos sus características. El equipo de Viza Automotores podrá revisar la información y contactarte." /><div className="quote-steps"><div><span>01</span><p>Completá los datos del vehículo.</p></div><div><span>02</span><p>Contanos sobre su estado y equipamiento.</p></div><div><span>03</span><p>Dejanos tus datos para continuar la conversación.</p></div></div></div><div className="form-card"><div className="form-card-heading"><h2>Quiero cotizar mi vehículo</h2><p>Los campos con * son obligatorios.</p></div><LeadForm type="appraisal" /></div></div></div>;
}
