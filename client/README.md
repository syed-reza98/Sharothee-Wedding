This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!


## Backup Script

# Variables (adjust if you like)
DATE=$(date +%F_%H%M%S)
PROJECT_DIR="/var/www/wedding/"
BACKUP_DIR="/var/backups/wedding/"

# Create backup directory
sudo mkdir -p "$BACKUP_DIR"

# Create a gzipped tarball
sudo tar -czf "/var/backups/wedding/Sharothee-Wedding.tar.gz" \ -C "$(dirname "$PROJECT_DIR")" "$(basename "$PROJECT_DIR")"

# Verify
ls -lh "$BACKUP_DIR"/Sharothee-Wedding_${DATE}.tar.gz

# Install zip if needed (Ubuntu/Debian)
# sudo apt-get update && sudo apt-get install -y zip

DATE=$(date +%F_%H%M%S)
PROJECT_DIR="/var/www/wedding/"
BACKUP_DIR="/var/backups/wedding/"
sudo mkdir -p "$BACKUP_DIR"

# Create a recursive zip
sudo zip -r "/var/backups/wedding/Sharothee-Wedding.zip" "/var/www/wedding/client/"


# Remove the zip file
sudo rm -f "/var/backups/wedding/Sharothee-Wedding.zip"

# Verify
ls -lh "$BACKUP_DIR"/Sharothee-Wedding_${DATE}.zip



# Database backup
mysqldump -u root -p wedding_db > /var/www/db_backup.sql

mysqldump -u username -p database_name > data-dump.sql

ALTER USER 'root'@'localhost' IDENTIFIED BY 'W3dd1ng@ArvinIncia2025!Secure';

use wedding_db;



mysqldump -u wedding_user -p'W3dd1ng@ArvinIncia2025!Secure' wedding_db > $BACKUP_DIR/wedding_db_$DATE.sql