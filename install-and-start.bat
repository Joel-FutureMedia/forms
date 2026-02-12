@echo off
echo ========================================
echo SimplyForms Installation Script
echo ========================================
echo.

echo Step 1: Cleaning old dependencies...
if exist node_modules (
    echo Removing node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    echo Removing package-lock.json...
    del /f package-lock.json
)
echo Clean complete!
echo.

echo Step 2: Installing dependencies (this may take a few minutes)...
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo.
    echo ERROR: Installation failed. Trying alternative method...
    call npm install
    if errorlevel 1 (
        echo.
        echo Installation failed. Please check your Node.js version.
        echo Recommended: Node.js 18.x LTS
        pause
        exit /b 1
    )
)
echo.

echo Step 3: Installing missing dependencies...
call npm install commondir --save
echo.

echo ========================================
echo Installation complete!
echo ========================================
echo.
echo Starting the app...
echo The app will open at http://localhost:3004
echo.
call npm start

