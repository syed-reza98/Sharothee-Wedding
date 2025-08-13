This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Development with SQLite (Recommended for Local Development)

For local development, the project includes SQLite support for easier setup:

```bash
# Setup SQLite development environment
npm run db:push:dev && npm run dev:sqlite
```

This will:
1. Create/update SQLite database (`dev.db`) using the development schema
2. Generate Prisma client for SQLite
3. Start the development server with Turbopack

### Development with MySQL

To use MySQL locally (matching production environment):

```bash
# Setup environment
cp .env.example .env.local
# Edit .env.local with your MySQL DATABASE_URL

# Setup database
npm run db:push
npm run dev
```

## Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. For SQLite development (default):
   ```env
   DATABASE_URL="file:./dev.db"
   ```

3. For MySQL development/production:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/wedding_db"
   ```

## Database Scripts

### SQLite Development Scripts
- `npm run db:push:dev` - Push schema to SQLite database
- `npm run db:generate:dev` - Generate Prisma client for SQLite
- `npm run db:studio:dev` - Open Prisma Studio for SQLite
- `npm run dev:sqlite` - Generate client and start dev server

### Production MySQL Scripts  
- `npm run db:push` - Push schema to MySQL database
- `npm run db:generate` - Generate Prisma client for MySQL
- `npm run db:studio` - Open Prisma Studio for MySQL
- `npm run dev` - Start development server

## API Health Check

The application includes a health check endpoint at `/api/health` that verifies database connectivity:

```bash
curl -i http://localhost:3000/api/health
```

Returns `200` with `{ ok: true, ... }` when healthy, or `503` with error details when unhealthy.

## Getting Started (Original Instructions)

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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
