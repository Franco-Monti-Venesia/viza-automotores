'use client';

import { useEffect, useState } from 'react';
import VehicleCard from './vehicle-card';
import { initialVehicles } from '@/data/vehicles';
import { STORAGE_KEYS } from '@/lib/demo-storage';

export default function VehicleGrid({ vehicles = initialVehicles, featuredOnly = false, limit }) {
  const [items, setItems] = useState(vehicles);
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.vehicles);
      if (stored) setItems(JSON.parse(stored));
    } catch { /* Se conserva el inventario de demostración. */ }
  }, []);
  let visible = featuredOnly ? items.filter((vehicle) => vehicle.featured && vehicle.status !== 'Vendido') : items.filter((vehicle) => vehicle.status !== 'Borrador');
  if (limit) visible = visible.slice(0, limit);
  return (
    <div className="vehicle-grid">
      {visible.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
      {visible.length === 0 && <div className="empty-state">No hay vehículos para mostrar por el momento.</div>}
    </div>
  );
}
