import React from 'react';
import './FormStep.css';

function Step4({ formData, updateFormData, onNext, onPrev }) {
  const addService = () => {
    const newServices = [...formData.services, { name: '', description: '' }];
    updateFormData({ services: newServices });
  };

  const removeService = (index) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    updateFormData({ services: newServices });
  };

  const updateService = (index, field, value) => {
    const newServices = [...formData.services];
    newServices[index][field] = value;
    updateFormData({ services: newServices });
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="form-step">
      <h2 className="step-header">What do you offer?</h2>
      <p className="step-subtext">
        List your main products or services. We'll turn this into clean website sections for you.
      </p>

      {formData.services.map((service, index) => (
        <div key={index} className="service-block">
          <div className="service-header">
            <h3>Service/Product {index + 1}</h3>
            {formData.services.length > 1 && (
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeService(index)}
              >
                Remove
              </button>
            )}
          </div>

          <div className="form-group">
            <label>Service/Product Name</label>
            <input
              type="text"
              value={service.name}
              onChange={(e) => updateService(index, 'name', e.target.value)}
              placeholder="House Painting"
            />
          </div>

          <div className="form-group">
            <label>One-line description</label>
            <input
              type="text"
              value={service.description}
              onChange={(e) => updateService(index, 'description', e.target.value)}
              placeholder="Interior and exterior painting."
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn-add-service"
        onClick={addService}
      >
        + Add Another Service
      </button>

      <p className="step-footer-text">
        Don't worry about being perfect — you can update these anytime.
      </p>

      <div className="step-buttons">
        <button className="btn-secondary" onClick={onPrev}>← Back</button>
        <button className="btn-primary" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  );
}

export default Step4;

