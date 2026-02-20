# SimplyForms - React Frontend

This is the React frontend application for SimplyFound website builder.

## Features

- **Multi-step Form**: 7-step form for collecting client information
- **Progress Bar**: Visual progress indicator
- **Admin Panel**: Full admin dashboard with CRUD operations
- **Responsive Design**: Works on all screen sizes

## Installation

1. Navigate to the project directory:
```bash
cd simplyforms
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3004`

## Admin Access

Access the admin panel at: `http://localhost:3004/admin`

## API Configuration

The app is configured to connect to the backend API at `https://formapi.simplyfound.com.na/api`

The backend API is hosted at `https://formapi.simplyfound.com.na`

## Project Structure

```
simplyforms/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── AdminLogin.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── FormsManagement.js
│   │   │   ├── UsersManagement.js
│   │   │   ├── OpeningDaysManagement.js
│   │   │   └── OpeningHoursManagement.js
│   │   ├── FormSteps/
│   │   │   ├── Step0.js through Step7.js
│   │   │   └── Confirmation.js
│   │   ├── FormPage.js
│   │   └── ProgressBar.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner

