#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="${1:?PROJECT_DIR required}"
BACKUP_DIR="${2:?BACKUP_DIR required}"
BASENAME="${3:-project-$(date +%F-%H%M%S)}"
KEEP="${4:-7}"

mkdir -p "${BACKUP_DIR}"
ARCHIVE_PATH="${BACKUP_DIR}/${BASENAME}.tar.gz"

# Create a tar.gz of the project directory (one level up to preserve basename)
 tar -C "$(dirname "${PROJECT_DIR}")" -czf "${ARCHIVE_PATH}" "$(basename "${PROJECT_DIR}")"
echo "Created project backup: ${ARCHIVE_PATH}"

# Rotation: keep most recent $KEEP backups
ls -1t "${BACKUP_DIR}"/project-* 2>/dev/null | tail -n +$((KEEP+1)) | xargs -r rm -f || true