import React from 'react';
import './Confirmation.css';

function Confirmation({ formData }) {
  return (
    <div className="confirmation">
      <div className="confirmation-icon">🎉</div>
      <h1 className="confirmation-header">
        Thank you! Your website draft is being prepared by our engineers.
      </h1>
      <p className="confirmation-text">
        Our team will now generate your first version and send it to you for review. 
        Thereafter we will schedule a meeting with you to finalise your website. 
        Your site will not go live without your approval.
      </p>
      <p className="confirmation-email">
        A confirmation email has been sent to: <strong>{formData.email}</strong>
      </p>
    </div>
  );
}

export default Confirmation;

