import Link from 'next/link';
import SectionHeading from './section-heading';
import { siteConfig } from '@/data/site';

export default function ReviewsSection() {
  return (
    <section className="section reviews-section">
      <div className="container reviews-layout">
        <div className="reviews-copy">
          <SectionHeading eyebrow="EXPERIENCIAS REALES" title="Opiniones de nuestros clientes." description="Tu experiencia es importante. Conocé las opiniones compartidas en Google y ayudanos a seguir mejorando." />
          <div className="reviews-actions"><a className="button button-primary" href={siteConfig.googleReadReviewsUrl} target="_blank" rel="noreferrer">Ver opiniones en Google <span>↗</span></a><a className="reviews-write-link" href={siteConfig.googleReviewsUrl} target="_blank" rel="noreferrer">Dejar una reseña</a></div>
        </div>
        <div className="review-panel">
          <span className="review-google-mark">G</span>
          <div className="review-stars">★★★★★</div>
          <h3>¿Ya compraste en Viza?</h3>
          <p>Contanos cómo fue tu experiencia. Tu reseña ayuda a otras personas a elegir con más confianza.</p>
          <a href={siteConfig.googleReviewsUrl} target="_blank" rel="noreferrer">Dejar una reseña en Google ↗</a>
        </div>
      </div>
    </section>
  );
}
