import { useState, useEffect } from 'react';
import { stockAPI } from '../services/apiService';
import './Dashboard.css';

export function Dashboard({ user }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await stockAPI.getCurrent();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <p>Bienvenido, {user?.email}</p>
      </div>

      {loading ? (
        <p>Cargando estadísticas...</p>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>📦 Total Productos</h3>
            <p className="stat-value">{stats?.totalProducts || 0}</p>
          </div>

          <div className="stat-card warning">
            <h3>⚠️ Stock Bajo</h3>
            <p className="stat-value">{stats?.lowStockProducts || 0}</p>
          </div>

          <div className="stat-card">
            <h3>💰 Valor Total</h3>
            <p className="stat-value">
              ${stats?.totalValue?.toLocaleString() || 0}
            </p>
          </div>

          <div className="stat-card">
            <h3>📈 Movimientos</h3>
            <p className="stat-value">{stats?.totalMovements || 0}</p>
          </div>
        </div>
      )}

      <div className="dashboard-actions">
        <h2>Acciones Rápidas</h2>
        <div className="actions-grid">
          <a href="/products" className="action-btn">
            📋 Ver Productos
          </a>
          <a href="/movements" className="action-btn">
            ➡️ Registrar Movimiento
          </a>
          <a href="/reports" className="action-btn">
            📄 Generar Reporte
          </a>
        </div>
      </div>
    </div>
  );
}
