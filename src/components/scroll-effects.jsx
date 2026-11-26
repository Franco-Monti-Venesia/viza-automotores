'use client';

import { useEffect } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    const selectors = [
      '.section-heading', '.vehicle-card', '.service-mini', '.trade-banner-inner',
      '.about-home-grid', '.contact-strip-inner', '.how-step', '.how-to-buy-grid', '.review-panel',
      '.reviews-layout', '.location-home-layout', '.brands-marquee', '.service-large-card', '.about-values > div',
    ].join(',');

    const elements = document.querySelectorAll(selectors);
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

    elements.forEach((element, index) => {
      element.classList.add('reveal-on-scroll');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 65}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
