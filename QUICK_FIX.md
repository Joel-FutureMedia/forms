# Quick Fix for Startup Error

The error you're seeing is a known issue with react-scripts 5.0.1 and webpack-dev-server.

## Solution 1: Create .env file (Recommended)

Create a file named `.env` in the `simplyforms` folder with this content:

```
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

Then run:
```bash
npm start
```

## Solution 2: Use the updated start script

The package.json has been updated. Try:

```bash
npm start
```

If that doesn't work on Windows, you may need to manually create the `.env` file as described in Solution 1.

## Solution 3: Clean install

If the above doesn't work:

```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Start
npm start
```

## Solution 4: Use a different Node.js version

This issue sometimes occurs with certain Node.js versions. Try using Node.js 16.x or 18.x LTS.

