import React, { useState, useEffect, useRef } from 'react';
import { getIndustries } from '../../services/api';
import './FormStep.css';

function Step2({ formData, updateFormData, onNext, onPrev }) {
  const [industries, setIndustries] = useState([]);
  const [logoPreview, setLogoPreview] = useState(null);
  const [industryInput, setIndustryInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredIndustries, setFilteredIndustries] = useState([]);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const arrowRef = useRef(null);

  // Fetch industries on mount
  useEffect(() => {
    getIndustries()
      .then(res => {
        // Handle different response structures
        const data = res.data;
        let industriesList = [];
        if (Array.isArray(data)) {
          industriesList = data;
        } else if (data && Array.isArray(data.data)) {
          industriesList = data.data;
        } else if (data && Array.isArray(data.content)) {
          industriesList = data.content;
        } else {
          console.warn('Unexpected industries response format:', data);
          industriesList = [];
        }
        
        // Sort industries alphabetically by industry name
        industriesList.sort((a, b) => {
          const nameA = (a.industry || a.name || '').toLowerCase();
          const nameB = (b.industry || b.name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
        
        setIndustries(industriesList);
        setFilteredIndustries(industriesList);
      })
      .catch(err => {
        console.error('Error fetching industries:', err);
        setIndustries([]);
        setFilteredIndustries([]);
      });
  }, []);

  // Sync input value with formData when industryId or industryName changes
  useEffect(() => {
    if (formData.industryId && industries.length > 0) {
      const selectedIndustry = industries.find(ind => ind.id === Number(formData.industryId));
      if (selectedIndustry) {
        setIndustryInput(selectedIndustry.industry || selectedIndustry.name || '');
      }
    } else if (formData.industryName) {
      setIndustryInput(formData.industryName);
    }
  }, [formData.industryId, formData.industryName, industries]);

  // Update filtered industries when input changes
  useEffect(() => {
    if (industryInput.trim() === '') {
      setFilteredIndustries(industries);
    } else {
      const filtered = industries.filter(industry => {
        const name = (industry.industry || industry.name || '').toLowerCase();
        return name.includes(industryInput.toLowerCase());
      });
      setFilteredIndustries(filtered);
    }
  }, [industryInput, industries]);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target) &&
          arrowRef.current && !arrowRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleIndustryInputChange = (e) => {
    const value = e.target.value;
    setIndustryInput(value);
    setShowDropdown(true);
    
    // Clear industryId when user types
    updateFormData({ 
      industryId: '', 
      industryName: value 
    });
  };

  const handleIndustrySelect = (industry) => {
    setIndustryInput(industry.industry || industry.name || '');
    setShowDropdown(false);
    updateFormData({ 
      industryId: industry.id, 
      industryName: '' 
    });
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    updateFormData({ [e.target.name]: value });
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
        <div className="industry-combobox-wrapper" ref={dropdownRef}>
          <div className="industry-input-container">
            <input
              ref={inputRef}
              type="text"
              name="industryInput"
              value={industryInput}
              onChange={handleIndustryInputChange}
              onFocus={handleInputFocus}
              placeholder="Type or select an industry"
              className="industry-combobox-input"
              autoComplete="off"
            />
            <button
              ref={arrowRef}
              type="button"
              className="industry-dropdown-arrow"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="Toggle dropdown"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={showDropdown ? 'arrow-up' : 'arrow-down'}
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {showDropdown && filteredIndustries.length > 0 && (
            <div className="industry-dropdown">
              {filteredIndustries.map(industry => (
                <div
                  key={industry.id}
                  className="industry-dropdown-item"
                  onClick={() => handleIndustrySelect(industry)}
                >
                  {industry.industry || industry.name || 'Unknown'}
                </div>
              ))}
            </div>
          )}
        </div>
        <small className="industry-helper-text">
          If your industry is not listed, please type in the box, with the specific industry.
        </small>
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

