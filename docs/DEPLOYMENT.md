# Hostinger VPS Deployment and Backup

This project deploys from the default branch `salman_14_08_25` to a Hostinger VPS and performs encrypted backups of both the VPS project files and the database.

## Secrets

Set these repository secrets:

- `VPS_HOST`, `VPS_PORT` (22), `VPS_USER`, `VPS_SSH_KEY`
- `VPS_PROJECT_DIR` (e.g., `/var/www/sharothee`)
- `VPS_BACKUP_DIR` (e.g., `/var/backups/sharothee`)
- `BACKUP_PASSPHRASE` (strong string; used to encrypt backups stored in GitHub)
- `DB_TYPE` (`mysql` | `postgres` | `none`)
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `BUILD_COMMAND` (optional, e.g., `npm ci && npm run build`)
- `MIGRATION_CMD` (optional, e.g., `npm run migrate` or `prisma migrate deploy`)
- `SERVICE_RESTART_CMD` (optional, e.g., `pm2 restart sharothee`)

## What the workflow does

1. Connects to the VPS via SSH.
2. Backs up:
   - Database (if `DB_TYPE` is not `none`) to `${VPS_BACKUP_DIR}/db-<run>.{mysql.sql.gz|pg.dump.gz}`
   - Project files at `${VPS_PROJECT_DIR}` to `${VPS_BACKUP_DIR}/project-<run>.tar.gz` with rotation (default keep 7).
3. Pulls backups to the CI runner, encrypts them using `BACKUP_PASSPHRASE`, and pushes them to a dedicated `backups` branch.
4. Rsyncs the repository to `${VPS_PROJECT_DIR}` (excluding patterns in `.deployignore`).
5. Optionally runs `BUILD_COMMAND`, `MIGRATION_CMD`, and `SERVICE_RESTART_CMD` on the VPS.

## Notes

- The repository is public; backups committed to GitHub are encrypted with AES-256 and a passphrase. Keep the passphrase secure. Without it, encrypted backups cannot be decrypted.
- Ensure the VPS user has permissions to read/write `${VPS_PROJECT_DIR}` and `${VPS_BACKUP_DIR}`. The workflow uses `sudo` to create the backup directory; adjust if the user lacks sudo privileges.
- Ensure DB tools are installed on the VPS if database backups are enabled:
  - MySQL: `mysqldump` and `gzip`
  - PostgreSQL: `pg_dump` and `gzip`
- For Node runtimes, set `BUILD_COMMAND` appropriately. Example:
  - `npm ci && npm run build` (for SSR or static builds)
  - `npm ci --omit=dev && pm2 reload ecosystem.config.js --env production` (if using PM2)
- If the app requires environment variables on the VPS, ensure the `.env` file exists on the VPS and is not overwritten by rsync (the `.deployignore` excludes `.env`).

## Running the deployment

- Automatic: push to `salman_14_08_25` triggers the workflow.
- Manual: Actions tab → "Deploy to Hostinger VPS with Backups" → "Run workflow" and choose a ref if needed.