# Security Policy

## 🔒 Security Overview

The Sharothee Wedding Website implements multiple security layers to protect user data, prevent unauthorized access, and ensure safe operation in production environments.

## 🚨 Special Notice: Intentional Credentials Documentation

**Important**: This repository contains intentionally committed credentials and server information in designated folders (`Hostinger VPS SSH and API Credentials/`, `other_files/`) as per owner requirements for production deployment purposes. These files:

- ✅ Are intentionally committed by the repository owner
- ✅ Are clearly labeled and organized in dedicated folders  
- ✅ Are required for production deployment on Hostinger VPS
- ⚠️ **Must be handled with extreme care and responsibility**
- ⚠️ **Should not be accessed or shared without explicit authorization**

## 🛡️ Security Architecture

### Authentication & Authorization

#### Admin Authentication
- **Framework**: NextAuth.js with JWT strategy
- **Session Management**: Secure JWT tokens with configurable expiration
- **Admin Access**: Fixed credentials via environment variables
- **Route Protection**: Server-side session validation for admin routes

#### Guest Authentication  
- **Token System**: Secure uppercase alphanumeric tokens (not passwords)
- **Validation Flow**: `/api/rsvp/validate` → `/api/rsvp/submit`
- **Single-use Tokens**: Each guest receives a unique RSVP token
- **No Registration**: Guests cannot create accounts or modify their tokens

### API Security

#### Route Protection
```typescript
// Admin routes require session validation
const session = await getServerSession(authOptions)
if (!session) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
```

#### Input Validation
- **Framework**: Zod schemas for all API inputs
- **Sanitization**: Automatic type conversion and validation
- **Error Handling**: Structured error responses without sensitive data exposure

#### CORS Configuration
- **Origin Control**: Restricted to application domain
- **Method Limitation**: Only required HTTP methods allowed
- **Credential Handling**: Secure cookie and session management

### Database Security

#### Connection Security
- **Development**: Local SQLite file with file system permissions
- **Production**: MySQL with encrypted connections and user restrictions
- **Connection Pooling**: Managed via Prisma with connection limits

#### Data Protection
- **Query Parameterization**: All queries use Prisma ORM parameterization
- **Access Control**: Database users have minimum required permissions
- **Backup Encryption**: Production backups encrypted at rest

## 🔐 Secrets Management

### Environment Variables

#### Required Security Variables
```bash
# JWT signing (CRITICAL - must be 32+ characters)
NEXTAUTH_SECRET="secure-random-string-minimum-32-characters"

# Admin credentials (use strong passwords in production)
ADMIN_EMAIL="admin@arvinwedsincia.com"
ADMIN_PASSWORD="secure-password-here"

# Database connection (secure credentials)
DATABASE_URL="mysql://user:password@host:port/database"
```

#### Development vs Production
- **Development**: Use `.env.local` with development-safe values
- **Production**: Use `.env.production` with production-grade secrets
- **Never Commit**: Environment files must never be committed to version control

### External Service Security

#### Cloudinary (Media Management)
- **API Keys**: Stored as environment variables
- **Upload Restrictions**: File type and size limitations
- **Content Moderation**: Admin approval required for guest uploads

#### Resend (Email Service)
- **API Authentication**: Secure API key authentication
- **Rate Limiting**: Built-in service rate limiting
- **Template Security**: Server-side email template rendering

## 🚀 Security Recommendations

### Priority 1: Immediate Security Enhancements

1. **Implement Rate Limiting**
   ```typescript
   // Recommended: Add rate limiting middleware
   import rateLimit from 'express-rate-limit'
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   })
   ```

2. **Add CSRF Protection**
   ```typescript
   // Recommended: CSRF tokens for state-changing operations
   import { csrf } from 'next-csrf'
   ```

3. **Enhance Input Sanitization**
   ```typescript
   // Current: Zod validation
   // Recommended: Add DOMPurify for HTML content
   import DOMPurify from 'dompurify'
   ```

### Priority 2: Advanced Security Features

1. **Content Security Policy (CSP)**
   ```typescript
   // next.config.ts
   const securityHeaders = [
     {
       key: 'Content-Security-Policy',
       value: "default-src 'self'; script-src 'self' 'unsafe-eval';"
     }
   ]
   ```

2. **Security Headers**
   ```typescript
   // Recommended security headers
   'X-Frame-Options': 'DENY',
   'X-Content-Type-Options': 'nosniff',
   'Referrer-Policy': 'strict-origin-when-cross-origin'
   ```

3. **Session Security**
   ```typescript
   // Enhanced session configuration
   session: {
     strategy: 'jwt',
     maxAge: 30 * 60, // 30 minutes
     updateAge: 24 * 60 * 60, // 24 hours
   }
   ```

## 🚨 Incident Response

### Security Incident Procedure

1. **Immediate Response**
   - Identify and isolate the security issue
   - Document the incident with timestamp and details
   - Notify repository owner and development team

2. **Assessment**
   - Determine scope and impact of the incident
   - Identify affected systems and data
   - Assess potential data exposure or system compromise

3. **Containment**
   - Implement immediate containment measures
   - Revoke compromised credentials if applicable
   - Apply temporary security patches

4. **Resolution**
   - Develop and test permanent fix
   - Deploy security updates
   - Verify resolution effectiveness

5. **Recovery**
   - Restore normal operations
   - Monitor for recurring issues
   - Update security documentation

### Emergency Contacts

- **Repository Owner**: syed.reza181@gmail.com
- **Development Team**: hello@inciaandarvins.wedding
- **Production Hosting**: Hostinger VPS support

## 🔍 Security Auditing

### Regular Security Checks

1. **Code Review**
   - Review all Pull Requests for security implications
   - Check for hardcoded secrets or credentials
   - Validate input sanitization and output encoding

2. **Dependency Auditing**
   ```bash
   # Regular dependency security audits
   npm audit
   npm audit fix
   ```

3. **Environment Auditing**
   ```bash
   # Verify environment security
   npm run security:audit
   npm run env:validate
   ```

### Automated Security Tools

- **ESLint Security**: Security-focused linting rules
- **npm audit**: Dependency vulnerability scanning  
- **TypeScript**: Type safety for runtime security
- **Prisma**: SQL injection protection via ORM

## 📋 Security Checklist

### Pre-Deployment Security Verification

- [ ] All environment variables properly configured
- [ ] No hardcoded secrets in source code
- [ ] Database connections use encrypted transport
- [ ] Admin credentials are production-strength
- [ ] API endpoints implement proper validation
- [ ] External service credentials are secured
- [ ] SSL/TLS certificates are valid and configured
- [ ] Security headers are implemented
- [ ] Rate limiting is active for public endpoints

### Post-Deployment Security Monitoring

- [ ] Monitor application logs for suspicious activity
- [ ] Regular security audits of dependencies
- [ ] Periodic review of access credentials
- [ ] Backup and disaster recovery testing
- [ ] Security incident response plan testing

## 📞 Reporting Security Issues

### Responsible Disclosure

If you discover a security vulnerability, please:

1. **Do NOT** create a public GitHub issue
2. **Email directly** to: syed.reza181@gmail.com
3. **Include details**: 
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact assessment
   - Suggested remediation if known

### Response Timeline

- **Initial Response**: Within 24 hours
- **Assessment**: Within 72 hours  
- **Resolution**: Based on severity (Critical: 24-48 hours, High: 1 week, Medium: 2 weeks)
- **Disclosure**: After fix deployment and verification

## 📜 Compliance & Standards

### Security Standards Alignment

- **OWASP Top 10**: Protection against common web vulnerabilities
- **GDPR**: Data protection and privacy compliance (where applicable)
- **Industry Best Practices**: Following Next.js and React security guidelines

### Data Handling

- **Personal Data**: RSVP information, contact details, preferences
- **Retention**: Data retained only as long as necessary for event purposes
- **Access**: Limited access on need-to-know basis
- **Deletion**: Post-event data purging procedures

---

**Last Updated**: 2025-08-14  
**Repository**: syed-reza98/Sharothee-Wedding  
**Security Contact**: syed.reza181@gmail.com