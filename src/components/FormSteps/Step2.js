import React, { useState, useEffect } from 'react';
import { getIndustries } from '../../services/api';
import './FormStep.css';

function Step2({ formData, updateFormData, onNext, onPrev }) {
  const [industries, setIndustries] = useState([]);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    getIndustries()
      .then(res => {
        // Handle different response structures
        const data = res.data;
        // If data is an array, use it directly
        // If data is an object with a data property, use that
        // Otherwise, default to empty array
        if (Array.isArray(data)) {
          setIndustries(data);
        } else if (data && Array.isArray(data.data)) {
          setIndustries(data.data);
        } else if (data && Array.isArray(data.content)) {
          setIndustries(data.content);
        } else {
          console.warn('Unexpected industries response format:', data);
          setIndustries([]);
        }
      })
      .catch(err => {
        console.error('Error fetching industries:', err);
        setIndustries([]); // Set empty array on error
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    // Convert industryId to number if it's selected
    if (e.target.name === 'industryId' && value !== '') {
      updateFormData({ [e.target.name]: Number(value) });
    } else {
      updateFormData({ [e.target.name]: value });
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateFormData({ logoFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (formData.aboutInformation) {
      onNext();
    } else {
      alert('Please fill in what your business does');
    }
  };

  return (
    <div className="form-step">
      <h2 className="step-header">Tell us about your business</h2>
      <p className="step-subtext">
        This helps us shape the tone and focus of your website.
      </p>

      <div className="form-group">
        <label>What does your business do? *</label>
        <input
          type="text"
          name="aboutInformation"
          value={formData.aboutInformation}
          onChange={handleChange}
          placeholder="Example: We provide plumbing services in Windhoek."
          required
        />
      </div>

      <div className="form-group">
        <label>Industry</label>
        <select
          name="industryId"
          value={formData.industryId || ''}
          onChange={handleChange}
        >
          <option value="">Select Industry</option>
          {Array.isArray(industries) && industries.length > 0 ? (
            industries.map(industry => (
              <option key={industry.id} value={industry.id}>
                {industry.industry || industry.name || 'Unknown'}
              </option>
            ))
          ) : (
            <option value="" disabled>Loading industries...</option>
          )}
        </select>
      </div>

      <div className="form-group">
        <label>Upload your logo</label>
        <div className="file-upload-area">
          <input
            type="file"
            id="logo-upload"
            accept="image/*"
            onChange={handleLogoChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="logo-upload" className="file-upload-label">
            {logoPreview ? (
              <img src={logoPreview} alt="Logo preview" className="logo-preview" />
            ) : (
              <div className="file-upload-placeholder">
                <span>📎</span>
                <p>Click to upload logo</p>
                <small>You can skip this.</small>
              </div>
            )}
          </label>
        </div>
      </div>

      <p className="step-footer-text">
        All information shared in this process can be revised or changed before going live.
      </p>

      <div className="step-buttons">
        <button className="btn-secondary" onClick={onPrev}>← Back</button>
        <button className="btn-primary" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  );
}

export default Step2;

