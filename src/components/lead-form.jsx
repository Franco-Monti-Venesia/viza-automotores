'use client';

import { useState } from 'react';
import { STORAGE_KEYS, readStoredList, writeStored } from '@/lib/demo-storage';

export default function LeadForm({ type = 'contact' }) {
  const isAppraisal = type === 'appraisal';
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [photoNames, setPhotoNames] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    const key = isAppraisal ? STORAGE_KEYS.appraisals : STORAGE_KEYS.inquiries;
    const current = readStoredList(key, []);
    const record = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Nueva',
      ...data,
      photos: photoNames,
    };
    const ok = writeStored(key, [record, ...current]);
    if (!ok) {
      setError('No pudimos guardar la solicitud en este navegador. Revisá el espacio disponible e intentá nuevamente.');
      return;
    }
    setSent(true);
    form.reset();
    setPhotoNames([]);
  }

  if (sent) {
    return (
      <div className="form-success" role="status">
        <span className="success-mark">✓</span>
        <h3>{isAppraisal ? '¡Solicitud enviada correctamente!' : '¡Mensaje enviado correctamente!'}</h3>
        <p>{isAppraisal ? 'Recibimos los datos de tu vehículo. El equipo de Viza Automotores podrá revisar tu propuesta.' : 'Gracias por comunicarte con Viza Automotores. Recibimos tu consulta.'}</p>
        <small>Demostración local: la información quedó guardada en este navegador. La recepción online se activa al conectar Supabase.</small>
        <button className="button button-dark" type="button" onClick={() => setSent(false)}>Enviar otra solicitud</button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field"><span>Nombre y apellido *</span><input name="name" required placeholder="Tu nombre" autoComplete="name" /></label>
        <label className="field"><span>WhatsApp o teléfono *</span><input name="phone" required type="tel" placeholder="Código de área + número" autoComplete="tel" /></label>
        <label className="field"><span>Email</span><input name="email" type="email" placeholder="nombre@email.com" autoComplete="email" /></label>
        {isAppraisal ? (
          <>
            <label className="field"><span>Tipo de vehículo *</span><select name="category" required defaultValue=""><option value="" disabled>Seleccionar</option><option>Auto</option><option>Camioneta</option><option>Moto</option><option>Utilitario</option></select></label>
            <label className="field"><span>Marca *</span><input name="brand" required placeholder="Ej. Ford" /></label>
            <label className="field"><span>Modelo y versión *</span><input name="model" required placeholder="Ej. Focus SE Plus" /></label>
            <label className="field"><span>Año *</span><input name="year" required inputMode="numeric" pattern="[0-9]{4}" placeholder="Ej. 2019" /></label>
            <label className="field"><span>Kilometraje</span><input name="kilometers" inputMode="numeric" placeholder="Ej. 85000" /></label>
            <label className="field"><span>Estado general</span><select name="condition" defaultValue=""><option value="">Seleccionar</option><option>Excelente</option><option>Muy bueno</option><option>Bueno</option><option>Con detalles</option></select></label>
            <label className="field"><span>Precio pretendido (opcional)</span><input name="expectedPrice" placeholder="Ej. USD 15.000" /></label>
          </>
        ) : (
          <label className="field"><span>Asunto *</span><select name="subject" required defaultValue=""><option value="" disabled>Seleccionar motivo</option><option>Consulta por un vehículo</option><option>Financiación</option><option>Permuta</option><option>Otro</option></select></label>
        )}
        <label className="field field-full"><span>{isAppraisal ? 'Equipamiento, detalles u observaciones' : 'Mensaje'} *</span><textarea name="message" required rows={5} placeholder={isAppraisal ? 'Contanos más sobre el vehículo, su equipamiento y estado...' : 'Escribinos tu consulta...'} /></label>
        {isAppraisal && (
          <label className="field field-full upload-field">
            <span>Fotografías del vehículo</span>
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => {
              const files = Array.from(event.target.files || []);
              if (files.length > 8) { setError('Podés seleccionar hasta 8 fotografías.'); event.target.value = ''; setPhotoNames([]); return; }
              const tooLarge = files.some((file) => file.size > 8 * 1024 * 1024);
              if (tooLarge) { setError('Cada fotografía debe pesar como máximo 8 MB.'); event.target.value = ''; setPhotoNames([]); return; }
              setError(''); setPhotoNames(files.map((file) => file.name));
            }} />
            <small>Hasta 8 imágenes. En esta versión demo se guardan los nombres; la subida real se conectará a Supabase Storage.</small>
            {photoNames.length > 0 && <small className="file-list">Seleccionadas: {photoNames.join(', ')}</small>}
          </label>
        )}
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="form-submit-row">
        <p>Los campos marcados con * son obligatorios.</p>
        <button className="button button-primary" type="submit">{isAppraisal ? 'Enviar solicitud de tasación' : 'Enviar mensaje'} <span>→</span></button>
      </div>
      <small className="demo-disclaimer">Versión de demostración: los formularios guardan datos localmente en este navegador, todavía no envían información a la agencia.</small>
    </form>
  );
}
