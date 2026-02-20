import React, { useState } from 'react';
import Step0 from './FormSteps/Step0';
import Step1 from './FormSteps/Step1';
import Step2 from './FormSteps/Step2';
import Step3 from './FormSteps/Step3';
import Step4 from './FormSteps/Step4';
import Step5 from './FormSteps/Step5';
import Step6 from './FormSteps/Step6';
import Step7 from './FormSteps/Step7';
import Confirmation from './FormSteps/Confirmation';
import ProgressBar from './ProgressBar';
import { submitForm } from '../services/api';
import logo from '../assets/logo.png';
import './FormPage.css';

function FormPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    businessLocation: '',
    referralCode: '',
    // Step 2
    aboutInformation: '',
    industryId: '',
    industryName: '',
    logoFile: null,
    // Step 3
    businessPhone: '',
    businessEmail: '',
    openingDaysId: '',
    customHours: '',
    // Step 4
    services: [{ name: '', description: '' }],
    // Step 5
    primaryColor: '',
    secondaryColor: '',
    layoutStyleId: '',
    imageFiles: [],
    designInspiration: '',
    descriptionOfWhatTheyWant: '',
    // Step 6
    facebookUrl: '',
    instagramUrl: '',
    googleBusinessUrl: '',
    tiktokUrl: '',
    testimonials: '',
    // Step 7
    primaryCta: 'Call Now',
    ctaLinkOrPhone: '',
    secondaryAction: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields before submission
      if (!formData.fullName || !formData.companyName || !formData.email || !formData.businessLocation) {
        alert('Please fill in all required fields in Step 1.');
        return;
      }
      if (!formData.aboutInformation) {
        alert('Please fill in what your business does in Step 2.');
        return;
      }
      if (!formData.businessPhone || !formData.businessEmail) {
        alert('Please fill in business phone and email in Step 3.');
        return;
      }
      if (!formData.primaryCta || !formData.ctaLinkOrPhone) {
        alert('Please fill in all required fields in Step 7.');
        return;
      }
      
      // Set loading state
      setIsSubmitting(true);
      
      // Prepare clean form data (convert empty strings to null for optional Long fields)
      const cleanFormData = {
        ...formData,
        industryId: formData.industryId && formData.industryId !== '' ? Number(formData.industryId) : null,
        openingDaysId: formData.openingDaysId && formData.openingDaysId !== '' ? Number(formData.openingDaysId) : null,
        colorPaletteId: formData.colorPaletteId && formData.colorPaletteId !== '' ? Number(formData.colorPaletteId) : null,
        layoutStyleId: formData.layoutStyleId && formData.layoutStyleId !== '' ? Number(formData.layoutStyleId) : null,
      };
      
      await submitForm(cleanFormData);
      setCurrentStep(8);
    } catch (error) {
      console.error('Form submission error:', error);
      let errorMessage = 'Error submitting form. Please try again.';
      
      if (error.response) {
        // Server responded with error
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 500) {
          errorMessage = 'Server error occurred. Please check all fields are filled correctly and try again.';
          if (data && typeof data === 'string') {
            errorMessage = `Server error: ${data}`;
          } else if (data && data.message) {
            errorMessage = `Server error: ${data.message}`;
          }
        } else if (status === 400) {
          errorMessage = 'Invalid data. Please check all required fields are filled.';
        } else if (data && data.message) {
          errorMessage = `Error: ${data.message}`;
        }
      } else if (error.request) {
        // Request made but no response
        errorMessage = 'No response from server. Please check your internet connection and try again.';
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step0 onNext={nextStep} />;
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 2:
        return <Step2 formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <Step3 formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <Step4 formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <Step5 formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 6:
        return <Step6 formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 7:
        return <Step7 formData={formData} updateFormData={updateFormData} onSubmit={handleSubmit} onPrev={prevStep} isSubmitting={isSubmitting} />;
      case 8:
        return <Confirmation formData={formData} />;
      default:
        return <Step0 onNext={nextStep} />;
    }
  };

  return (
    <div className={`form-page ${isSubmitting ? 'submitting' : ''}`}>
      {isSubmitting && (
        <div className="submission-overlay">
          <div className="submission-loading-content">
            <div className="submission-spinner"></div>
            <h3>Submitting Your Form</h3>
            <p>Please wait while we process your request...</p>
            <p className="submission-hint">This may take a few moments</p>
          </div>
        </div>
      )}
      <div className="form-container">
        {currentStep > 0 && currentStep < 8 && (
          <>
            <div className="form-logo-header">
              <img src={logo} alt="SimplyFound Logo" className="form-top-logo" />
            </div>
            <ProgressBar currentStep={currentStep} totalSteps={7} />
          </>
        )}
        {renderStep()}
      </div>
    </div>
  );
}

export default FormPage;

