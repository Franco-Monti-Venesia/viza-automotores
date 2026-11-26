'use client';

import { useEffect, useMemo, useState } from 'react';
import VehicleCard from './vehicle-card';
import StyledSelect from './styled-select';
import { initialVehicles } from '@/data/vehicles';
import { STORAGE_KEYS } from '@/lib/demo-storage';

export default function CatalogClient({ initialQuery = '', initialType = '', initialCondition = '' }) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialType);
  const [condition, setCondition] = useState(initialCondition);
  const [sort, setSort] = useState('recent');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.vehicles);
      if (saved) setVehicles(JSON.parse(saved));
    } catch { /* Inventario inicial. */ }
  }, []);

  const filtered = useMemo(() => {
    let result = vehicles.filter((v) => v.status !== 'Borrador');
    const term = query.trim().toLowerCase();
    if (term) result = result.filter((v) => `${v.brand} ${v.model} ${v.version} ${v.title}`.toLowerCase().includes(term));
    if (category) result = result.filter((v) => v.category === category);
    if (condition) result = result.filter((v) => v.condition === condition);
    if (sort === 'oldest') result = [...result].sort((a, b) => a.year - b.year);
    if (sort === 'newest') result = [...result].sort((a, b) => b.year - a.year);
    if (sort === 'name') result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [vehicles, query, category, condition, sort]);

  function clearFilters() { setQuery(''); setCategory(''); setCondition(''); setSort('recent'); }

  return (
    <div className="catalog-layout">
      <aside className="catalog-filters">
        <div className="filter-top"><strong>Encontrá tu vehículo</strong><button type="button" onClick={clearFilters}>Limpiar</button></div>
        <label className="field"><span>Buscar marca o modelo</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ej. Volkswagen" /></label>
        <label className="field"><span>Tipo de vehículo</span><StyledSelect className="styled-select-field" value={category} onChange={setCategory} placeholder="Todos" options={['Auto', 'Camioneta', 'Moto', 'Utilitario']} /></label>
        <label className="field"><span>Condición</span><StyledSelect className="styled-select-field" value={condition} onChange={setCondition} placeholder="Todas" options={['Nuevo', 'Usado']} /></label>
      </aside>
      <div className="catalog-results">
        <div className="catalog-toolbar"><p><strong>{filtered.length}</strong> vehículos encontrados</p><div className="catalog-sort-control"><span>Ordenar por</span><StyledSelect className="styled-select-toolbar" value={sort} onChange={setSort} options={[{ value: 'recent', label: 'Más recientes' }, { value: 'newest', label: 'Año: más nuevo' }, { value: 'oldest', label: 'Año: más antiguo' }, { value: 'name', label: 'Nombre' }]} /></div></div>
        {filtered.length ? <div className="vehicle-grid">{filtered.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}</div> : <div className="empty-state"><span>⌕</span><h3>No encontramos vehículos</h3><p>Probá modificar los filtros para ver otras opciones.</p><button className="button button-outline" onClick={clearFilters}>Limpiar filtros</button></div>}
      </div>
    </div>
  );
}
