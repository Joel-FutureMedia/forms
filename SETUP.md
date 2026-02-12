# SimplyForms Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   cd simplyforms
   npm install
   ```

2. **Start the React App**
   ```bash
   npm start
   ```

3. **Access the Application**
   - **Form**: http://localhost:3004
   - **Admin Panel**: http://localhost:3004/admin

**Note**: The app connects to the production backend API at `https://formapi.simplyfound.com.na/api`

## Admin Login

To access the admin panel, you need to:
1. Create a user in the database first (or use existing user)
2. Login with email and password

## Features

### Form Features
- ✅ 7-step multi-step form with progress bar
- ✅ Logo upload
- ✅ Multiple image uploads (up to 10)
- ✅ Dynamic services/products addition
- ✅ Color palette picker
- ✅ Layout style selection
- ✅ Responsive design
- ✅ Form validation

### Admin Panel Features
- ✅ User authentication
- ✅ View all form submissions
- ✅ Download prompt PDF
- ✅ Download logo separately
- ✅ Download images separately
- ✅ CRUD for Users
- ✅ CRUD for Opening Days
- ✅ CRUD for Opening Hours

## API Endpoints Used

- `/api/industries` - Get industries
- `/api/color-palettes/picker` - Get color palettes
- `/api/layout-styles` - Get layout styles
- `/api/opening-days` - Get opening days
- `/api/client-journeys/submit` - Submit form
- `/api/client-journeys` - Get all submissions
- `/api/client-journeys/{id}/download-prompt` - Download PDF
- `/api/client-journeys/logos/view/{fileName}` - View/Download logo
- `/api/client-journeys/images/view/{fileName}` - View/Download image
- `/api/users/login` - Admin login
- `/api/users` - User CRUD
- `/api/opening-days` - Opening Days CRUD
- `/api/opening-hours` - Opening Hours CRUD

## Notes

- The React app runs on port 3004
- The backend API is hosted at `https://formapi.simplyfound.com.na`
- CORS is configured to allow requests from `http://localhost:3004` and `https://forms.simplyfound.com.na`
- All API calls are made to the production backend

