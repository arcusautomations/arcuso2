#!/bin/bash

# Arcus Automations Post-Deployment Verification Script
# Usage: ./verify-postdeploy.sh [BASE_URL]

set -e

BASE_URL=${1:-"http://localhost:3000"}
FAILED=0
PASSED=0

echo "================================================"
echo "Arcus Automations - Post-Deployment Verification"
echo "================================================"
echo ""
echo "Base URL: $BASE_URL"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper function to check HTTP status
check_endpoint() {
  local name=$1
  local url=$2
  local expected_status=${3:-200}
  
  response=$(curl -s -o /dev/null -w "%{http_code}" "$url" --max-time 10 2>/dev/null || echo "000")
  
  if [ "$response" == "$expected_status" ]; then
    echo -e "${GREEN}✓${NC} $name - Status: $response"
    ((PASSED++))
  else
    echo -e "${RED}✗${NC} $name - Expected: $expected_status, Got: $response"
    ((FAILED++))
  fi
}

# Helper function to check JSON response
check_json_endpoint() {
  local name=$1
  local url=$2
  local expected_field=$3
  
  response=$(curl -s "$url" --max-time 10 2>/dev/null || echo "{}")
  
  if echo "$response" | grep -q "$expected_field"; then
    echo -e "${GREEN}✓${NC} $name - Contains: $expected_field"
    ((PASSED++))
  else
    echo -e "${RED}✗${NC} $name - Missing: $expected_field"
    ((FAILED++))
  fi
}

echo "1. Checking Core Pages"
echo "----------------------"
check_endpoint "Home Page" "$BASE_URL/"
check_endpoint "Login Page" "$BASE_URL/login"
check_endpoint "Signup Page" "$BASE_URL/signup"
check_endpoint "Forgot Password Page" "$BASE_URL/forgot-password"

echo ""
echo "2. Checking API Endpoints"
echo "-------------------------"
check_endpoint "Health Check" "$BASE_URL/api/health"
check_json_endpoint "Health Check Response" "$BASE_URL/api/health" '"status"'

echo ""
echo "3. Checking Protected Routes (Should Redirect)"
echo "-----------------------------------------------"
check_endpoint "Dashboard (Unauthenticated)" "$BASE_URL/dashboard" 307

echo ""
echo "4. Checking Security Headers"
echo "----------------------------"
headers=$(curl -sI "$BASE_URL/" --max-time 10 2>/dev/null || echo "")

check_header() {
  local header=$1
  if echo "$headers" | grep -qi "$header"; then
    echo -e "${GREEN}✓${NC} $header present"
    ((PASSED++))
  else
    echo -e "${YELLOW}!${NC} $header not found (may be configured in production)"
  fi
}

check_header "X-Content-Type-Options"
check_header "X-Frame-Options"
check_header "X-XSS-Protection"

echo ""
echo "5. Checking Static Assets"
echo "-------------------------"
check_endpoint "Next.js Chunks" "$BASE_URL/_next/static" 200

echo ""
echo "================================================"
echo "Verification Complete"
echo "================================================"
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -gt 0 ]; then
  echo -e "${RED}Some checks failed. Please review the issues above.${NC}"
  exit 1
else
  echo -e "${GREEN}All checks passed! Deployment looks healthy.${NC}"
  exit 0
fi


