# Deploying Client Folder & Database on Hostinger VPS (Ubuntu)

This guide explains how to deploy your frontend (client folder) and database to your Hostinger VPS using Ubuntu 24.04 LTS.  
Assumes your code and database dump are stored in a GitHub repository.

---

## Prerequisites

- Hostinger VPS with Ubuntu 24.04 LTS
- Root SSH access (`ssh root@31.97.189.238`)
- Domain pointed to VPS (DNS already set up)
- Your code and SQL dump pushed to GitHub

---

## 1. SSH Into Your VPS

```bash
ssh root@31.97.189.238
```

---

## 2. Update System & Install Dependencies

```bash
apt update && apt upgrade -y
apt install -y git nginx mysql-server
# If using PostgreSQL instead of MySQL:
# apt install -y postgresql postgresql-contrib
```

---

## 3. Clone Your Repository

```bash
cd /var/www
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>/client
```

---

## 4. Build the Client Application

```bash
apt install -y nodejs npm
npm install
npm run build
# Output will be in 'build' or 'dist' directory
```

---

## 5. Deploy Client Build with Nginx

1. Configure Nginx:
    ```bash
    nano /etc/nginx/sites-available/yourdomain.com
    ```
    Example config:
    ```
    server {
        listen 80;
        server_name yourdomain.com www.yourdomain.com;

        root /var/www/<your-repo>/client/build;
        index index.html index.htm;

        location / {
            try_files $uri /index.html;
        }
    }
    ```
2. Enable the config and reload Nginx:
    ```bash
    ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
    nginx -t
    systemctl reload nginx
    ```

---

## 6. Set Up the Database

### For MySQL:

1. Secure MySQL installation:
    ```bash
    mysql_secure_installation
    ```
2. Create database and user:
    ```bash
    mysql -u root -p
    CREATE DATABASE mydb;
    CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'mypassword';
    GRANT ALL PRIVILEGES ON mydb.* TO 'myuser'@'localhost';
    FLUSH PRIVILEGES;
    EXIT;
    ```
3. Import your database dump:
    ```bash
    mysql -u myuser -p mydb < /path/to/your/db_dump.sql
    ```

---

## 7. Configure Environment Variables

- For frontend: Edit the `.env.production` file before building if you need to change API URLs, etc.
- For backend (if using), update `.env` or config files accordingly.

---

## 8. (Optional) Deploy the Backend/API

- If you have a backend (Node.js, etc.), set it up under `/var/www/<your-repo>/server` or similar.
- Use [PM2](https://pm2.keymetrics.io/) or `systemd` to keep your backend running.
- Update Nginx config for API reverse proxy if necessary.

---

## 9. Test Your Deployment

- Visit `http://yourdomain.com` in your browser.
- Confirm your client loads and database connections work.

---

## Troubleshooting

- Check Nginx logs: `/var/log/nginx/error.log`
- Check application logs if using a backend
- Use `systemctl status nginx` to check Nginx status

---

## Useful Commands

- Restart Nginx: `systemctl restart nginx`
- MySQL login: `mysql -u root -p`
- Deploy new client build: Re-run build and copy files to `/var/www/<your-repo>/client/build`

---

## Security Recommendations

- Change default SSH password.
- Set up a firewall (`ufw allow 'Nginx Full'`).
- Set up SSL (Let's Encrypt):  
    ```bash
    apt install -y certbot python3-certbot-nginx
    certbot --nginx
    ```

---

**Done! Your client and database are deployed on Hostinger VPS.**
