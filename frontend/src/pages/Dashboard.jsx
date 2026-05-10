import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, AlertTriangle, CircleDollarSign, TrendingUp, ClipboardList, FolderTree, ArrowRightLeft, FileText, Activity } from 'lucide-react';
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
        <div className="header-title-container">
          <Activity size={28} className="header-icon" />
          <div>
            <h1>System Overview</h1>
            <p>Operations and metrics for <strong>{user?.name || user?.email}</strong></p>
          </div>
        </div>
        <div className="header-badge">
          {user?.role === 'admin' ? 'ADMIN_ACCESS' : 'USER_ACCESS'}
        </div>
      </div>

      {loading ? (
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Fetching metrics...</p>
        </div>
      ) : (
        <>
          <div className="stats-section">
            <h2 className="section-title">Core Metrics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-info">
                  <h3>Total Products</h3>
                  <p className="stat-value">{stats?.totalProducts || 0}</p>
                </div>
                <div className="stat-icon"><Package size={24} /></div>
              </div>

              <div className="stat-card warning">
                <div className="stat-info">
                  <h3>Low Stock Alerts</h3>
                  <p className="stat-value">{stats?.lowStockProducts || 0}</p>
                </div>
                <div className="stat-icon"><AlertTriangle size={24} /></div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <h3>Inventory Valuation</h3>
                  <p className="stat-value">
                    ${stats?.totalValue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                  </p>
                </div>
                <div className="stat-icon"><CircleDollarSign size={24} /></div>
              </div>

              <div className="stat-card">
                <div className="stat-info">
                  <h3>Monthly Movements</h3>
                  <p className="stat-value">{stats?.totalMovements || 0}</p>
                </div>
                <div className="stat-icon"><TrendingUp size={24} /></div>
              </div>
            </div>
          </div>

          <div className="dashboard-actions">
            <h2 className="section-title">Control Panel</h2>
            <div className="actions-grid">
              <Link to="/products" className="action-btn">
                <span className="action-icon"><ClipboardList size={20} /></span>
                <span className="action-text">Manage Products</span>
              </Link>
              {user?.role === 'admin' && (
                <>
                  <Link to="/categories" className="action-btn">
                    <span className="action-icon"><FolderTree size={20} /></span>
                    <span className="action-text">Category Architecture</span>
                  </Link>
                  <Link to="/movements" className="action-btn highlight">
                    <span className="action-icon"><ArrowRightLeft size={20} /></span>
                    <span className="action-text">Execute Movement</span>
                  </Link>
                  <Link to="/reports" className="action-btn">
                    <span className="action-icon"><FileText size={20} /></span>
                    <span className="action-text">System Reports</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
