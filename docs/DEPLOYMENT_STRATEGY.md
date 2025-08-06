# Wedding Website Deployment Strategy

## Overview
This document outlines the comprehensive deployment strategy for the Incia & Arvin Wedding Website, covering both development and production phases.

## Branching Strategy

### Branch Structure
- **`main`** - Production-ready code
  - Deploys to production cloud providers (Vercel, AWS, etc.)
  - Requires PR reviews and all tests passing
  - Protected branch with deployment gates

- **`develop`** - Development integration branch
  - Deploys to GitHub Pages for development testing
  - Used for feature integration and testing
  - Continuous deployment on push

- **`feature/*`** - Feature development branches
  - Runs tests and validation only
  - Must be merged to `develop` via PR
  - Short-lived branches for specific features

## Deployment Environments

### Development Phase (Current)

#### Frontend
- **Platform**: GitHub Pages
- **URL**: `https://[username].github.io/[repository]`
- **Trigger**: Push to `develop` branch
- **Features**: Static site deployment, automatic updates

#### Backend API
- **Platform**: GitHub Actions Runners (Development API)
- **Database**: SQLite (for testing)
- **Features**: Mock API endpoints, development data seeding

### Production Phase (Future)

#### Frontend  
- **Platform**: Vercel (recommended) or alternatives:
  - AWS CloudFront + S3
  - Google Cloud Storage + CDN
  - Azure Static Web Apps
  - Netlify
- **Trigger**: Push to `main` branch
- **Features**: Global CDN, custom domain, SSL

#### Backend
- **Platform Options**:
  - **Google Cloud Run** (recommended for Laravel)
  - **AWS Lambda** with Bref
  - **Railway** (simple deployment)
  - **DigitalOcean App Platform**
  - **Azure Container Apps**

## Workflow Configuration

### Required GitHub Secrets

#### Development Secrets
```
NEXT_PUBLIC_API_URL_DEV=https://api-dev.example.com
```

#### Production Secrets
```
# Vercel Configuration
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id  
VERCEL_PROJECT_ID=your_project_id

# Production API URL
NEXT_PUBLIC_API_URL_PROD=https://api.yourdomain.com

# Database Configuration (for cloud deployment)
DB_CONNECTION=mysql
DB_HOST=your_db_host
DB_PASSWORD=your_db_password
DB_USERNAME=your_db_username
```

### GitHub Pages Setup

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - No additional configuration needed

2. **Environment Protection**:
   - Settings → Environments → github-pages
   - Add deployment protection rules if needed

## Testing Strategy

### Automated Testing
- **Frontend**: Jest + React Testing Library (12 tests)
- **Backend**: Laravel PHPUnit (14 tests)
- **Coverage**: Minimum 80% backend coverage required
- **E2E**: Planned for production phase

### Test Environments
- **Local**: SQLite database for development
- **CI/CD**: MySQL in GitHub Actions
- **Staging**: Preview deployments on PRs

## Deployment Process

### Development Workflow
1. Create feature branch from `develop`
2. Implement feature with tests
3. Push to feature branch (runs tests only)
4. Create PR to `develop`
5. Merge PR (triggers development deployment)
6. Verify on GitHub Pages

### Production Workflow  
1. Create PR from `develop` to `main`
2. Code review and testing
3. Merge to `main` (triggers production deployment)
4. Verify on production environment

## Monitoring and Logging

### Workflow Logs
- **Location**: `/logs/workflows/`
- **Naming**: `{workflow}_{branch}_{timestamp}_{status}.log`
- **Retention**: Stored in repository for debugging
- **Auto-generated**: On workflow failures

### Deployment Status
- **GitHub Actions**: Real-time workflow status
- **GitHub Pages**: Deployment status in environment tab
- **Vercel**: Dashboard for production deployments

## Rollback Strategy

### Development
- Revert commit on `develop` branch
- Automatic redeployment to GitHub Pages

### Production
- Revert merge commit on `main` branch  
- Automatic rollback via cloud provider
- Database migrations may need manual intervention

## Performance Optimization

### Frontend
- Next.js static export for GitHub Pages
- Image optimization disabled for static export
- Asset compression and minification
- CDN delivery for production

### Backend
- Composer autoloader optimization
- Database query optimization
- Cache warming on deployment
- Resource monitoring

## Security Considerations

### Secrets Management
- No secrets in repository code
- Environment-specific secret management
- Regular secret rotation

### Dependencies  
- Regular security updates
- Automated vulnerability scanning
- Lock file management

## Future Enhancements

### Planned Improvements
1. **Container Deployment**: Docker configuration for consistent environments
2. **Database Migrations**: Automated migration strategy for production
3. **Monitoring**: Application performance monitoring (APM)
4. **CDN**: Global content delivery network setup
5. **SSL**: Custom domain with SSL certificates
6. **Backup**: Automated database backup strategy
7. **Load Testing**: Performance testing before production
8. **Blue-Green Deployment**: Zero-downtime deployment strategy

### Infrastructure as Code
- Terraform configurations for cloud resources
- Kubernetes manifests for container orchestration
- CI/CD pipeline improvements

## Support and Troubleshooting

### Common Issues
1. **Build Failures**: Check workflow logs in `/logs/workflows/`
2. **Environment Variables**: Verify GitHub secrets configuration
3. **Database Issues**: Check migration order and foreign keys
4. **Asset Loading**: Verify static asset paths for GitHub Pages

### Getting Help
- Check workflow logs for detailed error messages
- Review deployment documentation
- GitHub Actions logs provide step-by-step execution details

---

*Last Updated: August 2025*
*Version: 1.0*