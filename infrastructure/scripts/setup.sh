#!/bin/bash
set -e

echo "🏫 Modern School OS — Dev Setup"

# Copy env
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ Created .env from .env.example — fill in your secrets"
fi

# Install node deps
echo "📦 Installing Node dependencies..."
pnpm install

# Start infrastructure
echo "🐳 Starting PostgreSQL + Redis..."
pnpm docker:up

# Wait for Postgres
echo "⏳ Waiting for database..."
sleep 3

# Prisma
echo "🗄️  Running Prisma migrations..."
cd services/api && pnpm db:migrate && pnpm db:generate && cd ../..

echo ""
echo "✅ Setup complete! Start dev servers with:"
echo "   pnpm dev"
echo ""
echo "   Web portal:   http://localhost:3001"
echo "   API:          http://localhost:3000"
echo "   API docs:     http://localhost:3000/api/docs"
echo "   AI service:   http://localhost:8000"
