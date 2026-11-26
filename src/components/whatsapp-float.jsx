'use client';

import { usePathname } from 'next/navigation';
import { whatsappUrl } from '@/data/site';

export default function WhatsappFloat() {
  const pathname = usePathname();
  if (pathname?.startsWith('/administracion')) return null;

  return (
    <a className="whatsapp-float" href={whatsappUrl('Hola Viza Automotores, quisiera recibir información.')} target="_blank" rel="noreferrer" aria-label="Consultar por WhatsApp">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3.1A12.8 12.8 0 0 0 5 22.4L3.5 28l5.8-1.5A12.9 12.9 0 1 0 16 3.1Zm0 23.3c-2 0-4-.5-5.7-1.6l-.4-.2-3.4.9.9-3.3-.3-.5A10.4 10.4 0 1 1 16 26.4Zm5.7-7.8c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2-.4.2-.7.1a8.5 8.5 0 0 1-2.5-1.5 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.4.3-.5.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.3 3.1c.1.2 2.2 3.4 5.3 4.8.7.3 1.2.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.4Z"/></svg>
    </a>
  );
}
