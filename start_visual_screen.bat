@echo off
cd /d "%~dp0Visual_Screen"

echo Setting up Visual_Screen project...

rem Set NODE_OPTIONS
set NODE_OPTIONS=--openssl-legacy-provider
echo NODE_OPTIONS set to: %NODE_OPTIONS%

rem Install dependencies
echo Installing dependencies...
call npm install

rem Start the development server
echo Starting development server...
start "Visual_Screen Server" npm run serve

echo Visual_Screen is starting up...
echo The application will be available at http://localhost:8080
echo A new window has been opened for the server
echo.
echo You can now open index.html in your main project
pause