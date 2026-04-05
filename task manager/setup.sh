#!/bin/bash

echo ""
echo "===================================="
echo "TaskFlow Setup Script"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "[ERROR] Node.js is not installed!"
    echo "Please download from https://nodejs.org/"
    exit 1
fi
echo "[OK] Node.js is installed: $(node -v)"

# Install backend dependencies
echo ""
echo "Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install backend dependencies"
    exit 1
fi
cd ..
echo "[OK] Backend dependencies installed"

# Install frontend dependencies
echo ""
echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install frontend dependencies"
    exit 1
fi
cd ..
echo "[OK] Frontend dependencies installed"

# Create .env files from examples
echo ""
echo "Setting up environment files..."
if [ ! -f backend/.env ]; then
    echo "Creating backend/.env..."
    cp backend/.env.example backend/.env 2>/dev/null || true
fi
if [ ! -f frontend/.env.local ]; then
    echo "Creating frontend/.env.local..."
    cp frontend/.env.example frontend/.env.local 2>/dev/null || true
fi
echo "[OK] Environment files ready"

echo ""
echo "===================================="
echo "Setup Complete!"
echo "===================================="
echo ""
echo "Next steps:"
echo "1. Set up MongoDB (local or Atlas)"
echo "2. Update backend/.env with MongoDB URI"
echo "3. Run: npm run dev (in backend folder)"
echo "4. Run: npm run dev (in frontend folder, new terminal)"
echo "5. Visit: http://localhost:5173"
echo ""
echo "For more help, see QUICK_START.md"
echo ""
