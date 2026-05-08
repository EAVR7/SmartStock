import { useState, useEffect } from 'react';
import { settingsAPI } from '../services/apiService';
import './Settings.css';

export function Settings({ user }) {
  const [settings, setSettings] = useState({
    theme: 'light',
    density: 'normal',
    language: 'es',
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.getSettings();
      setSettings(response.data || {
        theme: 'light',
        density: 'normal',
        language: 'es',
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await settingsAPI.updateSettings(settings);
      setMessage('Configuración guardada ✓');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error al guardar: ' + error.message);
    }
  };

  if (loading) return <div className="settings-page"><p>Cargando...</p></div>;

  return (
    <div className="settings-page">
      <h1>⚙️ Configuración</h1>

      <div className="settings-container">
        <div className="settings-card">
          <h2>Perfil de Usuario</h2>
          <div className="setting-group">
            <label>Email</label>
            <input type="email" value={user?.email} disabled />
          </div>
          <div className="setting-group">
            <label>Rol</label>
            <input type="text" value={user?.role || 'usuario'} disabled />
          </div>
        </div>

        <div className="settings-card">
          <h2>Preferencias de Interfaz</h2>

          <div className="setting-group">
            <label>Tema</label>
            <select
              value={settings.theme}
              onChange={(e) =>
                setSettings({ ...settings, theme: e.target.value })
              }
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
            </select>
          </div>

          <div className="setting-group">
            <label>Densidad</label>
            <select
              value={settings.density}
              onChange={(e) =>
                setSettings({ ...settings, density: e.target.value })
              }
            >
              <option value="compact">Compacta</option>
              <option value="normal">Normal</option>
              <option value="spacious">Espaciada</option>
            </select>
          </div>

          <div className="setting-group">
            <label>Idioma</label>
            <select
              value={settings.language}
              onChange={(e) =>
                setSettings({ ...settings, language: e.target.value })
              }
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>

          {message && <p className="message">{message}</p>}

          <button onClick={handleSave} className="save-btn">
            💾 Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
