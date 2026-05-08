import { reportsAPI } from '../services/apiService';
import './Reports.css';

export function Reports() {
  const handleDownloadReport = async () => {
    try {
      const blob = await reportsAPI.getProductsReport();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte-productos-${new Date().toISOString().split('T')[0]}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error al descargar reporte: ' + error.message);
    }
  };

  return (
    <div className="reports-page">
      <h1>📄 Reportes</h1>

      <div className="reports-grid">
        <div className="report-card">
          <h2>📋 Reporte de Productos</h2>
          <p>Descarga un PDF con todos los productos y su stock actual.</p>
          <button onClick={handleDownloadReport} className="download-btn">
            📥 Descargar PDF
          </button>
        </div>

        <div className="report-card">
          <h2>📊 Movimientos</h2>
          <p>Historial detallado de todas las entradas y salidas de stock.</p>
          <button className="download-btn" disabled>
            Próximamente
          </button>
        </div>

        <div className="report-card">
          <h2>⚠️ Stock Bajo</h2>
          <p>Alertas de productos con stock por debajo del mínimo.</p>
          <button className="download-btn" disabled>
            Próximamente
          </button>
        </div>

        <div className="report-card">
          <h2>💰 Valorización</h2>
          <p>Valor total del inventario y proyecciones.</p>
          <button className="download-btn" disabled>
            Próximamente
          </button>
        </div>
      </div>
    </div>
  );
}
