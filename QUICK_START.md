# Quick Start Guide

## The Problem
You're getting a `binary-extensions` module not found error. This is likely due to:
1. Node.js v22.x compatibility issues with react-scripts 5.0.1
2. Corrupted node_modules

## Quick Fix (Choose One)

### Method 1: Use Command Prompt (Recommended)
1. Open **Command Prompt** (cmd.exe) - NOT PowerShell
2. Run:
   ```cmd
   cd C:\simplyfoundform\simplyfound\simplyforms
   rmdir /s /q node_modules
   del package-lock.json
   npm install --legacy-peer-deps
   npm start
   ```

### Method 2: Double-click the batch file
Just double-click `install-and-start.bat` in the simplyforms folder.

### Method 3: Downgrade Node.js (Best long-term solution)
Node.js v22 is very new. react-scripts 5.0.1 works better with Node.js 18.x:

1. Install Node.js 18.x LTS from https://nodejs.org/
2. Or use nvm-windows to switch versions:
   ```cmd
   nvm install 18.20.0
   nvm use 18.20.0
   ```
3. Then run `npm install --legacy-peer-deps` and `npm start`

## After Installation

Once installed, the app will start on: **http://localhost:3004**

Admin panel: **http://localhost:3004/admin**

The app connects to the backend API at: **https://formapi.simplyfound.com.na/api**

