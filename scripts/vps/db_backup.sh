#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="${1:?OUTPUT_DIR required}"
BASENAME="${2:-db-$(date +%F-%H%M%S)}"

DB_TYPE="${DB_TYPE:-none}"
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-}"
DB_NAME="${DB_NAME:-}"
DB_USER="${DB_USER:-}"
DB_PASSWORD="${DB_PASSWORD:-}"

mkdir -p "${OUT_DIR}"

case "${DB_TYPE}" in
  mysql)
    : "${DB_NAME:?DB_NAME required for mysql}"
    : "${DB_USER:?DB_USER required for mysql}"
    : "${DB_PASSWORD:?DB_PASSWORD required for mysql}"
    PORT_FLAG=""
    [ -n "${DB_PORT}" ] && PORT_FLAG="--port=${DB_PORT}"
    mysqldump --single-transaction --quick --lock-tables=false \
      --host="${DB_HOST}" ${PORT_FLAG} --user="${DB_USER}" --password="${DB_PASSWORD}" "${DB_NAME}" \
      | gzip > "${OUT_DIR}/${BASENAME}.mysql.sql.gz"
    echo "MySQL backup created at ${OUT_DIR}/${BASENAME}.mysql.sql.gz"
    ;;
  postgres|postgresql)
    : "${DB_NAME:?DB_NAME required for postgres}"
    : "${DB_USER:?DB_USER required for postgres}"
    export PGPASSWORD="${DB_PASSWORD:-}"
    PGPORT="${DB_PORT:-5432}"
    pg_dump -h "${DB_HOST}" -p "${PGPORT}" -U "${DB_USER}" -d "${DB_NAME}" -Fc > "${OUT_DIR}/${BASENAME}.pg.dump"
    gzip "${OUT_DIR}/${BASENAME}.pg.dump"
    echo "Postgres backup created at ${OUT_DIR}/${BASENAME}.pg.dump.gz"
    ;;
  none|"")
    echo "DB_TYPE is 'none' — skipping database backup."
    ;;
  *)
    echo "Unsupported DB_TYPE: ${DB_TYPE}" >&2
    exit 1
    ;;
 esac