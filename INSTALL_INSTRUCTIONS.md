# Installation Instructions

Due to PowerShell execution policy restrictions, please follow these steps:

## Option 1: Run the batch file (Easiest)

Double-click `install-and-start.bat` in the `simplyforms` folder.

## Option 2: Manual installation using Command Prompt (cmd)

1. Open **Command Prompt** (cmd) as Administrator (not PowerShell)
2. Navigate to the project:
   ```
   cd C:\simplyfoundform\simplyfound\simplyforms
   ```

3. Clean old dependencies:
   ```
   rmdir /s /q node_modules
   del package-lock.json
   ```

4. Install dependencies:
   ```
   npm install --legacy-peer-deps
   ```

5. Start the app:
   ```
   npm start
   ```

## Option 3: Fix PowerShell execution policy (One-time setup)

If you want to use PowerShell, run this command in PowerShell as Administrator:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then you can use npm commands normally in PowerShell.

## Option 4: Use Git Bash or WSL

If you have Git Bash or WSL installed, you can use those terminals instead:

```bash
cd simplyforms
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm start
```

## Troubleshooting

If you still get the `binary-extensions` error:

1. Make sure you're using Node.js version 16.x or 18.x (not 22.x)
2. Try installing the missing package directly:
   ```
   npm install binary-extensions --save-dev
   ```
3. Then run `npm install --legacy-peer-deps` again

## Recommended Node.js Version

This project works best with:
- Node.js 16.x LTS, or
- Node.js 18.x LTS

You can check your version with:
```
node --version
```

If you have Node.js 22.x, consider using nvm (Node Version Manager) to switch to Node.js 18.x.

