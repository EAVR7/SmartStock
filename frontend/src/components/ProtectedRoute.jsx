import { Navigate } from 'react-router-dom';

export function ProtectedRoute({
  children,
  isAuthenticated,
  requiredRole = null,
  user,
}) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
