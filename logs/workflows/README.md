# GitHub Actions Workflow Log Management System

## Purpose
This directory contains logs from failed GitHub Actions workflow runs for debugging and knowledge base purposes.

## Directory Structure:
```
logs/
├── workflows/           # GitHub Actions workflow logs
│   ├── .gitkeep        # Keep directory in git
│   ├── README.md       # This documentation
│   └── *.log           # Individual workflow failure logs
└── deployment/         # Deployment-specific logs (future)
```

## Naming Convention:
Format: `{workflow-name}_{job-name}_{date}_{issue-description}.log`

Examples:
- `deploy_backend_2025-01-27_migration-fix.log`
- `deploy_frontend_2025-01-27_build-error.log`
- `deploy_production_2025-01-28_env-config.log`

## Log Content Structure:
Each log file should contain:

1. **Header Information:**
   - Date and time of failure
   - Workflow name and job name
   - GitHub run ID (if available)
   - Issue summary

2. **Error Details:**
   - Complete error output
   - Error codes and stack traces
   - Environment variables (non-sensitive)

3. **Root Cause Analysis:**
   - Problem identification
   - Dependencies and relationships
   - Files affected

4. **Resolution Applied:**
   - Steps taken to fix the issue
   - Code changes made
   - Testing performed

5. **Status:**
   - Current status (IDENTIFIED, IN PROGRESS, RESOLVED)
   - Next steps if unresolved

## Previous Issues Resolved

### Backend Deployment Issues (RESOLVED)
- ❌ Missing `.env.example` file → ✅ Created with comprehensive wedding configuration
- ❌ Missing `public/index.php` and `.htaccess` → ✅ Added Laravel entry points
- ❌ Incorrect Composer cache path in workflow → ✅ Fixed cache path reference
- ❌ Database migration order issues → ✅ Fixed migration timestamps for proper dependency order
- ❌ Foreign key constraint failures → ✅ All tables created in correct order

### Frontend Build Issues (RESOLVED)  
- ❌ TypeScript compilation errors → ✅ All type checks passing
- ❌ ESLint warnings → ✅ No linting issues
- ❌ Build optimization issues → ✅ 103kB production bundle

## Current Status
- ✅ Backend: All 14 tests passing, Laravel 12.21.0 + Filament v3.3  
- ✅ Frontend: All 12 tests passing, Next.js 15.4.5 optimized build
- ✅ Database: Migration dependency order fixed, all constraints working
- ✅ Deployment: All critical files present and validated

## Usage:
When a workflow fails:
1. Create a new log file with the proper naming convention
2. Document the complete failure details
3. Perform root cause analysis
4. Update with resolution steps
5. Mark as resolved when fixed

This system helps maintain institutional knowledge and speeds up debugging of similar issues in the future.