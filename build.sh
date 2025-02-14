#!/bin/bash
# Load environment variables from .env file
if [ -f .env ]; then
    export $(cat .env | xargs)
else
    echo "❌ .env file not found!"
    exit 1
fi

echo "🚀 Pulling latest changes from Git"

# Ensure variables are set
if [ -z "$GITHUB_USERNAME" ] || [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Missing GitHub credentials in .env file!"
    exit 1
fi


# Repository URL with authentication
REPO_URL="https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/rahimlisarkhan/SkyFlow.git"

# Choose environment
ENV=$1  # Pass 'dev' or 'prod' as an argument

if [ "$ENV" == "dev" ]; then
    BRANCH="develop"
elif [ "$ENV" == "prod" ]; then
    BRANCH="main"
else
    echo "❌ Invalid environment! Use: ./build.sh dev OR ./build.sh prod"
    exit 1
fi

echo "🔄 Switching to branch: $BRANCH"
git checkout $BRANCH

echo "📥 Pulling latest changes from $BRANCH branch..."
git pull $REPO_URL $BRANCH

if [ $? -ne 0 ]; then
    echo "❌ Git pull failed!"
    exit 1
fi

echo "✅ Git pull successful!"

echo "🚀 Starting Docker Build & Deploy"

if [ "$ENV" == "dev" ]; then
    echo "🛠 Building & Starting Development Container..."
    docker compose -p skyflow-app-dev up -d --build
elif [ "$ENV" == "prod" ]; then
    echo "🚀 Building & Starting Production Container..."
    docker compose -p skyflow-app-prod up -d --build
fi

echo "✅ Done!"
