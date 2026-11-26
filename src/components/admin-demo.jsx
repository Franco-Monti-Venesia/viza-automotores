'use client';

import { useEffect, useMemo, useState } from 'react';
import { initialVehicles } from '@/data/vehicles';
import { siteConfig } from '@/data/site';
import { STORAGE_KEYS, readStoredList, writeStored } from '@/lib/demo-storage';
import StyledSelect from './styled-select';

const tabs = [
  ['resumen', 'Resumen'], ['vehiculos', 'Vehículos'], ['consultas', 'Consultas'], ['tasaciones', 'Tasaciones'], ['configuracion', 'Configuración'],
];
const blankVehicle = {
  id: '', slug: '', brand: '', model: '', version: '', title: '', year: '', kilometers: '', priceLabel: 'Consultar',
  condition: 'Usado', category: 'Auto', bodyStyle: '', engine: '', power: '', transmission: '', fuel: '',
  shortDescription: '', highlights: [], featured: false, status: 'Disponible', imageFolder: '/images/vehiculos/nuevo-vehiculo', imageCount: 8, imageExtension: 'jpg',
};

function makeSlug(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminDemo() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState('resumen');
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [inquiries, setInquiries] = useState([]);
  const [appraisals, setAppraisals] = useState([]);
  const [settings, setSettings] = useState({ agencyName: 'Viza Automotores', phone: '3467 439967', accent: '#d72d3b', theme: 'claro' });
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blankVehicle);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    setVehicles(readStoredList(STORAGE_KEYS.vehicles, initialVehicles));
    setInquiries(readStoredList(STORAGE_KEYS.inquiries, []));
    setAppraisals(readStoredList(STORAGE_KEYS.appraisals, []));
    const currentSettings = readStoredList(STORAGE_KEYS.settings, null);
    if (currentSettings && !Array.isArray(currentSettings)) setSettings(currentSettings);
  }, []);

  const available = useMemo(() => vehicles.filter((v) => v.status === 'Disponible').length, [vehicles]);
  function notify(message) { setSavedMessage(message); window.setTimeout(() => setSavedMessage(''), 2800); }
  function persistVehicles(next) { setVehicles(next); writeStored(STORAGE_KEYS.vehicles, next); }
  function openNew() { setEditing('new'); setForm({ ...blankVehicle }); }
  function openEdit(vehicle) { setEditing(vehicle.id); setForm({ ...vehicle, highlights: vehicle.highlights || [] }); }
  function saveVehicle(event) {
    event.preventDefault();
    const title = `${form.brand.trim()} ${form.model.trim()} ${form.version.trim()}`.trim();
    if (!form.brand.trim() || !form.model.trim() || !form.year) return;
    const id = editing === 'new' ? `viza-${Date.now()}` : form.id;
    const slug = form.slug?.trim() || makeSlug(title + ' ' + form.year);
    const nextVehicle = { ...form, id, slug, title, year: Number(form.year), kilometers: form.kilometers === '' ? null : Number(form.kilometers), highlights: (Array.isArray(form.highlights) ? form.highlights : String(form.highlights || '').split('\n')).map((x) => String(x).trim()).filter(Boolean) };
    const next = editing === 'new' ? [nextVehicle, ...vehicles] : vehicles.map((v) => v.id === id ? nextVehicle : v);
    persistVehicles(next); setEditing(null); notify('Vehículo guardado en esta demostración.');
  }
  function deleteVehicle(vehicle) {
    if (!window.confirm(`¿Eliminar ${vehicle.title}?`)) return;
    persistVehicles(vehicles.filter((v) => v.id !== vehicle.id)); notify('Vehículo eliminado de la demostración.');
  }
  function updateLeadStatus(key, list, setter, index, status) {
    const next = list.map((item, i) => i === index ? { ...item, status } : item);
    setter(next); writeStored(key, next);
  }
  function saveSettings(event) {
    event.preventDefault(); writeStored(STORAGE_KEYS.settings, settings); notify('Configuración demo guardada en este navegador.');
  }

  function handleLogin(event) {
    event.preventDefault();
    if (password === '1234') {
      setAuthenticated(true);
      setLoginError('');
      return;
    }
    setLoginError('La contraseña ingresada no es correcta.');
  }

  if (!authenticated) {
    return (
      <div className="admin-login-screen">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <img className="admin-login-logo" src={siteConfig.logoPath} alt="Logo de Viza Automotores" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
          <span className="admin-login-eyebrow">ÁREA PRIVADA</span>
          <h1>Administración</h1>
          <p>Ingresá la contraseña para acceder al panel de Viza Automotores.</p>
          <label className="field admin-login-field"><span>Contraseña</span><input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Ingresá tu contraseña" required /></label>
          {loginError && <p className="admin-login-error" role="alert">{loginError}</p>}
          <button className="button button-primary button-wide" type="submit">Ingresar al panel <span>↗</span></button>
          <small className="admin-login-demo-note">Contraseña temporal de demostración: <strong>1234</strong></small>
          <a className="admin-login-back" href="/">← Volver al sitio</a>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a href="/" className="admin-brand"><img className="admin-logo-image" src={siteConfig.logoPath} alt="Logo de Viza Automotores" onError={(event) => { event.currentTarget.style.display = 'none'; }} /><span><strong>ADMINISTRACIÓN</strong><small>VIZA AUTOMOTORES</small></span></a>
        <div className="admin-nav-label">GESTIÓN</div>
        {tabs.map(([id, label]) => <button key={id} type="button" className={tab === id ? 'admin-nav-item active' : 'admin-nav-item'} onClick={() => { setTab(id); setEditing(null); }}><span>{({ resumen: '◫', vehiculos: '▤', consultas: '✉', tasaciones: '⌂', configuracion: '⚙' })[id]}</span>{label}</button>)}
        <div className="admin-sidebar-bottom"><a href="/" className="admin-nav-item">↗ Ver sitio web</a><span>Viza Automotores · Demo</span></div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar"><div><small>PANEL DE CONTROL</small><h1>{tabs.find(([id]) => id === tab)?.[1]}</h1></div><span className="demo-user"><i /> Modo demostración</span></header>
        <div className="admin-warning"><strong>Importante:</strong> esta es una demostración local. Los cambios se guardan únicamente en este navegador; todavía no hay inicio de sesión, permisos ni conexión con Supabase. No publicar como panel de producción.</div>
        {savedMessage && <div className="admin-toast" role="status">✓ {savedMessage}</div>}

        {tab === 'resumen' && <>
          <div className="admin-stats">
            <div className="admin-stat"><small>Vehículos cargados</small><strong>{vehicles.length}</strong><span>En el inventario demo</span></div>
            <div className="admin-stat"><small>Disponibles</small><strong>{available}</strong><span>Publicaciones activas</span></div>
            <div className="admin-stat"><small>Consultas recibidas</small><strong>{inquiries.length}</strong><span>En este navegador</span></div>
            <div className="admin-stat"><small>Solicitudes de tasación</small><strong>{appraisals.length}</strong><span>En este navegador</span></div>
          </div>
          <div className="admin-panel-card"><div className="admin-card-heading"><div><h2>Últimos vehículos</h2><p>Un vistazo al inventario actual</p></div><button className="button button-primary button-small" onClick={() => { setTab('vehiculos'); openNew(); }}>+ Cargar vehículo</button></div>
            <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Vehículo</th><th>Año</th><th>Estado</th><th>Precio</th><th></th></tr></thead><tbody>{vehicles.slice(0, 5).map((v) => <tr key={v.id}><td><strong>{v.title}</strong><small>{v.category} · {v.condition}</small></td><td>{v.year}</td><td><span className={`status-pill ${v.status === 'Disponible' ? 'status-ok' : v.status === 'Vendido' ? 'status-danger' : 'status-warn'}`}>{v.status}</span></td><td>Consultar</td><td><button className="text-action" onClick={() => { setTab('vehiculos'); openEdit(v); }}>Editar</button></td></tr>)}</tbody></table></div>
          </div>
        </>}

        {tab === 'vehiculos' && <div className="admin-panel-card"><div className="admin-card-heading"><div><h2>Inventario de vehículos</h2><p>Altas, modificaciones y estado de las publicaciones.</p></div><button className="button button-primary button-small" onClick={openNew}>+ Nuevo vehículo</button></div>
          {editing !== null ? <form className="admin-edit-form" onSubmit={saveVehicle}>
            <div className="admin-edit-title"><h3>{editing === 'new' ? 'Cargar vehículo' : 'Editar vehículo'}</h3><button type="button" className="text-action" onClick={() => setEditing(null)}>Cancelar</button></div>
            <div className="form-grid admin-form-grid">
              <label className="field"><span>Marca *</span><input required value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} /></label>
              <label className="field"><span>Modelo *</span><input required value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} /></label>
              <label className="field"><span>Versión</span><input value={form.version || ''} onChange={(e) => setForm({ ...form, version: e.target.value })} /></label>
              <label className="field"><span>Año *</span><input required type="number" min="1900" max="2100" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} /></label>
              <label className="field"><span>Kilometraje</span><input type="number" min="0" value={form.kilometers ?? ''} onChange={(e) => setForm({ ...form, kilometers: e.target.value })} /></label>
              <label className="field"><span>Precio</span><input value={form.priceLabel || 'Consultar'} onChange={(e) => setForm({ ...form, priceLabel: e.target.value })} /></label>
              <label className="field"><span>Tipo de vehículo</span><StyledSelect className="styled-select-field" value={form.category} onChange={(next) => setForm({ ...form, category: next })} options={['Auto', 'Camioneta', 'Moto', 'Utilitario']} /></label>
              <label className="field"><span>Condición</span><StyledSelect className="styled-select-field" value={form.condition} onChange={(next) => setForm({ ...form, condition: next })} options={['Usado', 'Nuevo']} /></label>
              <label className="field"><span>Motor</span><input value={form.engine || ''} onChange={(e) => setForm({ ...form, engine: e.target.value })} /></label>
              <label className="field"><span>Potencia</span><input value={form.power || ''} onChange={(e) => setForm({ ...form, power: e.target.value })} /></label>
              <label className="field"><span>Transmisión</span><input value={form.transmission || ''} onChange={(e) => setForm({ ...form, transmission: e.target.value })} /></label>
              <label className="field"><span>Carrocería / tipo</span><input value={form.bodyStyle || ''} onChange={(e) => setForm({ ...form, bodyStyle: e.target.value })} /></label>
              <label className="field"><span>Estado de publicación</span><StyledSelect className="styled-select-field" value={form.status} onChange={(next) => setForm({ ...form, status: next })} options={['Disponible', 'Reservado', 'Vendido', 'Borrador']} /></label>
              <label className="field"><span>Carpeta de imágenes</span><input value={form.imageFolder || ''} onChange={(e) => setForm({ ...form, imageFolder: e.target.value })} placeholder="/images/vehiculos/nombre-carpeta" /></label>
              <label className="field field-full"><span>Descripción</span><textarea rows={3} value={form.shortDescription || ''} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} /></label>
              <label className="field field-full"><span>Equipamiento, destacados y observaciones (uno por línea)</span><textarea rows={5} value={(form.highlights || []).join('\n')} onChange={(e) => setForm({ ...form, highlights: e.target.value.split('\n') })} placeholder={'Ej. Techo solar\nButacas calefaccionadas\nCámara de estacionamiento'} /></label>
            </div>
            <label className="admin-check"><input type="checkbox" checked={Boolean(form.featured)} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Mostrar como vehículo destacado en el inicio</label>
            <button className="button button-primary" type="submit">Guardar vehículo</button>
          </form> : <div className="admin-vehicle-list">{vehicles.map((v) => <div className="admin-vehicle-row" key={v.id}><div className="admin-vehicle-symbol">{v.category === 'Moto' ? 'M' : 'V'}</div><div className="admin-vehicle-name"><strong>{v.title}</strong><small>{v.year} · {v.category} · {v.condition}</small></div><span className={`status-pill ${v.status === 'Disponible' ? 'status-ok' : v.status === 'Vendido' ? 'status-danger' : 'status-warn'}`}>{v.status}</span><button className="text-action" onClick={() => openEdit(v)}>Editar</button><button className="text-action danger-action" onClick={() => deleteVehicle(v)}>Eliminar</button></div>)}</div>}
        </div>}

        {(tab === 'consultas' || tab === 'tasaciones') && <div className="admin-panel-card"><div className="admin-card-heading"><div><h2>{tab === 'consultas' ? 'Consultas de compradores' : 'Solicitudes de tasación'}</h2><p>Los envíos realizados desde los formularios de esta demo.</p></div><span className="admin-count">{tab === 'consultas' ? inquiries.length : appraisals.length} registros</span></div>
          {(tab === 'consultas' ? inquiries : appraisals).length === 0 ? <div className="admin-empty"><span>✉</span><h3>Todavía no hay solicitudes</h3><p>Cuando se complete un formulario en este mismo navegador, aparecerá acá.</p></div> : <div className="admin-lead-list">{(tab === 'consultas' ? inquiries : appraisals).map((item, index) => <article className="admin-lead" key={item.id}><div className="lead-topline"><strong>{item.name}</strong><span>{new Date(item.createdAt).toLocaleString('es-AR')}</span></div><p><b>{tab === 'consultas' ? item.subject : `${item.brand} ${item.model} ${item.year}`}</b> · {item.phone}</p><p>{item.message}</p>{item.photos?.length > 0 && <small>Archivos seleccionados: {item.photos.join(', ')}</small>}<div className="lead-bottom"><span className="status-pill status-warn">{item.status || 'Nueva'}</span><StyledSelect className="styled-select-compact" value={item.status || 'Nueva'} onChange={(next) => updateLeadStatus(tab === 'consultas' ? STORAGE_KEYS.inquiries : STORAGE_KEYS.appraisals, tab === 'consultas' ? inquiries : appraisals, tab === 'consultas' ? setInquiries : setAppraisals, index, next)} options={['Nueva', 'En revisión', 'Contactado', 'Finalizada']} /><a href={`https://wa.me/${String(item.phone || '').replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-action">Contactar ↗</a></div></article>)}</div>}
        </div>}

        {tab === 'configuracion' && <div className="admin-panel-card"><div className="admin-card-heading"><div><h2>Configuración de la agencia</h2><p>Opciones visuales básicas para la futura versión conectada.</p></div></div><form className="admin-edit-form" onSubmit={saveSettings}><div className="form-grid admin-form-grid"><label className="field"><span>Nombre de la agencia</span><input value={settings.agencyName} onChange={(e) => setSettings({ ...settings, agencyName: e.target.value })} /></label><label className="field"><span>Teléfono</span><input value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} /></label><label className="field"><span>Color principal</span><input type="color" value={settings.accent} onChange={(e) => setSettings({ ...settings, accent: e.target.value })} /></label><label className="field"><span>Modo visual</span><StyledSelect className="styled-select-field" value={settings.theme} onChange={(next) => setSettings({ ...settings, theme: next })} options={[{ value: 'claro', label: 'Claro' }, { value: 'oscuro', label: 'Oscuro' }]} /></label></div><p className="demo-disclaimer">En esta versión se guarda la configuración en el navegador, pero aún no modifica la web pública. La personalización real se conectará a Supabase más adelante.</p><button className="button button-primary" type="submit">Guardar configuración</button></form></div>}
      </main>
    </div>
  );
}
