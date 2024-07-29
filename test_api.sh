#!/bin/bash

BASE_URL="http://localhost:3000"

# Register a user
echo "Registering user..."
REGISTER_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpassword"}' $BASE_URL/api/auth/register)
TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | grep -o '[^"]*$')

echo "Token: $TOKEN"

# Login
echo "Logging in..."
curl -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpassword"}' $BASE_URL/api/auth/login

# Add user data
echo "Adding user data..."
curl -X POST -H "Content-Type: application/json" -H "x-auth-token: $TOKEN" -d '{"name":"Julio","age":48}' $BASE_URL/api/userData

# Get user data
echo "Getting user data..."
curl -H "x-auth-token: $TOKEN" $BASE_URL/api/userData

# Test old route
echo "Testing old route..."
curl -X POST -H "Content-Type: application/json" -d '{"name":"Julio","age":48}' $BASE_URL/api/users

echo "Done. Check http://localhost:3000 in your browser to see the home page."