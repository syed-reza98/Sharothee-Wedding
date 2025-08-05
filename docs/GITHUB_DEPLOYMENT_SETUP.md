# GitHub Deployment Setup Guide

This guide helps you set up GitHub Pages deployment for the development phase and cloud deployment for production.

## Quick Setup

### 1. Enable GitHub Pages

1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. No additional configuration needed - the workflow will handle everything

### 2. Required GitHub Secrets

Add these secrets in **Repository Settings** → **Secrets and variables** → **Actions**:

#### Development Secrets (Optional)
```
NEXT_PUBLIC_API_URL_DEV=https://your-dev-api.com/api
```

#### Production Secrets (Required for production deployment)
```
# Vercel Configuration
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id

# Production API URL
NEXT_PUBLIC_API_URL_PROD=https://api.yourdomain.com
```

### 3. Branch Protection (Recommended)

1. Go to **Settings** → **Branches**
2. Add protection rule for `main` branch:
   - Require pull request reviews
   - Require status checks to pass
   - Include administrators

## Deployment Flow

```
feature/* → develop → main
    ↓         ↓        ↓
  Tests    GitHub   Production
   Only    Pages    (Vercel)
```

### Development Deployment
- **Trigger**: Push to `develop` branch
- **Frontend**: Deployed to GitHub Pages
- **Backend**: Development API with SQLite
- **URL**: `https://[username].github.io/[repository]`

### Production Deployment  
- **Trigger**: Push to `main` branch
- **Frontend**: Deployed to Vercel
- **Backend**: Your chosen cloud provider
- **URL**: Your custom domain

## Testing the Deployment

1. **Run local tests**:
   ```bash
   ./test-e2e.sh
   ```

2. **Push to develop**:
   ```bash
   git checkout develop
   git push origin develop
   ```

3. **Check GitHub Actions**: 
   - Go to **Actions** tab
   - Monitor the workflow progress
   - Check for any failures

4. **Verify GitHub Pages**:
   - Go to **Settings** → **Pages**
   - Click the deployment URL
   - Test the website functionality

## Troubleshooting

### Common Issues

1. **Build artifacts not found**: 
   - The workflow now includes proper conditions to ensure build runs before upload

2. **GitHub Pages 404**:
   - Check if `.nojekyll` file is created during build
   - Verify static export is generated correctly

3. **API endpoints not working**:
   - Check environment variables are set correctly
   - Verify CORS settings for cross-origin requests

### Checking Logs

- **GitHub Actions**: Actions tab → Click on failed workflow
- **Local logs**: Check `/logs/workflows/` directory
- **Application logs**: Check browser console for frontend errors

## Next Steps

1. **Test the complete workflow** by merging this branch to `main`
2. **Set up production secrets** for Vercel deployment
3. **Configure custom domain** for production
4. **Set up monitoring** and error tracking
5. **Plan database migration** strategy for production

---

*The wedding website is now ready for GitHub deployment! 🚀*