import CatalogClient from '@/components/catalog-client';
import SectionHeading from '@/components/section-heading';

export const metadata = {
  title: 'Vehículos disponibles',
  description: 'Explorá el catálogo de autos, camionetas y vehículos disponibles en Viza Automotores, Cruz Alta, Córdoba.',
};

export default async function VehiclesPage({ searchParams }) {
  const params = await searchParams;
  return (
    <div className="page-wrap">
      <div className="container">
        <div className="page-intro page-intro-row"><SectionHeading eyebrow="NUESTRO INVENTARIO" title="Encontrá el vehículo indicado para vos." description="Explorá las publicaciones de Viza Automotores y consultanos por disponibilidad, características y financiación." /></div>
        <CatalogClient initialQuery={params?.q || ''} initialType={params?.tipo || ''} initialCondition={params?.condicion || ''} />
      </div>
    </div>
  );
}
