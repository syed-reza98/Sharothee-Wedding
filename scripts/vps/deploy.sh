#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="${1:?PROJECT_DIR required}"

cd "${PROJECT_DIR}"

if [ -n "${BUILD_COMMAND:-}" ]; then
  echo "Running build command: ${BUILD_COMMAND}"
  bash -lc "${BUILD_COMMAND}"
else
  echo "No BUILD_COMMAND provided. Skipping build."
fi

if [ -n "${MIGRATION_CMD:-}" ]; then
  echo "Running migration command: ${MIGRATION_CMD}"
  bash -lc "${MIGRATION_CMD}"
else
  echo "No MIGRATION_CMD provided. Skipping migrations."
fi

if [ -n "${SERVICE_RESTART_CMD:-}" ]; then
  echo "Restarting service: ${SERVICE_RESTART_CMD}"
  bash -lc "${SERVICE_RESTART_CMD}"
else
  echo "No SERVICE_RESTART_CMD provided. Skipping service restart."
fi