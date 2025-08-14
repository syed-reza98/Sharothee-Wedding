#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="${1:?PROJECT_DIR required}"

cd "${PROJECT_DIR}"

# Load environment variables from .env.local if it exists
if [ -f .env.local ]; then
  echo "Loading environment variables from .env.local..."
  # Export all variables from .env.local, filtering out comments and empty lines
  # shellcheck disable=SC2046
  export $(grep -v '^#' .env.local | grep -v '^$' | xargs)
  echo "Environment variables loaded successfully"
else
  echo "No .env.local file found, proceeding with existing environment"
fi

if [ -n "${BUILD_COMMAND:-}" ]; then
  echo "Running build command: ${BUILD_COMMAND}"
  eval "${BUILD_COMMAND}"
else
  echo "No BUILD_COMMAND provided. Skipping build."
fi

if [ -n "${MIGRATION_CMD:-}" ]; then
  echo "Running migration command: ${MIGRATION_CMD}"
  eval "${MIGRATION_CMD}"
else
  echo "No MIGRATION_CMD provided. Skipping migrations."
fi

if [ -n "${SERVICE_RESTART_CMD:-}" ]; then
  echo "Restarting service: ${SERVICE_RESTART_CMD}"
  eval "${SERVICE_RESTART_CMD}"
else
  echo "No SERVICE_RESTART_CMD provided. Skipping service restart."
fi