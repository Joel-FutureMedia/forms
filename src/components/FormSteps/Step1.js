import React from 'react';
import './FormStep.css';

function Step1({ formData, updateFormData, onNext, onPrev }) {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (formData.fullName && formData.companyName && formData.email && formData.businessLocation) {
      onNext();
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="form-step">
      <h2 className="step-header">Let's get started</h2>
      <p className="step-subtext">
        We'll use these details to set up your website draft. This takes less than 7 minutes.
      </p>

      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="form-group">
        <label>Company Name *</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="ABC Company"
          required
        />
      </div>

      <div className="form-group">
        <label>Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number (Optional)</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="+264 81 123 4567"
        />
      </div>

      <div className="form-group">
        <label>Business Location *</label>
        <input
          type="text"
          name="businessLocation"
          value={formData.businessLocation}
          onChange={handleChange}
          placeholder="Windhoek, Namibia"
          required
        />
      </div>

      <div className="form-group">
        <label>Referral Code (Optional)</label>
        <input
          type="text"
          name="referralCode"
          value={formData.referralCode || ''}
          onChange={handleChange}
          placeholder="Enter referral code if you have one"
        />
      </div>

      <p className="step-footer-text">Your info stays private and can be changed anytime.</p>

      <div className="step-buttons">
        <button className="btn-secondary" onClick={onPrev}>← Back</button>
        <button className="btn-primary" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  );
}

export default Step1;

