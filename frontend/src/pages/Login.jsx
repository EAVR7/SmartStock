import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-visual">
        <div className="visual-overlay"></div>
        <div className="visual-content">
          <div className="logo-badge">SS</div>
          <h1>Transforma tu<br/>Gestión de Inventario</h1>
          <p>Control total, métricas en tiempo real y una experiencia diseñada para profesionales. Optimiza tus recursos con Smart Stock.</p>
        </div>
      </div>
      <div className="login-form-container">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Bienvenido de vuelta</h2>
            <p>Ingresa a tu cuenta para continuar</p>
          </div>

          {error && (
            <div className="error-message">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="modern-form">
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  placeholder="admin@smartstock.local"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <span className="btn-spinner"></span>
              ) : 'Iniciar sesión'}
            </button>
          </form>

          <div className="demo-credentials">
            <p><strong>Demo Access:</strong> admin@smartstock.local / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
