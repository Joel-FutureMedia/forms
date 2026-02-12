import React, { useState } from 'react';
import { getLayoutStyles } from '../../services/api';
import './FormStep.css';

function Step5({ formData, updateFormData, onNext, onPrev }) {
  const [layoutStyles, setLayoutStyles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Predefined color options for primary and secondary colors
  const primaryColors = [
    '#000000', '#1a1a1a', '#333333', '#4a4a4a', '#666666',
    '#0066cc', '#0052cc', '#003d99', '#1e40af', '#2563eb',
    '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#ef4444',
    '#059669', '#047857', '#065f46', '#064e3b', '#10b981',
    '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#8b5cf6',
    '#ea580c', '#c2410c', '#9a3412', '#7c2d12', '#f97316'
  ];

  const secondaryColors = [
    '#ffffff', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3',
    '#e0f2fe', '#bae6fd', '#93c5fd', '#60a5fa', '#3b82f6',
    '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444',
    '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981',
    '#f3e8ff', '#e9d5ff', '#ddd6fe', '#c4b5fd', '#a78bfa',
    '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c',
    '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b'
  ];

  React.useEffect(() => {
    const fetchLayoutStyles = async () => {
      try {
        const stylesRes = await getLayoutStyles();
        const stylesData = stylesRes.data;
        if (Array.isArray(stylesData)) {
          setLayoutStyles(stylesData);
        } else if (stylesData && Array.isArray(stylesData.data)) {
          setLayoutStyles(stylesData.data);
        } else if (stylesData && Array.isArray(stylesData.content)) {
          setLayoutStyles(stylesData.content);
        } else {
          console.warn('Unexpected layout styles response format:', stylesData);
          setLayoutStyles([]);
        }
      } catch (err) {
        console.error('Error fetching layout styles:', err);
        setLayoutStyles([]);
      }
    };
    
    fetchLayoutStyles();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    updateFormData({ imageFiles: files });
    
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleColorSelect = (colorType, colorCode) => {
    if (colorType === 'primary') {
      updateFormData({ primaryColor: colorCode });
    } else {
      updateFormData({ secondaryColor: colorCode });
    }
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="form-step">
      <h2 className="step-header">Choose your website's look</h2>
      <p className="step-subtext">
        Select colors and layout style for your website.
      </p>

      {/* Primary Color Selection */}
      <div className="form-section">
        <h3>A. Primary Color *</h3>
        <p className="section-hint">Select the main color for your website</p>
        <div className="color-picker-grid">
          {primaryColors.map((color, index) => (
            <div
              key={`primary-${index}`}
              className={`color-swatch ${formData.primaryColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect('primary', color)}
              title={color}
            >
              {formData.primaryColor === color && (
                <span className="checkmark">✓</span>
              )}
            </div>
          ))}
        </div>
        {formData.primaryColor && (
          <p className="selection-feedback">
            ✓ Primary color selected: <strong>{formData.primaryColor}</strong>
          </p>
        )}
      </div>

      {/* Secondary Color Selection */}
      <div className="form-section">
        <h3>B. Secondary Color *</h3>
        <p className="section-hint">Select a complementary color for your website</p>
        <div className="color-picker-grid">
          {secondaryColors.map((color, index) => (
            <div
              key={`secondary-${index}`}
              className={`color-swatch ${formData.secondaryColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect('secondary', color)}
              title={color}
            >
              {formData.secondaryColor === color && (
                <span className="checkmark">✓</span>
              )}
            </div>
          ))}
        </div>
        {formData.secondaryColor && (
          <p className="selection-feedback">
            ✓ Secondary color selected: <strong>{formData.secondaryColor}</strong>
          </p>
        )}
      </div>

      {/* Layout Style */}
      <div className="form-section">
        <h3>C. Layout Style</h3>
        {layoutStyles.length === 0 ? (
          <p className="loading-text">Loading layout styles...</p>
        ) : (
          <div className="layout-style-grid">
            {layoutStyles.map(style => (
              <div
                key={style.id}
                className={`layout-style-card ${formData.layoutStyleId === style.id ? 'selected' : ''}`}
                onClick={() => updateFormData({ layoutStyleId: Number(style.id) })}
              >
                <h4>{style.style}</h4>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Optional Image Uploads */}
      <div className="form-section">
        <h3>D. Optional Image Uploads</h3>
        <div className="file-upload-area">
          <input
            type="file"
            id="images-upload"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="images-upload" className="file-upload-label">
            <div className="file-upload-placeholder">
              <span>📷</span>
              <p>Upload Photos (drag & drop)</p>
              <small>Add up to 10 photos (optional).</small>
            </div>
          </label>
        </div>
        
        {imagePreviews.length > 0 && (
          <div className="image-previews">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="image-preview">
                <img src={preview} alt={`Preview ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Design Inspiration */}
      <div className="form-section">
        <h3>E. Design Inspiration (Optional)</h3>
        <p className="section-hint">Share any existing websites or design inspiration you'd like us to reference</p>
        <div className="form-group">
          <label>Design Inspiration</label>
          <textarea
            rows="4"
            placeholder="e.g., I like the layout of example.com or I want a design similar to..."
            value={formData.designInspiration || ''}
            onChange={(e) => updateFormData({ designInspiration: e.target.value })}
          />
        </div>
      </div>

      {/* Description of What They Want */}
      <div className="form-section">
        <h3>F. Description of What Exactly You Want (Optional)</h3>
        <p className="section-hint">Tell us in detail what exactly you want for your website</p>
        <div className="form-group">
          <label>Description of What You Want</label>
          <textarea
            rows="4"
            placeholder="e.g., I want a modern, clean design with a focus on showcasing my products..."
            value={formData.descriptionOfWhatTheyWant || ''}
            onChange={(e) => updateFormData({ descriptionOfWhatTheyWant: e.target.value })}
          />
        </div>
      </div>

      <p className="step-footer-text">You're nearly done!</p>

      <div className="step-buttons">
        <button className="btn-secondary" onClick={onPrev}>← Back</button>
        <button className="btn-primary" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  );
}

export default Step5;
