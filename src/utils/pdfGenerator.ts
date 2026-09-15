import { RouteDetail } from '../types';

export function downloadRoutePDF(route: RouteDetail) {
  const printWindow = window.open('', '_blank', 'width=850,height=950');
  if (!printWindow) {
    // If popup blocked, create a fallback text/html blob download
    const htmlContent = generatePDFHtml(route);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ficha-Tecnica-${route.id.toUpperCase()}-Puno.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return;
  }

  const html = generatePDFHtml(route);
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();

  // Automatically trigger print dialog once loaded
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 400);
  };
}

function generatePDFHtml(route: RouteDetail): string {
  const code = `RUTA-${route.number.toString().padStart(2, '0')}`;
  const now = new Date().toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ficha Técnica Oficial - ${code} | Municipalidad Provincial de Puno</title>
  <style>
    @page { size: A4; margin: 18mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0F172A;
      background: #FFFFFF;
      line-height: 1.5;
      font-size: 13px;
      margin: 0;
      padding: 24px;
    }
    .header {
      border-bottom: 2px solid #0B335E;
      padding-bottom: 16px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .logo-box {
      font-size: 20px;
      font-weight: 800;
      color: #0B335E;
      letter-spacing: -0.5px;
    }
    .logo-sub {
      font-size: 11px;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 999px;
      background: #1474B4;
      color: #FFFFFF;
      font-size: 12px;
      font-weight: 700;
    }
    .title-section {
      margin-bottom: 24px;
    }
    .title-section h1 {
      font-size: 22px;
      color: #0B335E;
      margin: 0 0 6px 0;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-bottom: 24px;
    }
    .card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 12px 14px;
    }
    .card-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748B;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .card-value {
      font-size: 14px;
      font-weight: 700;
      color: #0F172A;
    }
    .card-sub {
      font-size: 11px;
      color: #475569;
    }
    .section-title {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 800;
      color: #0B335E;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 6px;
      margin-top: 20px;
      margin-bottom: 12px;
    }
    .street-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 20px;
    }
    .street-pill {
      background: #F1F5F9;
      border: 1px solid #CBD5E1;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      color: #334155;
    }
    .points-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-bottom: 24px;
    }
    .point-item {
      background: #F0FDF4;
      border: 1px solid #BBF7D0;
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 11px;
      color: #166534;
      font-weight: 600;
    }
    .desc-box {
      background: #F8FAFC;
      border-left: 3px solid #1474B4;
      padding: 12px 16px;
      font-size: 12px;
      color: #334155;
      margin-bottom: 24px;
    }
    .footer {
      border-top: 1px solid #E2E8F0;
      padding-top: 14px;
      margin-top: 36px;
      font-size: 10px;
      color: #94A3B8;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo-box">MUNICIPALIDAD PROVINCIAL DE PUNO</div>
      <div class="logo-sub">Gerencia de Gestión Integral de Residuos Sólidos • Puno Digital 2026</div>
    </div>
    <div style="text-align: right;">
      <span class="badge">${code}</span>
      <div style="font-size: 10px; color: #64748B; margin-top: 4px;">Ficha Técnica Georreferenciada</div>
    </div>
  </div>

  <div class="title-section">
    <h1>${route.name}</h1>
    <div style="font-size: 12px; color: #475569;">
      <strong>Sector Urbano:</strong> ${route.sector} • <strong>Estado Operativo:</strong> <span style="color: #15803D; font-weight: bold;">🟢 ${route.status}</span>
    </div>
  </div>

  <div class="grid">
    <div class="card">
      <div class="card-label">Horario Oficial de Recojo</div>
      <div class="card-value">${route.schedule}</div>
      <div class="card-sub">Turno: ${route.shift}</div>
    </div>

    <div class="card">
      <div class="card-label">Frecuencia del Servicio</div>
      <div class="card-value">${route.frequency}</div>
      <div class="card-sub">Programación regular 2026</div>
    </div>

    <div class="card">
      <div class="card-label">Unidad de Recolección Asignada</div>
      <div class="card-value">${route.truckUnit}</div>
      <div class="card-sub">Sistema de pesaje y tolva compactadora</div>
    </div>

    <div class="card">
      <div class="card-label">Población / Predios Estimados</div>
      <div class="card-value">~${route.estimatedHouseholds.toLocaleString()} Familias</div>
      <div class="card-sub">Padrón catastral municipal de Puno</div>
    </div>
  </div>

  <div class="section-title">Descripción y Cobertura Operativa</div>
  <div class="desc-box">
    ${route.description}
  </div>

  <div class="section-title">Calles, Avenidas y Pasajes Comprendidos (${route.coverageStreets.length})</div>
  <div class="street-list">
    ${route.coverageStreets.map((s) => `<span class="street-pill">📍 ${s}</span>`).join('')}
  </div>

  <div class="section-title">Hitos y Puntos de Concentración Principal</div>
  <div class="points-grid">
    ${route.mainPoints.map((p) => `<div class="point-item">✓ ${p}</div>`).join('')}
  </div>

  <div class="footer">
    <div>Fecha de emisión técnica: ${now} • Sistema Muni Puno Digital</div>
    <div>© 2026 Municipalidad Provincial de Puno - Todos los derechos reservados</div>
  </div>
</body>
</html>`;
}
