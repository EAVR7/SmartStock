import { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { categoriesAPI } from '../services/apiService';
import './Categories.css';

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      setCategories(response.data);
    } catch (err) {
      setError('Error al cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    setFormError('');
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name });
    } else {
      setEditingCategory(null);
      setFormData({ name: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('El nombre es obligatorio');
      return;
    }

    try {
      if (editingCategory) {
        await categoriesAPI.update(editingCategory.id, formData);
      } else {
        await categoriesAPI.create(formData);
      }
      await fetchCategories();
      handleCloseModal();
    } catch (err) {
      setFormError(err.message || 'Error al guardar la categoría');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      try {
        await categoriesAPI.delete(id);
        await fetchCategories();
      } catch (err) {
        alert(err.message || 'Error al eliminar la categoría');
      }
    }
  };

  if (loading) return <div className="loading">Cargando categorías...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h1>Categorías</h1>
        <button className="primary-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => handleOpenModal()}>
          <Plus size={18} /> Nueva Categoría
        </button>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-info">
              <h3>{category.name}</h3>
              <p className="category-id">ID: {category.id}</p>
            </div>
            <div className="category-actions">
              <button 
                className="action-btn edit" 
                onClick={() => handleOpenModal(category)}
                title="Editar"
              >
                <Pencil size={18} />
              </button>
              <button 
                className="action-btn delete" 
                onClick={() => handleDelete(category.id)}
                title="Eliminar"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
            
            {formError && <div className="error-message">{formError}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Electrónica"
                  autoFocus
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  Cancelar
                </button>
                <button type="submit" className="primary-btn">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}