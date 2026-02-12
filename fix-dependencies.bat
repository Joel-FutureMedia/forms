@echo off
echo Fixing missing dependencies...
echo.

echo Installing commondir...
call npm install commondir --save

echo Installing binary-extensions...
call npm install binary-extensions --save

echo.
echo Dependencies fixed! Try running: npm start
pause

