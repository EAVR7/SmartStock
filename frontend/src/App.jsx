import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Categories } from './pages/Categories';
import { Movements } from './pages/Movements';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { settingsAPI } from './services/apiService';
import './App.css';

function App() {
  const { user, loading: authLoading, isAuthenticated, login, logout } = useAuth();
  const [themeLoading, setThemeLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      settingsAPI.getSettings().then((response) => {
        const theme = response.data?.settings?.theme || 'light';
        document.body.setAttribute('data-theme', theme);
        setThemeLoading(false);
      }).catch(() => {
        document.body.setAttribute('data-theme', 'light');
        setThemeLoading(false);
      });
    } else {
      document.body.setAttribute('data-theme', 'light');
      setThemeLoading(false);
    }
  }, [isAuthenticated]);

  if (authLoading || themeLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated && <Navbar user={user} onLogout={logout} />}
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                user={user}
                requiredRole="admin"
              >
                <Products user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                user={user}
                requiredRole="admin"
              >
                <Categories />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movements"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                user={user}
                requiredRole="admin"
              >
                <Movements user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                user={user}
                requiredRole="admin"
              >
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
                <Settings user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;