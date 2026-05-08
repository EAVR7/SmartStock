import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token JWT
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  getMe: () => apiClient.get('/auth/me'),
  logout: () => localStorage.removeItem('token'),
};

// Products API
export const productsAPI = {
  getAll: () => apiClient.get('/products'),
  getById: (id) => apiClient.get(`/products/${id}`),
  create: (data) => apiClient.post('/products', data),
  update: (id, data) => apiClient.put(`/products/${id}`, data),
  delete: (id) => apiClient.delete(`/products/${id}`),
};

// Stock API
export const stockAPI = {
  getCurrent: () => apiClient.get('/stock/current'),
  recordMovement: (data) => apiClient.post('/stock/movement', data),
  getMovements: () => apiClient.get('/stock/movements'),
};

// Reports API
export const reportsAPI = {
  getProductsReport: () =>
    apiClient.get('/reports/products', { responseType: 'blob' }),
};

// Admin API
export const adminAPI = {
  createUser: (data) => apiClient.post('/admin/users', data),
  getUsers: () => apiClient.get('/admin/users'),
};

// Settings API
export const settingsAPI = {
  getSettings: () => apiClient.get('/settings'),
  updateSettings: (data) => apiClient.post('/settings', data),
};

export default apiClient;
