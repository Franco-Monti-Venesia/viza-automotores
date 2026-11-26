import VehicleDetailClient from '@/components/vehicle-detail-client';
import { initialVehicles, getVehicleBySlug } from '@/data/vehicles';

export function generateStaticParams() {
  return initialVehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return { title: 'Vehículo | Viza Automotores' };
  return {
    title: `${vehicle.title} ${vehicle.year} | Precio a consultar`,
    description: `${vehicle.shortDescription} Consultá en Viza Automotores, Cruz Alta, Córdoba.`,
    openGraph: { title: `${vehicle.title} ${vehicle.year} | Viza Automotores`, description: vehicle.shortDescription },
  };
}

export default async function VehiclePage({ params }) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  return <VehicleDetailClient initialVehicle={vehicle || null} slug={slug} />;
}
