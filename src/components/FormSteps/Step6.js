import React from 'react';
import './FormStep.css';

function Step6({ formData, updateFormData, onNext, onPrev }) {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="form-step">
      <h2 className="step-header">Help us build trust on your website</h2>

      <div className="form-section">
        <h3>A. Social Links</h3>
        <div className="form-group">
          <label>Facebook Page URL (Optional)</label>
          <input
            type="url"
            name="facebookUrl"
            value={formData.facebookUrl}
            onChange={handleChange}
            placeholder="facebook.com/yourbusiness"
          />
        </div>

        <div className="form-group">
          <label>Instagram URL (Optional)</label>
          <input
            type="url"
            name="instagramUrl"
            value={formData.instagramUrl}
            onChange={handleChange}
            placeholder="instagram.com/yourbusiness"
          />
        </div>

        <div className="form-group">
          <label>Google Business Profile URL (Optional)</label>
          <input
            type="url"
            name="googleBusinessUrl"
            value={formData.googleBusinessUrl}
            onChange={handleChange}
            placeholder="g.page/yourbusiness"
          />
        </div>

        <div className="form-group">
          <label>TikTok URL (Optional)</label>
          <input
            type="url"
            name="tiktokUrl"
            value={formData.tiktokUrl}
            onChange={handleChange}
            placeholder="tiktok.com/@yourbusiness"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>B. Testimonials</h3>
        <div className="form-group">
          <label>Testimonials (Optional)</label>
          <textarea
            name="testimonials"
            value={formData.testimonials}
            onChange={handleChange}
            placeholder="Paste any reviews you'd like us to use. Or leave this blank."
            rows="5"
          />
        </div>
      </div>

      <p className="step-footer-text">All links remain private and secure.</p>

      <div className="step-buttons">
        <button className="btn-secondary" onClick={onPrev}>← Back</button>
        <button className="btn-primary" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  );
}

export default Step6;

