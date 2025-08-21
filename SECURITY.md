# Security Policy

## Environment Variables and Secret Management

### Secret Handling Guidelines

1. **Never commit secrets to Git history**
   - Use `.env.local` or `.env.production` for sensitive data
   - These files are excluded in `.gitignore` by default

2. **Environment File Structure**
   - `.env.example` - Template with dummy values (safe to commit)
   - `.env.local` - Development secrets (never commit)
   - `.env.production` - Production secrets (never commit)

3. **Required Secrets**
   - `DATABASE_URL` - MySQL connection string
   - `NEXTAUTH_SECRET` - NextAuth.js session encryption key
   - `RESEND_API_KEY` - Email service API key
   - `CLOUDINARY_*` - Image upload service credentials

### Credential Rotation

1. **Regular Rotation Schedule**
   - Database passwords: Every 90 days
   - API keys: Every 180 days
   - NextAuth secret: Every 365 days

2. **Emergency Rotation**
   - Immediately rotate if credentials are exposed
   - Update all deployment environments
   - Revoke compromised credentials at source

### Git History Cleanup

**IMPORTANT NOTE FOR MAINTAINERS:**
If sensitive data was ever committed to Git history, it must be purged immediately:

1. Use `git filter-branch` or BFG Repo-Cleaner to remove secrets
2. Force push the cleaned history
3. Rotate all exposed credentials immediately
4. Notify all team members to re-clone the repository

```bash
# Example cleanup command (use with caution)
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch .env.production' \
--prune-empty --tag-name-filter cat -- --all
```

## Reporting Vulnerabilities

### Security Contact Information

- **Primary Contact**: codestromhub@gmail.com
- **Phone**: +880 1234-567890
- **Location**: Dhaka, Bangladesh

### Reporting Process

1. **DO NOT** create public GitHub issues for security vulnerabilities
2. Email security concerns directly to the primary contact
3. Include detailed description and reproduction steps
4. Allow 48 hours for initial response
5. Allow 7 days for vulnerability assessment

### Response Timeline

- **Critical vulnerabilities**: Patched within 24 hours
- **High severity**: Patched within 72 hours  
- **Medium/Low severity**: Patched within 2 weeks

## Security Measures

### Authentication
- NextAuth.js with secure session management
- Admin-only routes protected with middleware
- Strong password requirements enforced

### Data Protection
- MySQL database with encrypted connections
- Environment-based configuration isolation
- No sensitive data in client-side code

### Deployment Security
- HTTPS/SSL enforcement in production
- Security headers via Next.js configuration
- Regular dependency vulnerability scanning

## Compliance

This wedding website handles:
- Guest personal information (names, dietary restrictions)
- RSVP responses and attendance data
- Contact information and preferences

Data is processed in accordance with applicable privacy laws and retained only for wedding planning purposes.