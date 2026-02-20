# Simple Fix for Missing Modules

## Quick Fix (Run this in Command Prompt)

```cmd
cd C:\simplyfoundform\simplyfound\simplyforms
npm install commondir --save
npm start
```

That's it! This should fix the `commondir` error.

## If that doesn't work, run the full fix:

```cmd
cd C:\simplyfoundform\simplyfound\simplyforms
npm install commondir binary-extensions --save
npm start
```

## Or use the batch file:

Double-click `fix-dependencies.bat` then run `npm start`

## Still having issues?

1. Delete node_modules and reinstall:
   ```cmd
   rmdir /s /q node_modules
   del package-lock.json
   npm install --legacy-peer-deps
   npm install commondir --save
   npm start
   ```

2. Make sure you're using Node.js 18.x (not 22.x):
   ```cmd
   node --version
   ```
   Should show v18.x.x

