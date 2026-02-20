import React, { useState, useEffect } from 'react';
import { getOpeningDays } from '../../services/api';
import './FormStep.css';

function Step3({ formData, updateFormData, onNext, onPrev }) {
  const [openingDays, setOpeningDays] = useState([]);
  const [showCustomHours, setShowCustomHours] = useState(false);

  useEffect(() => {
    getOpeningDays()
      .then(res => {
        const data = res.data;
        if (Array.isArray(data)) {
          setOpeningDays(data);
        } else if (data && Array.isArray(data.data)) {
          setOpeningDays(data.data);
        } else if (data && Array.isArray(data.content)) {
          setOpeningDays(data.content);
        } else {
          console.warn('Unexpected opening days response format:', data);
          setOpeningDays([]);
        }
      })
      .catch(err => {
        console.error('Error fetching opening days:', err);
        setOpeningDays([]);
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    // Convert openingDaysId to number if it's selected
    if (e.target.name === 'openingDaysId' && value !== '') {
      updateFormData({ [e.target.name]: Number(value) });
      const selected = Array.isArray(openingDays) ? openingDays.find(od => od.id === Number(value)) : null;
      setShowCustomHours(selected && selected.openingDays === 'Custom hours');
    } else {
      updateFormData({ [e.target.name]: value });
    }
  };

  const handleNext = () => {
    if (formData.businessPhone && formData.businessEmail) {
      onNext();
    } else {
      alert('Please fill in business phone and email');
    }
  };

  return (
    <div className="form-step">
      <h2 className="step-header">How can customers reach you?</h2>

      <div className="form-group">
        <label>Business Phone Number *</label>
        <input
          type="text"
          name="businessPhone"
          value={formData.businessPhone}
          onChange={handleChange}
          placeholder="+264 61 123 4567"
          required
        />
      </div>

      <div className="form-group">
        <label>Business Email Address *</label>
        <input
          type="email"
          name="businessEmail"
          value={formData.businessEmail}
          onChange={handleChange}
          placeholder="info@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label>Operating Hours</label>
        <select
          name="openingDaysId"
          value={formData.openingDaysId}
          onChange={handleChange}
        >
          <option value="">Select Opening Days</option>
          {Array.isArray(openingDays) && openingDays.length > 0 ? (
            openingDays.map(day => (
              <option key={day.id} value={day.id}>
                {day.openingDays}
              </option>
            ))
          ) : (
            <option value="" disabled>Loading opening days...</option>
          )}
        </select>
      </div>

      {showCustomHours && (
        <div className="form-group">
          <label>Custom Hours</label>
          <input
            type="text"
            name="customHours"
            value={formData.customHours}
            onChange={handleChange}
            placeholder="9:00 AM - 5:00 PM"
          />
        </div>
      )}

      <p className="step-footer-text">You're doing great — almost halfway!</p>

      <div className="step-buttons">
        <button className="btn-secondary" onClick={onPrev}>← Back</button>
        <button className="btn-primary" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  );
}

export default Step3;

