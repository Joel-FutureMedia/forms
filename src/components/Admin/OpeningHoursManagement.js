import React, { useState, useEffect } from 'react';
import { getOpeningHoursList, createOpeningHours, updateOpeningHours, deleteOpeningHours } from '../../services/api';
import './CRUDManagement.css';

function OpeningHoursManagement() {
  const [openingHours, setOpeningHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    hours: ''
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await getOpeningHoursList();
      setOpeningHours(response.data);
    } catch (error) {
      console.error('Error loading opening hours:', error);
      alert('Error loading opening hours');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        hours: item.hours || ''
      });
    } else {
      setEditingItem(null);
      setFormData({
        hours: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      hours: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateOpeningHours(editingItem.id, formData);
      } else {
        await createOpeningHours(formData);
      }
      handleCloseModal();
      loadItems();
    } catch (error) {
      console.error('Error saving opening hours:', error);
      alert('Error saving opening hours');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteOpeningHours(id);
        loadItems();
      } catch (error) {
        console.error('Error deleting opening hours:', error);
        alert('Error deleting opening hours');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading opening hours...</div>;
  }

  return (
    <div className="crud-management">
      <div className="page-header">
        <h1>Opening Hours Management</h1>
        <button className="btn-add" onClick={() => handleOpenModal()}>
          + Add New
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {openingHours.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.hours}</td>
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
            <h2>{editingItem ? 'Edit Opening Hours' : 'Add New Opening Hours'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Hours</label>
                <input
                  type="text"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  placeholder="e.g., 9:00 AM - 5:00 PM"
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

export default OpeningHoursManagement;

