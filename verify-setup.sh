#!/bin/bash

# Verification script to ensure the application is properly set up

echo "🔍 Team Task Manager - Setup Verification"
echo "=========================================="

ERRORS=0

# Check Node.js
echo ""
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✓ Node.js installed: $NODE_VERSION"
else
    echo "✗ Node.js not found"
    ERRORS=$((ERRORS + 1))
fi

# Check npm
echo ""
echo "Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✓ npm installed: $NPM_VERSION"
else
    echo "✗ npm not found"
    ERRORS=$((ERRORS + 1))
fi

# Check PostgreSQL
echo ""
echo "Checking PostgreSQL..."
if command -v psql &> /dev/null; then
    PSQL_VERSION=$(psql --version)
    echo "✓ PostgreSQL installed: $PSQL_VERSION"
else
    echo "✗ PostgreSQL not found (optional if using Docker)"
fi

# Check Docker
echo ""
echo "Checking Docker..."
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    echo "✓ Docker installed: $DOCKER_VERSION"
else
    echo "✗ Docker not found (optional)"
fi

# Check backend setup
echo ""
echo "Checking backend setup..."
if [ -f "backend/.env" ]; then
    echo "✓ Backend .env file found"
else
    echo "✗ Backend .env file not found"
    ERRORS=$((ERRORS + 1))
fi

if [ -f "backend/package.json" ]; then
    echo "✓ Backend package.json found"
else
    echo "✗ Backend package.json not found"
    ERRORS=$((ERRORS + 1))
fi

# Check frontend setup
echo ""
echo "Checking frontend setup..."
if [ -f "frontend/.env" ]; then
    echo "✓ Frontend .env file found"
else
    echo "✗ Frontend .env file not found"
    ERRORS=$((ERRORS + 1))
fi

if [ -f "frontend/package.json" ]; then
    echo "✓ Frontend package.json found"
else
    echo "✗ Frontend package.json not found"
    ERRORS=$((ERRORS + 1))
fi

# Check directories
echo ""
echo "Checking directory structure..."
if [ -d "backend/src" ]; then
    echo "✓ Backend src directory exists"
else
    echo "✗ Backend src directory missing"
    ERRORS=$((ERRORS + 1))
fi

if [ -d "frontend/src" ]; then
    echo "✓ Frontend src directory exists"
else
    echo "✗ Frontend src directory missing"
    ERRORS=$((ERRORS + 1))
fi

# Summary
echo ""
echo "=========================================="
if [ $ERRORS -eq 0 ]; then
    echo "✅ All checks passed!"
    echo ""
    echo "Next steps:"
    echo "1. Update DATABASE_URL in backend/.env"
    echo "2. Run: docker-compose up"
    echo "   OR run backend and frontend separately:"
    echo "   - cd backend && npm run dev"
    echo "   - cd frontend && npm run dev"
else
    echo "❌ $ERRORS check(s) failed"
    echo "Please resolve the issues above and try again"
    exit 1
fi
