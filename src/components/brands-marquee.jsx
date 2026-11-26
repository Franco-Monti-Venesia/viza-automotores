const brands = [
  'FIAT', 'FORD', 'VOLKSWAGEN', 'CHEVROLET', 'TOYOTA', 'RENAULT', 'PEUGEOT', 'CITROËN',
  'HONDA', 'NISSAN', 'JEEP', 'HYUNDAI', 'KIA', 'MERCEDES-BENZ', 'BMW', 'AUDI', 'RAM', 'MITSUBISHI',
];

export default function BrandsMarquee() {
  const repeated = [...brands, ...brands];
  return (
    <section className="brands-section" aria-label="Marcas de vehículos">
      <div className="container"><p className="brands-heading">MARCAS QUE PODÉS ENCONTRAR</p></div>
      <div className="brands-marquee" aria-hidden="true">
        <div className="brands-track">{repeated.map((brand, index) => <span className="brand-wordmark" key={`${brand}-${index}`}>{brand}</span>)}</div>
      </div>
    </section>
  );
}
