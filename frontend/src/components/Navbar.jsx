import { Link } from 'react-router-dom';
import './Navbar.css';

export function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>📦 Smart Stock</h1>
      </div>
      <div className="navbar-menu">
        {user ? (
          <>
            <span className="user-info">
              👤 {user.email} {user.role === 'admin' && '(Admin)'}
            </span>
            <Link to="/dashboard">Dashboard</Link>
            {user.role === 'admin' && (
              <>
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
