@echo off
echo.
echo ====================================
echo TaskFlow Setup Script
echo ====================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Please download from https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js is installed: %NODE_VERSION%

REM Install backend dependencies
echo.
echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..
echo [OK] Backend dependencies installed

REM Install frontend dependencies
echo.
echo Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..
echo [OK] Frontend dependencies installed

REM Create .env files from examples
echo.
echo Setting up environment files...
if not exist backend\.env (
    echo Creating backend\.env...
    copy backend\.env.example backend\.env
)
if not exist frontend\.env.local (
    echo Creating frontend\.env.local...
    copy frontend\.env.example frontend\.env.local
)
echo [OK] Environment files ready

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Next steps:
echo 1. Set up MongoDB (local or Atlas)
echo 2. Update backend/.env with MongoDB URI
echo 3. Run: npm run dev (in backend folder)
echo 4. Run: npm run dev (in frontend folder, new terminal)
echo 5. Visit: http://localhost:5173
echo.
echo For more help, see QUICK_START.md
echo.
pause
