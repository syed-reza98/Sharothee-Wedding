# Contributing to Incia & Arvin's Wedding Website

Thank you for contributing to this special wedding website project! This guide will help you get started.

## Environment Setup

### Prerequisites

- **Node.js**: Version 20.10.0 or higher (LTS recommended)
- **npm**: Comes with Node.js
- **MySQL**: Required for production database
- **Git**: For version control

### Node Version Management

This project uses Node.js 20 LTS. We recommend using nvm:

```bash
# Install/use the correct Node version
nvm use

# Or install if not present
nvm install
```

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/syed-reza98/Sharothee-Wedding.git
   cd Sharothee-Wedding/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   # Copy example environment file
   cp .env.local.example .env.local
   
   # Edit .env.local with your configuration
   # See SECURITY.md for secret management guidelines
   ```

4. **Database setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample data (optional)
   npm run db:seed
   ```

## Database Migration Workflow

### Development Migrations

```bash
# Create and apply a new migration
npm run db:migrate

# Reset database (destructive!)
npm run db:reset

# View database in browser
npm run db:studio
```

### Production Migrations

```bash
# Deploy migrations to production database
npx prisma migrate deploy

# Push schema changes without migration files
npm run db:push
```

**Important**: Always backup production data before running migrations!

## Development Workflow

### Starting Development Server

```bash
# Start Next.js development server with Turbopack
npm run dev

# Access at http://localhost:3000
```

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Check code style
- `npm run lint:fix` - Fix linting issues automatically
- `npm run type-check` - TypeScript type checking
- `npm run analyze` - Bundle analysis build
- `npm run security:scan` - Security vulnerability scan

## Testing Strategy

### Unit Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### End-to-End Tests

```bash
# Run E2E tests
npm run e2e

# Run E2E tests with UI (headed mode)
npm run e2e:headed
```

### API Testing

```bash
# Test specific API endpoints
npm run test:api:rsvp
```

**Note**: Some API tests may fail in Jest environment due to Next.js Request/Response context limitations. This is expected and acceptable.

## Code Quality Standards

### Linting and Formatting

- ESLint configuration in `eslint.config.mjs`
- Next.js recommended rules enabled
- TypeScript strict mode enforced

### Type Safety

- All new code must include proper TypeScript types
- Prisma generates database types automatically
- Use Zod for API request/response validation

### Code Organization

```
client/src/
├── app/           # Next.js App Router pages
├── components/    # Reusable React components
├── lib/          # Utilities, API clients, Prisma
└── types/        # TypeScript type definitions
```

## Commit and PR Guidelines

### Commit Message Format

```
type(scope): brief description

- Use present tense ("add feature" not "added feature")
- Keep first line under 50 characters
- Reference issues with #issue-number
```

**Types**: feat, fix, docs, style, refactor, test, chore

### Pull Request Process

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes with tests**
   - Write unit tests for new features
   - Update integration tests if needed
   - Ensure all tests pass

3. **Lint and type check**
   ```bash
   npm run lint:fix
   npm run type-check
   ```

4. **Build and test**
   ```bash
   npm run build
   npm test
   ```

5. **Create pull request**
   - Provide clear description
   - Link related issues
   - Request review from maintainers

### Review Criteria

- [ ] Code follows project conventions
- [ ] All tests pass
- [ ] TypeScript types are correct
- [ ] No security vulnerabilities introduced
- [ ] Documentation updated if needed

## Architecture Guidelines

### State Management

- **Server State**: React Query for API data
- **Local UI State**: Zustand for complex client state
- **Form State**: React Hook Form with Zod validation

### API Design

- RESTful endpoints in `src/app/api/`
- Request/response validation with Zod
- Error handling with proper HTTP status codes
- NextAuth.js for admin authentication

### Database Design

- Prisma ORM with MySQL
- SQLite for development/testing
- Migrations for schema changes
- Seed scripts for sample data

## Special Considerations

### Wedding-Specific Features

This is a production wedding website with specific requirements:

- **Guest Experience**: All features must work flawlessly for wedding guests
- **Mobile Responsiveness**: Many guests will use mobile devices
- **Performance**: Fast loading times are critical
- **Data Accuracy**: RSVP and guest information must be reliable

### Deployment Constraints

- **Dynamic Server**: Cannot use static export due to NextAuth.js
- **MySQL Required**: Production database is MySQL, not SQLite
- **Environment Variables**: All secrets must be properly configured

## Getting Help

### Documentation References

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [React Query Documentation](https://tanstack.com/query/latest)

### Project Documentation

- `ARCHITECTURE.md` - System architecture overview
- `SECURITY.md` - Security guidelines and secret management
- `docs/CI_PIPELINE_PLAN.md` - Planned CI/CD workflow

### Contact Information

- **Primary Contact**: codestromhub@gmail.com
- **Phone**: +880 1234-567890
- **Location**: Dhaka, Bangladesh

## Wedding Day Considerations

**This website will be live during Incia & Arvin's wedding celebration!**

- Test thoroughly before deploying
- Monitor performance and errors
- Have rollback plan ready
- Coordinate deployments with wedding timeline

Thank you for helping make Incia & Arvin's special day perfect! 🎉💒