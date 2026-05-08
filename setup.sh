#!/bin/bash

# Setup script for Team Task Manager

echo "🚀 Team Task Manager - Setup Script"
echo "===================================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+"
    exit 1
fi

echo "✓ Node.js version: $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✓ npm version: $(npm -v)"

# Setup Backend
echo ""
echo "📦 Setting up backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update DATABASE_URL in backend/.env"
fi

echo "Installing dependencies..."
npm install

cd ..

# Setup Frontend
echo ""
echo "📦 Setting up frontend..."
cd frontend

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo "Installing dependencies..."
npm install

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update DATABASE_URL in backend/.env"
echo "2. Run: docker-compose up"
echo "   OR"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Access:"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:5000"
