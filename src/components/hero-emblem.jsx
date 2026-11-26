'use client';

import { useRef, useState } from 'react';
import { siteConfig } from '@/data/site';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function HeroEmblem() {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0 });
  const dragStart = useRef(null);

  function handlePointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = {
      pointerId: event.pointerId,
      pointerX: event.clientX,
      pointerY: event.clientY,
      originX: position.x,
      originY: position.y,
    };
    setDragging(true);
  }

  function handlePointerMove(event) {
    const start = dragStart.current;
    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.pointerX;
    const deltaY = event.clientY - start.pointerY;
    setPosition({
      x: clamp(start.originX + deltaX, -92, 92),
      y: clamp(start.originY + deltaY, -72, 72),
      tiltX: clamp(-deltaY * 0.12, -13, 13),
      tiltY: clamp(deltaX * 0.14, -16, 16),
    });
  }

  function finishDrag(event) {
    if (dragStart.current && dragStart.current.pointerId === event.pointerId) {
      dragStart.current = null;
      setDragging(false);
    }
  }

  const style = {
    '--drag-x': `${position.x}px`,
    '--drag-y': `${position.y}px`,
    '--tilt-x': `${position.tiltX}deg`,
    '--tilt-y': `${position.tiltY}deg`,
  };

  return (
    <div className={`hero-emblem${dragging ? ' hero-emblem-dragging' : ''}`}>
      <button
        className="hero-emblem-interactive"
        type="button"
        style={style}
        aria-label="Mantené presionado y arrastrá el emblema de Viza Automotores"
        title="Arrastrá el emblema con el mouse"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={finishDrag}
      >
        <span className="hero-emblem-disc">
          <img src={siteConfig.logoPath} alt="" draggable="false" />
        </span>
        <span className="hero-emblem-orbit" />
      </button>
    </div>
  );
}
