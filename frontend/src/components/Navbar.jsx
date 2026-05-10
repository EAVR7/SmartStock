import { Link } from 'react-router-dom';
import { Package, User } from 'lucide-react';
import './Navbar.css';

export function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
          <Package size={28} color="var(--primary-color)" />
          <h1 style={{ margin: 0 }}>Smart Stock</h1>
        </Link>
      </div>
      <div className="navbar-menu">
        {user ? (
          <>
            <span className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={18} />
              {user.email} {user.role === 'admin' && '(Admin)'}
            </span>
            <Link to="/dashboard">Dashboard</Link>
            {user.role === 'admin' && (
              <>
                <Link to="/categories">Categorías</Link>
                <Link to="/products">Productos</Link>
                <Link to="/movements">Movimientos</Link>
                <Link to="/reports">Reportes</Link>
              </>
            )}
            <Link to="/settings">Ajustes</Link>
            <button onClick={onLogout} className="logout-btn">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
