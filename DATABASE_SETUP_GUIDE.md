# Wedding Website - MySQL Production Setup

## 🗄️ MySQL Database Configuration

### For VPS/Production Deployment

```bash
# 1. Install MySQL Server
sudo apt update
sudo apt install mysql-server

# 2. Secure MySQL installation
sudo mysql_secure_installation

# 3. Create wedding database and user
sudo mysql -u root -p
```

```sql
-- Create database
CREATE DATABASE wedding_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create dedicated user
CREATE USER 'wedding_user'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD_HERE';

-- Grant permissions
GRANT ALL PRIVILEGES ON wedding_db.* TO 'wedding_user'@'localhost';
FLUSH PRIVILEGES;

-- Verify setup
SHOW DATABASES;
SELECT User, Host FROM mysql.user WHERE User='wedding_user';

-- Exit MySQL
EXIT;
```

### Environment Configuration

```bash
# Production .env.local file
DATABASE_URL="mysql://wedding_user:STRONG_PASSWORD_HERE@localhost:3306/wedding_db"
NEXTAUTH_SECRET="GENERATE_STRONG_SECRET_HERE"
NEXTAUTH_URL="https://your-domain.com"
ADMIN_EMAIL="admin@wedding.com"
ADMIN_PASSWORD="SECURE_PASSWORD"
RESEND_API_KEY="re_your_api_key"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### Schema Update for MySQL

Update prisma/schema.prisma:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// Update Text fields for MySQL
model Account {
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  id_token          String? @db.Text
  // ... rest of model
}

model Hotel {
  amenities   String? @db.Text
  // ... rest of model
}
```

### Migration Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Run seed script
npm run db:seed

# Verify database
npx prisma studio
```

## 🔧 Local Development Options

### Option 1: SQLite (Current - No Setup Required)
- ✅ Already configured
- ✅ No server installation needed
- ✅ Perfect for development and testing

### Option 2: Local MySQL
```bash
# Windows (using XAMPP/WAMP)
1. Install XAMPP
2. Start MySQL service
3. Update DATABASE_URL in .env

# macOS (using Homebrew)
brew install mysql
brew services start mysql

# Ubuntu/WSL
sudo apt install mysql-server
sudo systemctl start mysql
```

## 🚀 Deployment Process

### 1. Prepare for Production
```bash
# Update schema for MySQL
# Update environment variables
# Test locally with MySQL
```

### 2. VPS Deployment
```bash
# Clone repository
git clone [repository-url]
cd client

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with production values

# Setup database
npx prisma generate
npx prisma db push
npm run db:seed

# Build application
npm run build

# Start with PM2
pm2 start npm --name "wedding-app" -- start
```

### 3. Verification
- [ ] Database connection successful
- [ ] All tables created
- [ ] Sample data seeded
- [ ] Admin login working
- [ ] All routes accessible
- [ ] API endpoints responding

## 📊 Database Schema Status

✅ **Complete Models:**
- User (NextAuth)
- Account (NextAuth)
- Session (NextAuth)
- VerificationToken (NextAuth)
- Guest
- Venue
- Event
- RSVP
- Hotel
- MediaItem
- Stream
- ContactRequest

✅ **Relationships:**
- All foreign keys properly defined
- Cascade deletes configured
- Unique constraints in place

✅ **Data Types:**
- Enums for status fields
- Proper text fields for long content
- DateTime fields for dates
- Boolean flags for features
