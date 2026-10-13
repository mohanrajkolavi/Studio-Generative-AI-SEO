#!/bin/sh
# Apply every SQL migration in src/lib/db/migrations, in filename order.
# Migrations are written to be idempotent (IF NOT EXISTS / OR REPLACE), so re-running is safe.
# Usage: DATABASE_URL=postgresql://... npm run db:migrate   (or set it in .env.local)
set -eu

cd "$(dirname "$0")/.."

if [ -z "${DATABASE_URL:-}" ] && [ -f .env.local ]; then
  DATABASE_URL=$(grep -E '^DATABASE_URL=' .env.local | tail -n 1 | cut -d= -f2- | sed -e 's/^"//' -e 's/"$//')
fi

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is not set (export it or add it to .env.local)." >&2
  exit 1
fi

if ! command -v psql >/dev/null 2>&1; then
  echo "psql is required. Install the PostgreSQL client, or paste the files in src/lib/db/migrations into the Supabase SQL editor." >&2
  exit 1
fi

for file in src/lib/db/migrations/*.sql; do
  echo "Applying $file"
  psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -q -f "$file"
done

echo "Migrations complete."
