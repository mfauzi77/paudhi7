# Panduan Deployment PAUD HI di Ubuntu Server

## 📋 Daftar Isi
1. [Persiapan Server](#persiapan-server)
2. [Prasyarat](#prasyarat)
3. [Deployment Otomatis](#deployment-otomatis)
4. [Deployment Manual](#deployment-manual)
5. [Konfigurasi SSL](#konfigurasi-ssl)
6. [Troubleshooting](#troubleshooting)
7. [Maintenance](#maintenance)

## 🖥️ Persiapan Server

### Spesifikasi Minimum Server
- **OS**: Ubuntu 20.04 LTS atau lebih baru
- **RAM**: 2GB minimum, 4GB recommended
- **Storage**: 20GB minimum
- **CPU**: 2 cores minimum
- **Network**: Akses internet dan domain yang sudah dikonfigurasi

### Domain dan DNS
Pastikan domain `paudhi.kemenkopmk.go.id` sudah mengarah ke IP server:
```bash
# Cek DNS resolution
nslookup paudhi.kemenkopmk.go.id
dig paudhi.kemenkopmk.go.id
```

## 🔧 Prasyarat

### 1. Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Git (jika belum ada)
```bash
sudo apt install git -y
```

### 3. Clone Repository
```bash
cd /opt
sudo git clone https://github.com/your-repo/paudhi.git
cd paudhi
```

## 🚀 Deployment Otomatis

### Menggunakan Script Deploy.sh
Script `deploy.sh` akan menginstall dan mengkonfigurasi semua komponen secara otomatis.

```bash
# Pastikan berada di direktori project
cd /opt/paudhi

# Jalankan script deployment
sudo ./deploy.sh
```

Script akan melakukan:
- ✅ Install Node.js LTS dan PM2
- ✅ Install dan konfigurasi Apache2
- ✅ Install dan setup MongoDB
- ✅ Deploy backend dan frontend
- ✅ Konfigurasi SSL (Let's Encrypt atau manual)
- ✅ Setup firewall
- ✅ Buat systemd service

### Monitoring Progress
Script akan menampilkan log berwarna:
- 🔵 **[INFO]**: Informasi proses
- 🟢 **[SUCCESS]**: Berhasil
- 🟡 **[WARNING]**: Peringatan
- 🔴 **[ERROR]**: Error

## 🔨 Deployment Manual

Jika ingin melakukan deployment manual atau troubleshooting:

### 1. Install Dependencies
```bash
# System packages
sudo apt install -y curl wget git build-essential apache2 apache2-utils mongodb

# Node.js LTS
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo bash -
sudo apt-get install -y nodejs

# PM2
sudo npm install -g pm2
```

### 2. Enable Apache Modules
```bash
sudo a2enmod rewrite ssl proxy proxy_http proxy_wstunnel headers expires deflate
```

### 3. Setup MongoDB
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 4. Deploy Backend
```bash
# Create directory
sudo mkdir -p /srv/paudhi/backend

# Copy files
sudo cp -r backend/* /srv/paudhi/backend/

# Set permissions
sudo chown -R www-data:www-data /srv/paudhi/backend

# Install dependencies
cd /srv/paudhi/backend
sudo -u www-data npm ci --only=production

# Create upload directories
sudo -u www-data node scripts/createUploadDirs.js

# Start with PM2
sudo -u www-data pm2 start server.js --name paudhi-backend
sudo -u www-data pm2 save
```

### 5. Deploy Frontend
```bash
# Build frontend
cd /opt/paudhi
npm ci
npm run build

# Deploy to web root
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

### 6. Configure Apache
```bash
# Copy configuration
sudo cp srv/conf/paudhi.conf /etc/apache2/sites-available/

# Enable site
sudo a2dissite 000-default
sudo a2ensite paudhi

# Test and restart
sudo apache2ctl configtest
sudo systemctl restart apache2
```

## 🔒 Konfigurasi SSL

### Opsi 1: SSL Certificate Manual
Jika Anda memiliki SSL certificate:

1. **Copy certificate ke server:**
```bash
sudo mkdir -p /etc/ssl/kemenkopmk
sudo cp your-certificate.crt /etc/ssl/kemenkopmk/paudhi.crt
sudo cp your-private.key /etc/ssl/kemenkopmk/paudhi.key
sudo cp your-chain.crt /etc/ssl/kemenkopmk/paudhi-chain.crt
```

2. **Set permissions:**
```bash
sudo chown root:root /etc/ssl/kemenkopmk/*
sudo chmod 600 /etc/ssl/kemenkopmk/*.key
sudo chmod 644 /etc/ssl/kemenkopmk/*.crt
```

### Opsi 2: Let's Encrypt (Gratis)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-apache -y

# Generate certificate
sudo certbot --apache -d paudhi.kemenkopmk.go.id
```

### Opsi 3: Self-Signed (Development Only)
```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/kemenkopmk/paudhi.key \
    -out /etc/ssl/kemenkopmk/paudhi.crt \
    -subj "/C=ID/ST=Jakarta/L=Jakarta/O=Kemenko PMK/CN=paudhi.kemenkopmk.go.id"
```

## 🔥 Firewall Configuration
```bash
# Install UFW
sudo apt install ufw -y

# Allow necessary ports
sudo ufw allow ssh
sudo ufw allow 'Apache Full'

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

## 🔍 Troubleshooting

### Cek Status Services
```bash
# Apache
sudo systemctl status apache2

# MongoDB
sudo systemctl status mongod

# Backend (systemd)
sudo systemctl status paudhi-backend

# Backend (PM2)
sudo -u www-data pm2 status
```

### Cek Logs
```bash
# Apache logs
sudo tail -f /var/log/apache2/paudhi_ssl_error.log
sudo tail -f /var/log/apache2/paudhi_ssl_access.log

# Backend logs (PM2)
sudo -u www-data pm2 logs paudhi-backend

# System logs
sudo journalctl -u paudhi-backend -f
```

### Test Connectivity
```bash
# Test backend API
curl -I http://localhost:5000/api/health

# Test frontend
curl -I http://localhost/

# Test HTTPS
curl -I https://paudhi.kemenkopmk.go.id/api/health
```

### Common Issues

#### 1. Backend tidak bisa connect ke MongoDB
```bash
# Cek MongoDB status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Cek environment variables
cat /srv/paudhi/backend/.env
```

#### 2. Apache tidak bisa start
```bash
# Test configuration
sudo apache2ctl configtest

# Cek syntax error
sudo apache2ctl -S

# Restart Apache
sudo systemctl restart apache2
```

#### 3. SSL Certificate Error
```bash
# Cek certificate files
ls -la /etc/ssl/kemenkopmk/

# Test SSL
openssl s_client -connect paudhi.kemenkopmk.go.id:443
```

#### 4. Permission Issues
```bash
# Fix web root permissions
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html

# Fix backend permissions
sudo chown -R www-data:www-data /srv/paudhi/backend
```

## 🔧 Maintenance

### Update Application
```bash
cd /opt/paudhi
git pull origin main

# Update backend
sudo systemctl stop paudhi-backend
cd /srv/paudhi/backend
sudo -u www-data npm ci --only=production
sudo systemctl start paudhi-backend

# Update frontend
cd /opt/paudhi
npm ci
npm run build
sudo cp -r dist/* /var/www/html/
```

### Backup Database
```bash
# Create backup
sudo mongodump --db paudhi --out /backup/mongodb/$(date +%Y%m%d)

# Restore backup
sudo mongorestore --db paudhi /backup/mongodb/20231201/paudhi/
```

### Monitor Resources
```bash
# Check disk usage
df -h

# Check memory usage
free -h

# Check CPU usage
top

# Check Apache processes
sudo apache2ctl status
```

### SSL Certificate Renewal (Let's Encrypt)
```bash
# Test renewal
sudo certbot renew --dry-run

# Renew certificates
sudo certbot renew

# Auto-renewal (crontab)
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 Monitoring dan Logging

### Setup Log Rotation
```bash
sudo nano /etc/logrotate.d/paudhi
```

```
/var/log/apache2/paudhi_*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 root adm
    postrotate
        systemctl reload apache2
    endscript
}
```

### Performance Monitoring
```bash
# Install htop
sudo apt install htop -y

# Monitor in real-time
htop

# Check Apache status
sudo apache2ctl status

# Check connections
sudo netstat -tulpn | grep :443
sudo netstat -tulpn | grep :5000
```

## 🎯 Post-Deployment Checklist

- [ ] ✅ Website accessible via https://paudhi.kemenkopmk.go.id
- [ ] ✅ API health check: https://paudhi.kemenkopmk.go.id/api/health
- [ ] ✅ SSL certificate valid dan tidak expired
- [ ] ✅ All services running (Apache, MongoDB, Backend)
- [ ] ✅ Firewall configured properly
- [ ] ✅ Backup strategy implemented
- [ ] ✅ Log rotation configured
- [ ] ✅ Monitoring setup

## 📞 Support

Jika mengalami masalah:
1. Cek logs terlebih dahulu
2. Pastikan semua services running
3. Verify network connectivity
4. Check file permissions
5. Hubungi tim development jika diperlukan

---

**Catatan**: Panduan ini dibuat untuk Ubuntu Server. Untuk distribusi Linux lain, sesuaikan perintah package manager dan path konfigurasi.