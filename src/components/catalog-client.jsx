'use client';

import { useEffect, useMemo, useState } from 'react';
import VehicleCard from './vehicle-card';
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
        <label className="field"><span>Tipo de vehículo</span><select value={category} onChange={(e) => setCategory(e.target.value)}><option value="">Todos</option><option>Auto</option><option>Camioneta</option><option>Moto</option><option>Utilitario</option></select></label>
        <label className="field"><span>Condición</span><select value={condition} onChange={(e) => setCondition(e.target.value)}><option value="">Todas</option><option>Nuevo</option><option>Usado</option></select></label>
      </aside>
      <div className="catalog-results">
        <div className="catalog-toolbar"><p><strong>{filtered.length}</strong> vehículos encontrados</p><label>Ordenar por <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="recent">Más recientes</option><option value="newest">Año: más nuevo</option><option value="oldest">Año: más antiguo</option><option value="name">Nombre</option></select></label></div>
        {filtered.length ? <div className="vehicle-grid">{filtered.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}</div> : <div className="empty-state"><span>⌕</span><h3>No encontramos vehículos</h3><p>Probá modificar los filtros para ver otras opciones.</p><button className="button button-outline" onClick={clearFilters}>Limpiar filtros</button></div>}
      </div>
    </div>
  );
}
