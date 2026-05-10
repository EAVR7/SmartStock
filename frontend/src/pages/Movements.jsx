import { useState, useEffect } from 'react';
import { ArrowRightLeft, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { stockAPI, productsAPI } from '../services/apiService';
import './Movements.css';

export function Movements({ user }) {
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    productId: '',
    type: 'entrada',
    quantity: '',
    reason: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [movementsRes, productsRes] = await Promise.all([
        stockAPI.getMovements(),
        productsAPI.getAll(),
      ]);
      setMovements(movementsRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await stockAPI.recordMovement(formData);
      setFormData({
        productId: '',
        type: 'entrada',
        quantity: '',
        reason: '',
      });
      fetchData();
      alert('Movimiento registrado');
    } catch (error) {
      alert('Error al registrar: ' + error.message);
    }
  };

  return (
    <div className="movements-page">
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowRightLeft size={32} /> Movimientos de Stock</h1>

      <div className="movements-container">
        <div className="form-section">
          <h2>Registrar Movimiento</h2>
          <form onSubmit={handleSubmit} className="movement-form">
            <div>
              <label>Producto</label>
              <select
                value={formData.productId}
                onChange={(e) =>
                  setFormData({ ...formData, productId: e.target.value })
                }
                required
              >
                <option value="">Seleccionar...</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.sku})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Tipo</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="entrada">Entrada</option>
                <option value="salida">Salida</option>
              </select>
            </div>

            <div>
              <label>Cantidad</label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label>Motivo</label>
              <input
                type="text"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                placeholder="Compra, venta, ajuste..."
              />
            </div>

            <button type="submit" className="primary-btn">
              Registrar
            </button>
          </form>
        </div>

        <div className="list-section">
          <h2>Historial de Movimientos</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <table className="movements-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>
                  <th>Razón</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {movements.map((mov) => (
                  <tr key={mov.id}>
                    <td>{mov.product?.name}</td>
                    <td>{mov.type === 'entrada' ? <ArrowDownCircle size={18} color="green" /> : <ArrowUpCircle size={18} color="red" />}</td>
                    <td>{mov.quantity}</td>
                    <td>{mov.reason}</td>
                    <td>{new Date(mov.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
