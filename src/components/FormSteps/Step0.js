import React from 'react';
import logo from '../../assets/logo.png';
import './Step0.css';

function Step0({ onNext }) {
  return (
    <div className="step0">
      <div className="step0-logo">
        <img src={logo} alt="SimplyFound Logo" />
      </div>
      <h1 className="step0-header">Let's get started</h1>
      <p className="step0-subtext">
        We'll use these details to set up your website draft. This takes less than 7 minutes.
      </p>
      <button className="btn-primary step0-cta" onClick={onNext}>
        Build My Website →
      </button>
    </div>
  );
}

export default Step0;

