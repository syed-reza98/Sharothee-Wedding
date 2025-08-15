# 📧 Open-Source Email & Media Storage Strategy

**Project:** Sharothee Wedding Website  
**Goal:** Replace paid services (Resend, Cloudinary) with open-source alternatives  
**Target:** Production & Development environments  
**Budget:** $0 (Free open-source solutions only)  

---

## 🔄 Current Service Dependencies

### 📧 Current Email Service: Resend
- **Usage:** Contact forms, RSVP notifications, admin alerts
- **Monthly Cost:** $20+ (paid plan)
- **Features Used:** Transactional emails, templates, analytics
- **API Integration:** `/api/contact`, `/api/rsvp`, admin notifications

### 📸 Current Media Storage: Cloudinary
- **Usage:** Photo uploads, image optimization, video storage
- **Monthly Cost:** $99+ (paid plan)
- **Features Used:** Image transformation, CDN, video processing
- **API Integration:** Gallery uploads, admin media management

**Total Monthly Savings Potential:** $119+ → $0

---

## 📧 Open-Source Email Solution

### 🎯 Recommended: Self-Hosted SMTP + EmailJS

**Solution Architecture:**

#### 1. SMTP Server Setup (Postfix + Dovecot)

```bash
# Install Postfix and Dovecot on VPS
sudo apt update
sudo apt install postfix dovecot-core dovecot-imapd dovecot-pop3d

# Configure Postfix for outbound emails
sudo nano /etc/postfix/main.cf
```

**Postfix Configuration:**
```bash
# /etc/postfix/main.cf
myhostname = mail.arvinwedsincia.com
mydomain = arvinwedsincia.com
myorigin = $mydomain
inet_interfaces = all
mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
home_mailbox = Maildir/

# SMTP Authentication
smtpd_sasl_type = dovecot
smtpd_sasl_path = private/auth
smtpd_sasl_auth_enable = yes
smtpd_tls_cert_file = /etc/letsencrypt/live/mail.arvinwedsincia.com/fullchain.pem
smtpd_tls_key_file = /etc/letsencrypt/live/mail.arvinwedsincia.com/privkey.pem
smtpd_use_tls = yes
```

#### 2. DNS Configuration

```dns
# Add to DNS records
mail.arvinwedsincia.com    A     31.97.189.238
arvinwedsincia.com        MX    10 mail.arvinwedsincia.com
arvinwedsincia.com        TXT   "v=spf1 mx a:mail.arvinwedsincia.com ~all"

# DKIM setup
_domainkey.arvinwedsincia.com  TXT  "t=y; o=~;"
```

#### 3. Next.js Integration

```typescript
// src/lib/email.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: 'mail.arvinwedsincia.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER, // wedding@arvinwedsincia.com
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})

export async function sendEmail({
  to,
  subject,
  html,
  text
}: {
  to: string
  subject: string
  html: string
  text?: string
}) {
  try {
    const info = await transporter.sendMail({
      from: '"Incia & Arvin Wedding" <wedding@arvinwedsincia.com>',
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, '')
    })
    
    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email failed:', error)
    return { success: false, error: error.message }
  }
}
```

#### 4. Email Templates

```typescript
// src/lib/email-templates.ts
export const emailTemplates = {
  rsvpConfirmation: (guestName: string, eventDetails: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #d4af37;">RSVP Confirmed!</h1>
      <p>Dear ${guestName},</p>
      <p>Thank you for confirming your attendance to our wedding celebration!</p>
      <div style="background: #f9f9f9; padding: 20px; margin: 20px 0;">
        ${eventDetails}
      </div>
      <p>We can't wait to celebrate with you!</p>
      <p>With love,<br>Incia & Arvin</p>
    </div>
  `,
  
  contactFormSubmission: (name: string, email: string, message: string) => `
    <div style="font-family: Arial, sans-serif;">
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #d4af37;">
        ${message}
      </div>
    </div>
  `
}
```

### 🔧 Alternative: EmailJS (Client-Side)

**For simpler setup without SMTP server:**

```bash
npm install @emailjs/browser
```

```typescript
// src/lib/emailjs.ts
import emailjs from '@emailjs/browser'

emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)

export async function sendEmailJS(templateParams: Record<string, any>) {
  try {
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams
    )
    return { success: true, response }
  } catch (error) {
    return { success: false, error }
  }
}
```

**EmailJS Configuration:**
- Create account at emailjs.com (free: 200 emails/month)
- Connect Gmail/Outlook account
- Create email templates
- Add service ID and template ID to environment

---

## 📸 Open-Source Media Storage Solution

### 🎯 Recommended: MinIO Object Storage

**Solution Architecture:**

#### 1. MinIO Server Setup

```bash
# Install MinIO on VPS
wget https://dl.min.io/server/minio/release/linux-amd64/minio
chmod +x minio
sudo mv minio /usr/local/bin/

# Create MinIO user and directories
sudo useradd -r minio-user -s /sbin/nologin
sudo mkdir -p /usr/local/share/minio
sudo mkdir -p /etc/minio
sudo mkdir -p /var/lib/minio
sudo chown minio-user:minio-user /var/lib/minio

# Create MinIO environment file
sudo nano /etc/default/minio
```

**MinIO Configuration:**
```bash
# /etc/default/minio
MINIO_VOLUMES="/var/lib/minio"
MINIO_OPTS="--certs-dir /etc/minio/certs --console-address :9001"
MINIO_ROOT_USER=weddingadmin
MINIO_ROOT_PASSWORD=securepassword123
```

#### 2. Systemd Service

```bash
# Create systemd service
sudo nano /etc/systemd/system/minio.service
```

```ini
[Unit]
Description=MinIO Object Storage
Documentation=https://docs.min.io
Wants=network-online.target
After=network-online.target
AssertFileIsExecutable=/usr/local/bin/minio

[Service]
WorkingDirectory=/usr/local/
User=minio-user
Group=minio-user
ProtectProc=invisible
EnvironmentFile=/etc/default/minio
ExecStartPre=/bin/bash -c "if [ -z \"${MINIO_VOLUMES}\" ]; then echo \"Variable MINIO_VOLUMES not set in /etc/default/minio\"; exit 1; fi"
ExecStart=/usr/local/bin/minio server $MINIO_OPTS $MINIO_VOLUMES
Restart=always
LimitNOFILE=65536
TasksMax=infinity
TimeoutStopSec=infinity
SendSIGKILL=no

[Install]
WantedBy=multi-user.target
```

#### 3. Nginx Configuration for MinIO

```nginx
# /etc/nginx/sites-available/minio
server {
    listen 443 ssl;
    server_name media.arvinwedsincia.com;
    
    ssl_certificate /etc/letsencrypt/live/media.arvinwedsincia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/media.arvinwedsincia.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:9000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # MinIO specific headers
        proxy_connect_timeout 300;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        chunked_transfer_encoding off;
    }
}

# MinIO Console
server {
    listen 443 ssl;
    server_name minio-admin.arvinwedsincia.com;
    
    ssl_certificate /etc/letsencrypt/live/minio-admin.arvinwedsincia.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/minio-admin.arvinwedsincia.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:9001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 4. Next.js Integration

```typescript
// src/lib/minio.ts
import { Client } from 'minio'

const minioClient = new Client({
  endPoint: 'media.arvinwedsincia.com',
  port: 443,
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!
})

export async function uploadToMinio(
  file: File | Buffer,
  filename: string,
  bucketName: string = 'wedding-media'
) {
  try {
    // Ensure bucket exists
    const bucketExists = await minioClient.bucketExists(bucketName)
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName, 'us-east-1')
    }
    
    // Upload file
    const etag = await minioClient.putObject(
      bucketName,
      filename,
      file instanceof File ? Buffer.from(await file.arrayBuffer()) : file,
      file instanceof File ? file.size : file.length,
      {
        'Content-Type': file instanceof File ? file.type : 'application/octet-stream'
      }
    )
    
    // Get public URL
    const url = `https://media.arvinwedsincia.com/${bucketName}/${filename}`
    
    return { success: true, url, etag }
  } catch (error) {
    console.error('MinIO upload failed:', error)
    return { success: false, error: error.message }
  }
}

export async function getSignedUrl(filename: string, bucketName: string = 'wedding-media') {
  try {
    const url = await minioClient.presignedGetObject(bucketName, filename, 24 * 60 * 60) // 24 hours
    return { success: true, url }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

#### 5. Image Processing (Sharp)

```typescript
// src/lib/image-processing.ts
import sharp from 'sharp'

export async function processImage(
  buffer: Buffer,
  filename: string
): Promise<{
  original: Buffer
  thumbnail: Buffer
  medium: Buffer
  optimized: Buffer
}> {
  const baseFilename = filename.split('.')[0]
  
  const [original, thumbnail, medium, optimized] = await Promise.all([
    // Original (just convert to WebP if not already)
    sharp(buffer)
      .webp({ quality: 95 })
      .toBuffer(),
    
    // Thumbnail (300x300)
    sharp(buffer)
      .resize(300, 300, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 80 })
      .toBuffer(),
    
    // Medium (800x600)
    sharp(buffer)
      .resize(800, 600, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 85 })
      .toBuffer(),
    
    // Optimized (1200x900)
    sharp(buffer)
      .resize(1200, 900, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 90 })
      .toBuffer()
  ])
  
  return { original, thumbnail, medium, optimized }
}
```

### 🔧 Alternative: Local File Storage + CDN

**For simpler setup:**

```typescript
// src/lib/local-storage.ts
import fs from 'fs'
import path from 'path'

const UPLOAD_DIR = '/var/www/wedding/uploads'

export async function saveFileLocally(file: File, filename: string) {
  const filePath = path.join(UPLOAD_DIR, filename)
  const buffer = Buffer.from(await file.arrayBuffer())
  
  // Ensure directory exists
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
  
  // Save file
  await fs.promises.writeFile(filePath, buffer)
  
  return {
    success: true,
    url: `/uploads/${filename}`,
    path: filePath
  }
}
```

**Nginx static file serving:**
```nginx
location /uploads/ {
    alias /var/www/wedding/uploads/;
    expires 30d;
    add_header Cache-Control "public, no-transform";
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    
    # Allowed file types
    location ~* \.(jpg|jpeg|png|gif|webp|mp4|mov)$ {
        try_files $uri =404;
    }
}
```

---

## 🔄 Migration Plan

### Phase 1: Email Migration (Week 1)

**Day 1-2: SMTP Setup**
```bash
# Set up SMTP server
sudo apt install postfix dovecot-core
# Configure DNS records
# Test email sending
```

**Day 3-4: Next.js Integration**
```bash
# Update email service
npm install nodemailer
# Replace Resend API calls
# Update environment variables
```

**Day 5: Testing & Deployment**
```bash
# Test all email functionality
# Deploy to staging
# Deploy to production
```

### Phase 2: Media Migration (Week 2)

**Day 1-3: MinIO Setup**
```bash
# Install MinIO server
# Configure Nginx proxy
# Set up SSL certificates
# Create buckets and policies
```

**Day 4-5: Next.js Integration**
```bash
# Install MinIO client
npm install minio sharp
# Update media upload API
# Migrate existing media files
```

**Day 6-7: Testing & Deployment**
```bash
# Test all media functionality
# Performance testing
# Deploy to production
```

---

## 💰 Cost Comparison

| Service | Current (Monthly) | Open-Source | Savings |
|---------|------------------|-------------|---------|
| Email (Resend) | $20+ | $0 | $20+ |
| Media Storage (Cloudinary) | $99+ | $0 | $99+ |
| **Total** | **$119+** | **$0** | **$119+** |

**Annual Savings:** $1,428+

---

## 📊 Performance Considerations

### Email Performance
- **SMTP Server:** Self-hosted = instant delivery
- **Reliability:** 99.9% uptime with proper monitoring
- **Volume:** Unlimited emails (server capacity dependent)
- **Features:** Full control over templates, analytics, logs

### Media Performance
- **MinIO:** S3-compatible, high performance
- **CDN:** Can add Cloudflare free CDN layer
- **Storage:** Limited only by VPS disk space
- **Bandwidth:** VPS bandwidth limits apply

---

## 🔧 Environment Configuration

```bash
# .env.local updates

# Replace Resend
RESEND_API_KEY="" # Remove
SMTP_HOST="mail.arvinwedsincia.com"
SMTP_PORT="587"
SMTP_USER="wedding@arvinwedsincia.com"
SMTP_PASS="secure_email_password"

# Replace Cloudinary
CLOUDINARY_CLOUD_NAME="" # Remove
CLOUDINARY_API_KEY="" # Remove
CLOUDINARY_API_SECRET="" # Remove
MINIO_ENDPOINT="media.arvinwedsincia.com"
MINIO_ACCESS_KEY="wedding_access_key"
MINIO_SECRET_KEY="wedding_secret_key"
MINIO_BUCKET_NAME="wedding-media"
```

---

## 🚀 Implementation Timeline

**Total Time:** 2 weeks
**Downtime:** <1 hour (for DNS propagation)
**Risk Level:** Low (gradual migration possible)

**Week 1: Email Migration**
- Days 1-2: SMTP server setup and DNS configuration
- Days 3-4: Code integration and testing
- Days 5-7: Production deployment and monitoring

**Week 2: Media Migration**
- Days 1-3: MinIO setup and configuration
- Days 4-5: Code integration and data migration
- Days 6-7: Production deployment and optimization

**Benefits:**
- $119+ monthly savings
- Full control over services
- No vendor lock-in
- Enhanced privacy
- Unlimited usage (within server capacity)

**Risks:**
- Server maintenance responsibility
- Backup and monitoring required
- Initial setup complexity
- SMTP deliverability concerns (mitigated with proper DNS/SPF/DKIM)

**Next Steps:**
1. Backup current production data
2. Set up staging environment for testing
3. Implement email migration first (lower risk)
4. Test thoroughly before media migration
5. Monitor performance and deliverability post-migration
