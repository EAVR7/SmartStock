import { useState, useEffect } from 'react';
import { productsAPI } from '../services/apiService';
import './Products.css';

export function Products({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    categoryId: '',
    price: '',
    minimumStock: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (user?.role !== 'admin') {
      alert('Solo admin puede crear productos');
      return;
    }

    try {
      await productsAPI.create(formData);
      setFormData({
        name: '',
        sku: '',
        categoryId: '',
        price: '',
        minimumStock: '',
      });
      setShowForm(false);
      fetchProducts();
      alert('Producto creado');
    } catch (error) {
      alert('Error al crear producto: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (user?.role !== 'admin') return;
    if (!window.confirm('¿Eliminar producto?')) return;

    try {
      await productsAPI.delete(id);
      fetchProducts();
      alert('Producto eliminado');
    } catch (error) {
      alert('Error al eliminar: ' + error.message);
    }
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>📋 Gestión de Productos</h1>
        {user?.role === 'admin' && (
          <button
            className="primary-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancelar' : '➕ Nuevo Producto'}
          </button>
        )}
      </div>

      {showForm && user?.role === 'admin' && (
        <form className="product-form" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="SKU"
            value={formData.sku}
            onChange={(e) =>
              setFormData({ ...formData, sku: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Stock Mínimo"
            value={formData.minimumStock}
            onChange={(e) =>
              setFormData({ ...formData, minimumStock: e.target.value })
            }
            required
          />
          <button type="submit" className="primary-btn">
            Guardar
          </button>
        </form>
      )}

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>SKU</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Mínimo</th>
              {user?.role === 'admin' && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.currentStock || 0}</td>
                <td>{product.minimumStock}</td>
                {user?.role === 'admin' && (
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product.id)}
                    >
                      🗑️
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
