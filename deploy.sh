#!/bin/bash
# GitHub and Vercel Deployment Script for AIEDU Platform

# Step 1: Ensure we're in the project directory
echo "Step 1: Navigating to project directory..."
cd /c/DEVELOPMENT/ai_integration_course_deploy_ready
/ # Replace with your actual project path

# Step 2: Create necessary configuration files
echo "Step 2: Creating configuration files..."

# Create .npmrc file for legacy OpenSSL support
echo "Creating .npmrc file..."
cat > .npmrc << EOL
legacy-peer-deps=true
node-options=--openssl-legacy-provider
EOL

# Create .gitignore file
echo "Creating .gitignore file..."
cat > .gitignore << EOL
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env.production

npm-debug.log*
yarn-debug.log*
yarn-error.log*
firebase-debug.log*
service-account-key.json
EOL

# Step 3: Initialize Git repository if not already initialized
echo "Step 3: Initializing Git repository..."
if [ ! -d .git ]; then
  git init
  echo "Git repository initialized."
else
  echo "Git repository already exists."
fi

# Step 4: Add all files to Git
echo "Step 4: Adding files to Git..."
git add .

# Step 5: Commit changes
echo "Step 5: Committing changes..."
git commit -m "AIEDU Platform - Ready for deployment"

# Step 6: Add GitHub remote (replace with your GitHub repository URL)
echo "Step 6: Adding GitHub remote..."
# Check if remote already exists
if git remote | grep -q "origin"; then
  echo "Remote 'origin' already exists. Removing and re-adding..."
  git remote remove origin
fi
git remote add origin https://github.com/Gnoscenti/fictional-octo-sniffle  # Step 7: Push to GitHub
echo "Step 7: Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "Deployment to GitHub complete!"
echo "Next steps:"
echo "1. Go to Vercel (https://vercel.com )"
echo "2. Import your GitHub repository"
echo "3. Configure with these settings:"
echo "   - Framework Preset: Create React App"
echo "   - Build Command: npm run build"
echo "   - Output Directory: build"
echo "4. Add your environment variables (Firebase config)"
echo "5. Deploy!"
