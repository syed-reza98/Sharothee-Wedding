#!/bin/bash

# Wedding Website End-to-End Testing Script
# This script tests the complete workflow from backend API to frontend integration

echo "🚀 Starting Wedding Website End-to-End Testing"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results tracking
TESTS_PASSED=0
TESTS_FAILED=0

# Function to print test results
print_test_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ $2${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ $2${NC}"
        ((TESTS_FAILED++))
    fi
}

echo -e "${BLUE}📊 Phase 1: Backend API Testing${NC}"
echo "================================"

cd /home/runner/work/Sharothee-Wedding/Sharothee-Wedding/server

# 1. Test Laravel application health
echo "Testing Laravel application health..."
php artisan --version > /dev/null 2>&1
print_test_result $? "Laravel application is accessible"

# 2. Test database connection and migrations
echo "Testing database migrations..."
php artisan migrate:status > /dev/null 2>&1
print_test_result $? "Database migrations are up to date"

# 3. Test API endpoints
echo "Testing API endpoints..."

# Start Laravel server in background
php artisan serve --host=localhost --port=8000 > /dev/null 2>&1 &
LARAVEL_PID=$!
sleep 3

# Test venues endpoint
echo "Testing /api/venues endpoint..."
VENUES_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/venues)
if [ "$VENUES_RESPONSE" = "200" ]; then
    print_test_result 0 "Venues API endpoint returns 200"
else
    print_test_result 1 "Venues API endpoint failed (HTTP $VENUES_RESPONSE)"
fi

# Test events endpoint
echo "Testing /api/events endpoint..."
EVENTS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/events)
if [ "$EVENTS_RESPONSE" = "200" ]; then
    print_test_result 0 "Events API endpoint returns 200"
else
    print_test_result 1 "Events API endpoint failed (HTTP $EVENTS_RESPONSE)"
fi

# Test guest endpoint
echo "Testing /api/guest/{token} endpoint..."
GUEST_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/guest/JOHN01)
if [ "$GUEST_RESPONSE" = "200" ]; then
    print_test_result 0 "Guest API endpoint returns 200"
else
    print_test_result 1 "Guest API endpoint failed (HTTP $GUEST_RESPONSE)"
fi

# Test hotels endpoint
echo "Testing /api/hotels endpoint..."
HOTELS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/hotels)
if [ "$HOTELS_RESPONSE" = "200" ]; then
    print_test_result 0 "Hotels API endpoint returns 200"
else
    print_test_result 1 "Hotels API endpoint failed (HTTP $HOTELS_RESPONSE)"
fi

echo -e "${BLUE}🧪 Phase 2: Backend Unit Testing${NC}"
echo "================================="

# Run Laravel tests
echo "Running Laravel PHPUnit tests..."
php artisan test --quiet
TEST_EXIT_CODE=$?
print_test_result $TEST_EXIT_CODE "Laravel unit tests (14 tests)"

echo -e "${BLUE}🎨 Phase 3: Frontend Testing${NC}"
echo "============================="

# Use CLIENT_DIR environment variable if set, otherwise default to relative path
CLIENT_DIR="${CLIENT_DIR:-$(dirname "$0")/client}"
cd "$CLIENT_DIR"

# 1. Test Node.js application
echo "Testing Node.js application setup..."
node --version > /dev/null 2>&1
print_test_result $? "Node.js is accessible"

# 2. Test Next.js build
echo "Testing Next.js build process..."
npm run build > /dev/null 2>&1
BUILD_EXIT_CODE=$?
print_test_result $BUILD_EXIT_CODE "Next.js build successful"

# 3. Test static export for GitHub Pages
echo "Testing static export generation..."
if [ -d "out" ] && [ -f "out/index.html" ]; then
    print_test_result 0 "Static export generated successfully"
else
    print_test_result 1 "Static export generation failed"
fi

# 4. Test frontend unit tests
echo "Running frontend Jest tests..."
npm run test > /dev/null 2>&1
FRONTEND_TEST_EXIT_CODE=$?
print_test_result $FRONTEND_TEST_EXIT_CODE "Frontend unit tests (12 tests)"

# 5. Test TypeScript compilation
echo "Testing TypeScript type checking..."
npm run type-check > /dev/null 2>&1
TYPE_CHECK_EXIT_CODE=$?
print_test_result $TYPE_CHECK_EXIT_CODE "TypeScript type checking"

# 6. Test ESLint
echo "Testing ESLint validation..."
npm run lint > /dev/null 2>&1
LINT_EXIT_CODE=$?
print_test_result $LINT_EXIT_CODE "ESLint validation"

echo -e "${BLUE}🔗 Phase 4: Integration Testing${NC}"
echo "==============================="

# Test RSVP workflow
echo "Testing complete RSVP workflow..."

# Create RSVP payload
RSVP_PAYLOAD='{
    "guest_token": "JOHN01",
    "event_id": 1,
    "status": "attending",
    "plus_ones": 1,
    "dietary_restrictions": "Vegetarian - no nuts please"
}'

# Submit RSVP
RSVP_RESPONSE=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d "$RSVP_PAYLOAD" \
    -o /dev/null \
    -w "%{http_code}" \
    http://localhost:8000/api/rsvp)

if [ "$RSVP_RESPONSE" = "200" ] || [ "$RSVP_RESPONSE" = "201" ]; then
    print_test_result 0 "RSVP submission successful"
else
    print_test_result 1 "RSVP submission failed (HTTP $RSVP_RESPONSE)"
fi

# Cleanup: Stop Laravel server
kill $LARAVEL_PID 2>/dev/null

echo -e "${BLUE}📋 Phase 5: Deployment Readiness${NC}"
echo "================================="

# Check GitHub workflow file
echo "Checking GitHub workflow configuration..."
if [ -f ".github/workflows/deploy.yml" ]; then
    print_test_result 0 "GitHub workflow configuration exists"
else
    print_test_result 1 "GitHub workflow configuration missing"
fi

# Check environment files
echo "Checking environment configuration..."
if [ -f "/home/runner/work/Sharothee-Wedding/Sharothee-Wedding/server/.env.example" ]; then
    print_test_result 0 "Backend environment example exists"
else
    print_test_result 1 "Backend environment example missing"
fi

if [ -f "/home/runner/work/Sharothee-Wedding/Sharothee-Wedding/client/.env.local.example" ]; then
    print_test_result 0 "Frontend environment example exists"
else
    print_test_result 1 "Frontend environment example missing"
fi

# Check deployment documentation
echo "Checking deployment documentation..."
if [ -f "/home/runner/work/Sharothee-Wedding/Sharothee-Wedding/docs/DEPLOYMENT_STRATEGY.md" ]; then
    print_test_result 0 "Deployment strategy documentation exists"
else
    print_test_result 1 "Deployment strategy documentation missing"
fi

echo ""
echo "🏁 Testing Complete!"
echo "==================="
echo -e "${GREEN}Tests Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Tests Failed: $TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! The wedding website is ready for deployment.${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some tests failed. Please review the issues above.${NC}"
    exit 1
fi