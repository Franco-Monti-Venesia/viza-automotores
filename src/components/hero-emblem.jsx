'use client';

import { useRef, useState } from 'react';
import { siteConfig } from '@/data/site';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function HeroEmblem() {
  const [tracking, setTracking] = useState(false);
  const [look, setLook] = useState({ x: 10, y: -14 });
  const activePointer = useRef(null);

  function updateLook(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const vertical = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

    // The badge stays anchored. Only its 3D orientation follows the pointer.
    setLook({
      x: clamp(-vertical * 27, -29, 29),
      y: clamp(horizontal * 32, -34, 34),
    });
  }

  function handlePointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;
    activePointer.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    setTracking(true);
    updateLook(event);
  }

  function handlePointerMove(event) {
    if (activePointer.current !== event.pointerId) return;
    updateLook(event);
  }

  function finishInteraction(event) {
    if (activePointer.current !== event.pointerId) return;
    activePointer.current = null;
    setTracking(false);
  }

  const style = {
    '--look-x': `${look.x}deg`,
    '--look-y': `${look.y}deg`,
  };

  return (
    <div className={`hero-emblem${tracking ? ' hero-emblem-tracking' : ''}`}>
      <button
        className="hero-emblem-hitarea"
        type="button"
        style={style}
        aria-label="Mantené presionado y mové el mouse para orientar el emblema de Viza Automotores"
        title="Mantené presionado y mové el mouse para orientar el emblema"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishInteraction}
        onPointerCancel={finishInteraction}
        onLostPointerCapture={finishInteraction}
      >
        <span className="hero-emblem-body">
          <span className="hero-emblem-disc">
            <img src={siteConfig.logoPath} alt="" draggable="false" />
          </span>
          <span className="hero-emblem-orbit" />
          <span className="hero-emblem-glow" />
        </span>
      </button>
    </div>
  );
}
