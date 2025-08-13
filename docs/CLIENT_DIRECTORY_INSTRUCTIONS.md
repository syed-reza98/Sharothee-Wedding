# Client Directory Command Instructions

**IMPORTANT**: All commands, scripts, CLI tools, and YAML operations for the Sharothee Wedding Website project MUST be executed from the `client` directory.

## Navigation Requirement

Before running ANY command related to the wedding website project, you MUST first navigate to the client directory:

```cmd
cd i:\CodeStorm\Hostinger\Sharothee-Wedding\client
```

Or if you're already in the project root:

```cmd
cd client
```

## Why This Is Required

The Sharothee Wedding Website is a Next.js 15.4.5 application with the following structure:
- **Root Directory**: `i:\CodeStorm\Hostinger\Sharothee-Wedding\` (contains project documentation)
- **Application Directory**: `i:\CodeStorm\Hostinger\Sharothee-Wedding\client\` (contains the actual Next.js application)

All application-specific files are located in the `client` directory:
- `package.json` - Node.js dependencies and scripts
- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `jest.config.js` - Test configuration
- `prisma/` - Database schema and migrations
- `src/` - Source code (components, pages, APIs)

## Commands That Require Client Directory

### Package Management
```cmd
cd client
npm install
npm update
npm audit
```

### Development Server
```cmd
cd client
npm run dev
npm run build
npm start
```

### Database Operations
```cmd
cd client
npx prisma generate
npx prisma db push
npx prisma db pull
npx prisma migrate dev
npx prisma studio
npm run db:seed
```

### Testing
```cmd
cd client
npm test
npm run test:watch
npm run test:coverage
```

### Code Quality
```cmd
cd client
npm run lint
npm run type-check
```

### Build and Production
```cmd
cd client
npm run build
npm run start
```

### Custom Scripts
```cmd
cd client
npm run db:reset
npm run db:migrate
```

### TypeScript Operations
```cmd
cd client
npx tsc --noEmit
npx tsc --build
```

### Prisma CLI Commands
```cmd
cd client
npx prisma --help
npx prisma init
npx prisma format
npx prisma validate
```

### Deployment Scripts
```cmd
cd client
npm run build
# Then any deployment commands
```

## Environment Files Location

Environment files must also be in the client directory:
- `client/.env.local` - Development environment variables
- `client/.env.production` - Production environment variables

## Configuration Files Location

All configuration files are in the client directory:
- `client/package.json`
- `client/next.config.ts`
- `client/tailwind.config.js`
- `client/jest.config.js`
- `client/tsconfig.json`
- `client/eslint.config.mjs`

## Example Workflow

1. **Initial Setup**:
```cmd
cd i:\CodeStorm\Hostinger\Sharothee-Wedding\client
npm install
npx prisma generate
```

2. **Development**:
```cmd
cd client
npm run dev
```

3. **Before Deployment**:
```cmd
cd client
npm run lint
npm run type-check
npm run build
```

4. **Database Setup**:
```cmd
cd client
npx prisma db push
npm run db:seed
```

## Terminal Session Management

When using terminal tools, always ensure the working directory is set to the client folder:

```cmd
# Method 1: Change directory first
cd i:\CodeStorm\Hostinger\Sharothee-Wedding\client
npm run dev

# Method 2: Use absolute path in terminal tools
# Set workingDirectory to: i:\CodeStorm\Hostinger\Sharothee-Wedding\client
```

## Error Prevention

**Common Mistakes to Avoid**:
1. Running `npm install` from the root directory (will fail - no package.json)
2. Running `npx prisma` commands from root (will fail - no schema.prisma)
3. Running `npm run dev` from root (will fail - no Next.js config)
4. Creating `.env.local` in root instead of client directory

## Verification Commands

To verify you're in the correct directory, check for these files:

```cmd
cd client
dir package.json
dir next.config.ts
dir src
dir prisma
```

All these should exist in the current directory.

---

**Remember**: The client directory contains the complete Next.js application. The root directory only contains documentation and deployment scripts. Always work from the client directory for all application-related tasks.
