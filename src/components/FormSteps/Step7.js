import React from 'react';
import './FormStep.css';

function Step7({ formData, updateFormData, onSubmit, onPrev, isSubmitting }) {
  const ctaOptions = ['Call Now', 'WhatsApp Us', 'Get a Quote', 'Book an Appointment', 'Shop Online'];

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const getPlaceholder = () => {
    if (formData.primaryCta === 'Call Now' || formData.primaryCta === 'WhatsApp Us') {
      return '+264 61 123 4567';
    } else if (formData.primaryCta === 'Get a Quote' || formData.primaryCta === 'Book an Appointment') {
      return 'https://example.com/quote';
    } else {
      return 'https://example.com/shop';
    }
  };

  return (
    <div className="form-step">
      <h2 className="step-header">Choose the main action you want customers to take</h2>

      <div className="form-group">
        <label>Primary Call-to-Action *</label>
        <select
          name="primaryCta"
          value={formData.primaryCta}
          onChange={handleChange}
          required
        >
          {ctaOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>CTA Link or Phone Number *</label>
        <input
          type="text"
          name="ctaLinkOrPhone"
          value={formData.ctaLinkOrPhone}
          onChange={handleChange}
          placeholder={getPlaceholder()}
          required
        />
      </div>

      <div className="form-group">
        <label>Secondary Action (Optional)</label>
        <input
          type="text"
          name="secondaryAction"
          value={formData.secondaryAction}
          onChange={handleChange}
          placeholder="Get a Quote"
        />
      </div>

      <p className="step-footer-text">Final step — you're almost done!</p>

      <p className="privacy-notice">
        Your information is kept private and protected under our Privacy Policy.
      </p>

      <div className="step-buttons">
        <button className="btn-secondary" onClick={onPrev} disabled={isSubmitting}>← Back</button>
        <button className="btn-primary btn-submit" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="loading-spinner"></span>
              Processing...
            </>
          ) : (
            'Submit & Generate Website Draft →'
          )}
        </button>
      </div>
    </div>
  );
}

export default Step7;

