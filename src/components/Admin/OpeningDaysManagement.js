import React, { useState, useEffect } from 'react';
import { getOpeningDaysList, createOpeningDays, updateOpeningDays, deleteOpeningDays } from '../../services/api';
import './CRUDManagement.css';

function OpeningDaysManagement() {
  const [openingDays, setOpeningDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    openingDays: ''
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await getOpeningDaysList();
      setOpeningDays(response.data);
    } catch (error) {
      console.error('Error loading opening days:', error);
      alert('Error loading opening days');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        openingDays: item.openingDays || ''
      });
    } else {
      setEditingItem(null);
      setFormData({
        openingDays: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      openingDays: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateOpeningDays(editingItem.id, formData);
      } else {
        await createOpeningDays(formData);
      }
      handleCloseModal();
      loadItems();
    } catch (error) {
      console.error('Error saving opening days:', error);
      alert('Error saving opening days');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteOpeningDays(id);
        loadItems();
      } catch (error) {
        console.error('Error deleting opening days:', error);
        alert('Error deleting opening days');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading opening days...</div>;
  }

  return (
    <div className="crud-management">
      <div className="page-header">
        <h1>Opening Days Management</h1>
        <button className="btn-add" onClick={() => handleOpenModal()}>
          + Add New
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Opening Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {openingDays.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.openingDays}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleOpenModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingItem ? 'Edit Opening Days' : 'Add New Opening Days'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Opening Days</label>
                <input
                  type="text"
                  value={formData.openingDays}
                  onChange={(e) => setFormData({ ...formData, openingDays: e.target.value })}
                  placeholder="e.g., Mon - Fri"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OpeningDaysManagement;

