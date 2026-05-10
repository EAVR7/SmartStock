import { useState, useEffect } from 'react';
import { ClipboardList, Plus, X, Trash2 } from 'lucide-react';
import { productsAPI, categoriesAPI } from '../services/apiService';
import './Products.css';

export function Products({ user }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll()
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
      fetchData();
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
      fetchData();
      alert('Producto eliminado');
    } catch (error) {
      alert('Error al eliminar: ' + error.message);
    }
  };

  const getCategoryName = (id) => {
    const category = categories.find(c => c.id === id);
    return category ? category.name : 'N/A';
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ClipboardList size={32} /> Gestión de Productos</h1>
        {user?.role === 'admin' && (
          <button
            className="primary-btn"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? <><X size={18} /> Cancelar</> : <><Plus size={18} /> Nuevo Producto</>}
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
          <select
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            required
          >
            <option value="" disabled>Seleccione una categoría</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Precio"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Stock Mínimo"
            min="0"
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
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Mínimo</th>
              {user?.role === 'admin' && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const isLowStock =
                product.currentStock <= product.minimumStock;
              return (
                <tr
                  key={product.id}
                  className={isLowStock ? 'low-stock-row' : ''}
                >
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{getCategoryName(product.categoryId)}</td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>
                    <span
                      className={`stock-badge ${
                        isLowStock ? 'warning' : ''
                      }`}
                    >
                      {product.currentStock || 0}
                    </span>
                  </td>
                  <td>{product.minimumStock}</td>
                  {user?.role === 'admin' && (
                    <td>
                      <button
                        className="delete-btn"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
