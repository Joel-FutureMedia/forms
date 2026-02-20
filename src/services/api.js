import axios from 'axios';

const API_BASE_URL = 'https://clientform.simplyfound.com.na/api';
//const API_BASE_URL = 'http://localhost:8383/api';
//
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds timeout
  timeoutErrorMessage: 'Request timeout. Please try again.',
});


// 
// Reference Data APIs
export const getIndustries = () => api.get('/industries');
export const getColorPalettes = () => api.get('/color-palettes/picker');
export const getLayoutStyles = () => api.get('/layout-styles');
export const getOpeningDays = () => api.get('/opening-days');
export const getOpeningHours = () => api.get('/opening-hours');

// Form Submission
export const submitForm = (formData) => {
  const data = new FormData();

  // Step 1
  data.append('fullName', formData.fullName);
  data.append('companyName', formData.companyName);
  data.append('email', formData.email);
  if (formData.phoneNumber) data.append('phoneNumber', formData.phoneNumber);
  data.append('businessLocation', formData.businessLocation);
  if (formData.referralCode) data.append('referralCode', formData.referralCode);

  // Step 2
  data.append('aboutInformation', formData.aboutInformation || '');
  // Send industryId if selected from dropdown, otherwise send industryName if typed
  if (formData.industryId && formData.industryId !== '' && formData.industryId !== null && !isNaN(formData.industryId)) {
    data.append('industryId', formData.industryId);
  } else if (formData.industryName && formData.industryName.trim() !== '') {
    data.append('industryName', formData.industryName.trim());
  }
  if (formData.logoFile) data.append('logoFile', formData.logoFile);

  // Step 3
  data.append('businessPhone', formData.businessPhone || '');
  data.append('businessEmail', formData.businessEmail || '');
  // Only send openingDaysId if it's a valid number (not empty string or null)
  if (formData.openingDaysId && formData.openingDaysId !== '' && formData.openingDaysId !== null && !isNaN(formData.openingDaysId)) {
    data.append('openingDaysId', formData.openingDaysId);
  }
  if (formData.customHours) data.append('customHours', formData.customHours);

  // Step 4 - Services
  if (formData.services && formData.services.length > 0) {
    formData.services.forEach(service => {
      if (service.name && service.name.trim()) {
        data.append('serviceNames', service.name);
        data.append('serviceDescriptions', service.description || '');
      }
    });
  }

  // Step 5
  // Send color codes (hex codes like #000000)
  if (formData.primaryColor) {
    data.append('primaryColor', formData.primaryColor);
  }
  if (formData.secondaryColor) {
    data.append('secondaryColor', formData.secondaryColor);
  }
  // Only send layoutStyleId if it's a valid number (not empty string or null)
  if (formData.layoutStyleId && formData.layoutStyleId !== '' && formData.layoutStyleId !== null && !isNaN(formData.layoutStyleId)) {
    data.append('layoutStyleId', formData.layoutStyleId);
  }
  if (formData.imageFiles && formData.imageFiles.length > 0) {
    formData.imageFiles.forEach(file => {
      data.append('imageFiles', file);
    });
  }
  if (formData.designInspiration) data.append('designInspiration', formData.designInspiration);
  if (formData.descriptionOfWhatTheyWant) data.append('descriptionOfWhatTheyWant', formData.descriptionOfWhatTheyWant);

  // Step 6
  if (formData.facebookUrl) data.append('facebookUrl', formData.facebookUrl);
  if (formData.instagramUrl) data.append('instagramUrl', formData.instagramUrl);
  if (formData.googleBusinessUrl) data.append('googleBusinessUrl', formData.googleBusinessUrl);
  if (formData.tiktokUrl) data.append('tiktokUrl', formData.tiktokUrl);
  if (formData.testimonials) data.append('testimonials', formData.testimonials);

  // Step 7
  data.append('primaryCta', formData.primaryCta);
  data.append('ctaLinkOrPhone', formData.ctaLinkOrPhone);
  if (formData.secondaryAction) data.append('secondaryAction', formData.secondaryAction);

  return api.post('/client-journeys/submit', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Admin APIs
export const adminLogin = (email, password) => {
  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('password', password);
  return api.post('/users/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const getUsers = () => api.get('/users');
export const createUser = (user) => api.post('/users', user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export const getOpeningDaysList = () => api.get('/opening-days');
export const createOpeningDays = (data) => api.post('/opening-days', data);
export const updateOpeningDays = (id, data) => api.put(`/opening-days/${id}`, data);
export const deleteOpeningDays = (id) => api.delete(`/opening-days/${id}`);

export const getOpeningHoursList = () => api.get('/opening-hours');
export const createOpeningHours = (data) => api.post('/opening-hours', data);
export const updateOpeningHours = (id, data) => api.put(`/opening-hours/${id}`, data);
export const deleteOpeningHours = (id) => api.delete(`/opening-hours/${id}`);

export const getClientJourneys = () => api.get('/client-journeys');
export const getClientJourney = (id) => api.get(`/client-journeys/${id}`);
export const downloadPromptPdf = (id) =>
  api.get(`/client-journeys/${id}/download-prompt`, { responseType: 'blob' });
export const downloadLogo = (fileName) =>
  api.get(`/client-journeys/logos/view/${fileName}`, { responseType: 'blob' });
export const downloadImage = (fileName) =>
  api.get(`/client-journeys/images/view/${fileName}`, { responseType: 'blob' });

export default api;

