import React from 'react';
import './ProgressBar.css';

function ProgressBar({ currentStep, totalSteps }) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="progress-text">Step {currentStep} of {totalSteps}</p>
    </div>
  );
}

export default ProgressBar;

