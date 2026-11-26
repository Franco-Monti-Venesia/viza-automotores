import Link from 'next/link';
export default function NotFound() {
  return <div className="not-found container"><span>404</span><h1>No encontramos esta página.</h1><p>Puede que el enlace haya cambiado o que el contenido ya no esté disponible.</p><Link className="button button-primary" href="/">Volver al inicio</Link></div>;
}
