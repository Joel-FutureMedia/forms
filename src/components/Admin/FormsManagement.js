import React, { useState, useEffect } from 'react';
import { getClientJourneys, downloadPromptPdf, downloadLogo, downloadImage } from '../../services/api';
import './FormsManagement.css';

function FormsManagement() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async (retryCount = 0) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getClientJourneys();
      console.log('Forms response:', response);
      console.log('Forms data:', response.data);
      
      const formsData = response.data || [];
      console.log('Setting forms:', formsData);
      setForms(formsData);
      setError(null);
    } catch (error) {
      console.error('Error loading forms:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        response: error.response,
        stack: error.stack
      });
      
      // Retry logic for network errors
      if (retryCount < 2 && (error.code === 'ERR_NETWORK' || error.message.includes('ERR_INCOMPLETE') || error.message.includes('chunked'))) {
        console.log(`Retrying... Attempt ${retryCount + 1}`);
        setTimeout(() => loadForms(retryCount + 1), 2000);
        return;
      }
      
      // Set error message
      if (error.code === 'ERR_NETWORK' || error.message.includes('ERR_INCOMPLETE') || error.message.includes('chunked')) {
        setError('Connection error. Please check your internet connection and try again.');
      } else if (error.response) {
        setError(`Server error: ${error.response.status} - ${error.response.statusText}. Check console for details.`);
      } else {
        setError('Error loading forms. Please try again. Check console for details.');
      }
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPrompt = async (id) => {
    try {
      const response = await downloadPromptPdf(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `website-prompt-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading prompt:', error);
      alert('Error downloading prompt file');
    }
  };

  const handleDownloadLogo = async (fileName) => {
    if (!fileName) {
      alert('No logo available');
      return;
    }
    try {
      const response = await downloadLogo(fileName);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading logo:', error);
      alert('Error downloading logo');
    }
  };

  const handleDownloadImage = async (fileName) => {
    try {
      const response = await downloadImage(fileName);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Error downloading image');
    }
  };


  return (
    <div className="forms-management">
      <div className="page-header">
        <div>
          <h1>Form Submissions</h1>
          <p>View and manage all submitted forms</p>
        </div>
        <button className="btn-refresh" onClick={() => loadForms()} title="Refresh">
          🔄 Refresh
        </button>
      </div>

      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={() => loadForms()}>Try Again</button>
        </div>
      )}

      {loading && !error ? (
        <div className="loading">Loading forms...</div>
      ) : forms.length === 0 && !error ? (
        <div className="empty-state">
          <p>No forms submitted yet.</p>
          <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
            Forms will appear here once clients submit the form.
          </p>
        </div>
      ) : (
        <div className="forms-grid">
          {forms.map((form, index) => (
            <div key={form.id || index} className="form-card">
              <div className="form-card-header">
                <h3>{form.companyName}</h3>
                <span className="form-date">
                  {new Date(form.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="form-card-body">
                <p><strong>Client:</strong> {form.fullName || 'N/A'}</p>
                <p><strong>Email:</strong> {form.email || 'N/A'}</p>
                <p><strong>Location:</strong> {form.businessLocation || 'N/A'}</p>
                {form.industry && (
                  <p><strong>Industry:</strong> {form.industry.industry || 'N/A'}</p>
                )}
                {form.servicesOrProducts && Array.isArray(form.servicesOrProducts) && form.servicesOrProducts.length > 0 && (
                  <p><strong>Services/Products:</strong> {form.servicesOrProducts.length}</p>
                )}
                {form.optionalImages && Array.isArray(form.optionalImages) && form.optionalImages.length > 0 && (
                  <p><strong>Images:</strong> {form.optionalImages.length}</p>
                )}
                {form.colorPalette && (
                  <p><strong>Color Palette:</strong> {form.colorPalette.name || 'N/A'}</p>
                )}
              </div>

              <div className="form-card-actions">
                <button
                  className="btn-download btn-primary"
                  onClick={() => handleDownloadPrompt(form.id)}
                >
                  📄 Download Prompt PDF
                </button>
                
                {form.logoFileName && (
                  <button
                    className="btn-download btn-secondary"
                    onClick={() => handleDownloadLogo(form.logoFileName)}
                  >
                    🖼️ Download Logo
                  </button>
                )}

                {form.optionalImages && Array.isArray(form.optionalImages) && form.optionalImages.length > 0 && (
                  <div className="images-section">
                    <p className="images-label">Download Images:</p>
                    <div className="images-list">
                      {form.optionalImages.map((image, index) => (
                        <button
                          key={image.id || index}
                          className="btn-download btn-image"
                          onClick={() => handleDownloadImage(image.fileName)}
                        >
                          Image {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FormsManagement;

