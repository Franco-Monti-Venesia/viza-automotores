import Link from 'next/link';
import VehicleImage from './vehicle-image';
import { getVehicleImage, formatKilometers } from '@/data/vehicles';

export default function VehicleCard({ vehicle }) {
  return (
    <article className="vehicle-card">
      <Link className="vehicle-card-image-link" href={`/vehiculos/${vehicle.slug}`} aria-label={`Ver ${vehicle.title}`}>
        <VehicleImage src={getVehicleImage(vehicle)} alt={vehicle.title} badge={vehicle.status === 'Disponible' ? vehicle.condition : vehicle.status} />
      </Link>
      <div className="vehicle-card-body">
        <div className="vehicle-card-kicker"><span>{vehicle.category}</span><span>{vehicle.year}</span></div>
        <h3><Link href={`/vehiculos/${vehicle.slug}`}>{vehicle.title}</Link></h3>
        <div className="vehicle-card-specs">
          <span>{vehicle.transmission || 'Consultar caja'}</span>
          <span>{formatKilometers(vehicle.kilometers)}</span>
        </div>
        <div className="vehicle-card-bottom">
          <div><small>Precio</small><strong>Consultar</strong></div>
          <Link className="round-arrow" href={`/vehiculos/${vehicle.slug}`} aria-label={`Ver detalle de ${vehicle.title}`}>↗</Link>
        </div>
      </div>
    </article>
  );
}
