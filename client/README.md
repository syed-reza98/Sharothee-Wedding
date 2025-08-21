# Incia & Arvin's Wedding Website 💒

This is a full-featured Next.js 15.4.5 wedding website built with TypeScript, Tailwind CSS, and Prisma. The application includes RSVP management, event scheduling, photo galleries, and an admin dashboard for managing wedding logistics.

## 🚀 Quick Start

### Prerequisites

- **Node.js 20.10.0+** (use `nvm use` to match .nvmrc)
- **MySQL** (production) or SQLite (development)
- **npm** package manager

### Environment Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment configuration:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Database setup:**
   ```bash
   npm run db:generate  # Generate Prisma client
   npm run db:push      # Push schema to database
   npm run db:seed      # Seed with sample data
   ```

4. **Start development:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📜 Available Scripts

### Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server

### Code Quality
- `npm run lint` - Check code style and syntax
- `npm run lint:fix` - **NEW** - Automatically fix linting issues
- `npm run type-check` - TypeScript type validation

### Analysis & Security
- `npm run analyze` - **NEW** - Bundle analysis with detailed metrics
- `npm run security:scan` - **NEW** - Security vulnerability scan (allows high-level findings for awareness)

### Testing
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode  
- `npm run test:coverage` - Generate test coverage report
- `npm run e2e` - Run end-to-end tests

### Database
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio database browser

## 🏗️ Architecture Overview

### Technology Stack
- **Next.js 15.4.5** with App Router
- **React 19.1.0** with TypeScript
- **Prisma ORM** with MySQL (production) / SQLite (development)  
- **NextAuth.js** for authentication
- **Tailwind CSS** for styling
- **React Query** for server state management

### Deployment Model: Dynamic Server vs Static Export

⚠️ **Important Deployment Note:**

This application is configured for **dynamic server deployment** and **cannot use static export** due to:

1. **NextAuth.js Authentication**: Requires server-side session handling
2. **API Routes**: Admin dashboard needs server-side endpoints  
3. **Database Integration**: Dynamic RSVP processing requires server runtime

```typescript
// next.config.ts - Static export disabled
const nextConfig: NextConfig = {
  // output: 'export', // ❌ Disabled - incompatible with NextAuth
  images: { unoptimized: true },
};
```

### Supported Deployment Platforms
- ✅ **Vercel** (recommended)
- ✅ **Netlify** with Node.js runtime
- ✅ **Hostinger VPS** (current production)
- ✅ **Railway, Render, DigitalOcean**
- ❌ **Static hosting** (GitHub Pages, Netlify Static, etc.)

## 🔧 Development Environment

### Node Version Management
This project requires **Node.js 20.10.0+**. Use the included `.nvmrc`:

```bash
nvm use    # Uses Node version from .nvmrc
```

### Environment Variables
See `SECURITY.md` for detailed secret management guidelines.

**Required for production:**
- `DATABASE_URL` - MySQL connection string
- `NEXTAUTH_SECRET` - Session encryption key  
- `NEXTAUTH_URL` - Application URL
- `RESEND_API_KEY` - Email service API key
- `CLOUDINARY_*` - Image upload credentials

## 🧪 Testing Strategy

### Unit Testing
- **Framework**: Jest with React Testing Library
- **Coverage**: Target >80% overall coverage
- **Command**: `npm test`

### End-to-End Testing  
- **Framework**: Playwright with Chromium
- **Config**: TypeScript configuration (playwright.config.ts)
- **Command**: `npm run e2e`

**Note**: Some API route tests may fail in Jest environment due to missing Next.js Request/Response context. This is expected and acceptable.

## 🔒 Security & Secret Management

### Environment File Structure
- `.env.local.example` - Template with dummy values (safe to commit)
- `.env.local` - Development secrets (never commit)  
- `.env.production` - Production secrets (never commit)

### Security Guidelines
- **Never commit secrets** to Git history
- **Rotate credentials** regularly (see SECURITY.md)
- **Use strong passwords** for admin accounts
- **Enable HTTPS** in production

**📋 For detailed security procedures, see `SECURITY.md`**

## 📚 Documentation

- **`CONTRIBUTING.md`** - Development setup and contribution guidelines
- **`ARCHITECTURE.md`** - System architecture and design patterns  
- **`SECURITY.md`** - Security policies and secret management
- **`docs/CI_PIPELINE_PLAN.md`** - Planned CI/CD workflow (not yet implemented)

## 🎯 Wedding-Specific Features

### Guest Experience
- **RSVP System** - Code-based invitation responses
- **Event Schedule** - Wedding timeline with venue details
- **Photo Gallery** - Couple and wedding photos
- **Mobile Responsive** - Optimized for guest mobile usage

### Admin Dashboard  
- **Guest Management** - View and manage RSVPs
- **Event Updates** - Modify wedding schedule
- **Gallery Management** - Upload and organize photos
- **Analytics** - Response tracking and statistics

## 🚀 Deployment

### Current Production Setup
- **Platform**: Hostinger VPS
- **Domain**: arvinwedsincia.com  
- **Process Manager**: PM2
- **Reverse Proxy**: Nginx
- **SSL**: Let's Encrypt with auto-renewal
- **Database**: MySQL 8.0

### Deployment Process
1. Build application: `npm run build`
2. Run database migrations: `npx prisma migrate deploy`
3. Start with PM2: `pm2 start ecosystem.config.js`
4. Configure Nginx reverse proxy
5. Set up SSL certificates

## 🛠️ Troubleshooting

### Common Issues

**Build Failures:**
- Ensure `.env.local` exists with all required variables
- Run `npm run db:generate` after schema changes
- Check Node.js version matches requirements

**Database Issues:**
- Verify DATABASE_URL format and credentials
- Run `npm run db:push` to sync schema
- Check database server connectivity

**Authentication Problems:**
- Ensure NEXTAUTH_SECRET is set and consistent
- Verify NEXTAUTH_URL matches deployment URL
- Check admin credentials in environment variables

## 🎉 Wedding Day Information

**Bride & Groom**: Incia & Arvin  
**Wedding Date**: August 15, 2025  
**Website**: [arvinwedsincia.com](https://arvinwedsincia.com)

## 📞 Support & Contact

- **Developer**: codestromhub@gmail.com
- **Phone**: +880 1234-567890  
- **Location**: Dhaka, Bangladesh

## 🤝 Contributing

We welcome contributions to make this wedding website perfect! Please read `CONTRIBUTING.md` for:

- Environment setup instructions
- Code quality standards  
- Testing requirements
- Pull request guidelines

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

**Built with ❤️ for Incia & Arvin's special day** 🌟
