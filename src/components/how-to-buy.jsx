'use client';

import SectionHeading from './section-heading';

const steps = [
  {
    number: '01', title: 'Elegí el auto que te interesa',
    text: 'Podés ver nuestro stock online o consultarnos por WhatsApp.',
    image: 'https://autosuno.com.ar/wp-content/uploads/2026/03/lavado-de-autos.png',
    fallback: '01',
  },
  {
    number: '02', title: 'Coordiná una visita a la agencia',
    text: 'Te mostramos el vehículo y resolvemos todas tus dudas.',
    image: 'https://autosuno.com.ar/wp-content/uploads/2026/03/examen.png',
    fallback: '02',
  },
  {
    number: '03', title: 'Evaluamos tu forma de pago',
    text: 'Podés pagar contado, financiar o entregar tu usado en parte de pago.',
    image: 'https://autosuno.com.ar/wp-content/uploads/2026/03/metodo-de-pago.png',
    fallback: '03',
  },
  {
    number: '04', title: 'Reservás el vehículo y avanzamos',
    text: 'Señamos el auto y coordinamos los siguientes pasos de la operación.',
    image: 'https://autosuno.com.ar/wp-content/uploads/2026/03/apreton-de-manos.png',
    fallback: '04',
  },
];

export default function HowToBuy() {
  return (
    <section className="section how-to-buy-section">
      <div className="container">
        <div className="how-to-buy-heading">
          <SectionHeading eyebrow="SIMPLE Y ACOMPAÑADO" title="Cómo comprar tu auto." description="Te acompañamos desde la primera consulta hasta el momento de llevarte tu próximo vehículo." />
        </div>
        <div className="how-to-buy-grid">
          {steps.map((step) => (
            <article className="how-step" key={step.number}>
              <div className="how-step-image">
                <img src={step.image} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; event.currentTarget.parentElement.classList.add('image-fallback-active'); }} />
                <span className="how-image-fallback">{step.fallback}</span>
                <span className="how-step-number">{step.number}</span>
              </div>
              <div className="how-step-copy"><h3>{step.title}</h3><p>{step.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
