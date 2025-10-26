#!/bin/bash

# PAUD HI Deployment Script for Ubuntu Server with Apache2
# Author: PAUD HI Development Team
# Version: 1.0

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="paudhi"
DOMAIN="paudhi.kemenkopmk.go.id"
BACKEND_PORT="5000"
SSL_DIR="/etc/ssl/kemenkopmk"
WEB_ROOT="/var/www/html"
SERVICE_USER="www-data"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "Script ini harus dijalankan sebagai root (gunakan sudo)"
        exit 1
    fi
}

install_dependencies() {
    log_info "Installing system dependencies..."
    
    # Update system
    apt update && apt upgrade -y
    
    # Install required packages
    apt install -y \
        curl \
        wget \
        git \
        build-essential \
        apache2 \
        apache2-utils \
        mongodb \
        certbot \
        python3-certbot-apache
    
    # Enable Apache modules
    a2enmod rewrite
    a2enmod ssl
    a2enmod proxy
    a2enmod proxy_http
    a2enmod proxy_wstunnel
    a2enmod headers
    a2enmod expires
    a2enmod deflate
    
    log_success "System dependencies installed"
}

install_nodejs() {
    log_info "Installing Node.js LTS..."
    
    # Install Node.js LTS
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
    apt-get install -y nodejs
    
    # Install PM2 globally
    npm install -g pm2
    
    # Verify installation
    node_version=$(node --version)
    npm_version=$(npm --version)
    log_success "Node.js $node_version and npm $npm_version installed"
}

setup_mongodb() {
    log_info "Setting up MongoDB..."
    
    # Start and enable MongoDB
    systemctl start mongod
    systemctl enable mongod
    
    # Wait for MongoDB to start
    sleep 5
    
    # Check if MongoDB is running
    if systemctl is-active --quiet mongod; then
        log_success "MongoDB is running"
    else
        log_error "Failed to start MongoDB"
        exit 1
    fi
}

deploy_backend() {
    log_info "Deploying backend..."
    
    # Create backend directory
    mkdir -p /srv/paudhi/backend
    
    # Copy backend files
    cp -r backend/* /srv/paudhi/backend/
    
    # Set permissions
    chown -R $SERVICE_USER:$SERVICE_USER /srv/paudhi/backend
    
    # Install dependencies
    cd /srv/paudhi/backend
    sudo -u $SERVICE_USER npm ci --only=production
    
    # Create uploads directories
    sudo -u $SERVICE_USER node scripts/createUploadDirs.js
    
    # Start backend with PM2
    sudo -u $SERVICE_USER pm2 start server.js --name paudhi-backend
    sudo -u $SERVICE_USER pm2 save
    
    # Setup PM2 startup
    pm2 startup systemd -u $SERVICE_USER --hp /var/www
    
    log_success "Backend deployed and started"
}

deploy_frontend() {
    log_info "Deploying frontend..."
    
    # Install frontend dependencies
    npm ci
    
    # Build frontend
    npm run build
    
    # Clear web root
    rm -rf $WEB_ROOT/*
    
    # Copy build files to web root
    cp -r dist/* $WEB_ROOT/
    
    # Set permissions
    chown -R $SERVICE_USER:$SERVICE_USER $WEB_ROOT
    chmod -R 755 $WEB_ROOT
    
    log_success "Frontend deployed to $WEB_ROOT"
}

setup_apache() {
    log_info "Setting up Apache configuration..."
    
    # Copy Apache configuration
    cp srv/conf/paudhi.conf /etc/apache2/sites-available/
    
    # Disable default site
    a2dissite 000-default
    
    # Enable PAUD HI site
    a2ensite paudhi
    
    # Test Apache configuration
    apache2ctl configtest
    
    # Restart Apache
    systemctl restart apache2
    systemctl enable apache2
    
    log_success "Apache configured and restarted"
}

setup_ssl() {
    log_info "Setting up SSL..."
    
    # Create SSL directory
    mkdir -p $SSL_DIR

    # Detect certificate filenames in repo (support server.* or paudhi.*)
    local CRT_SRC=""
    local KEY_SRC=""
    local CHAIN_SRC=""

    if [[ -f "srv/ssl/server.crt" && -f "srv/ssl/server.key" ]]; then
        CRT_SRC="srv/ssl/server.crt"
        KEY_SRC="srv/ssl/server.key"
        [[ -f "srv/ssl/server-chain.crt" ]] && CHAIN_SRC="srv/ssl/server-chain.crt"
    elif [[ -f "srv/ssl/paudhi.crt" && -f "srv/ssl/paudhi.key" ]]; then
        CRT_SRC="srv/ssl/paudhi.crt"
        KEY_SRC="srv/ssl/paudhi.key"
        [[ -f "srv/ssl/paudhi-chain.crt" ]] && CHAIN_SRC="srv/ssl/paudhi-chain.crt"
    fi

    if [[ -n "$CRT_SRC" && -n "$KEY_SRC" ]]; then
        cp "$CRT_SRC" "$SSL_DIR/$(basename $CRT_SRC)"
        cp "$KEY_SRC" "$SSL_DIR/$(basename $KEY_SRC)"
        if [[ -n "$CHAIN_SRC" ]]; then
            cp "$CHAIN_SRC" "$SSL_DIR/$(basename $CHAIN_SRC)"
        fi
        
        # Set secure permissions
        chown root:root $SSL_DIR/*
        chmod 600 $SSL_DIR/*.key
        chmod 644 $SSL_DIR/*.crt
        
        log_success "SSL certificates installed to $SSL_DIR"
        
        # Reload Apache to apply SSL changes
        systemctl reload apache2 || systemctl restart apache2
    else
        log_warning "SSL certificates not found in srv/ssl/"
        log_info "Attempting to generate SSL with Let's Encrypt..."
        
        if certbot --apache -d $DOMAIN --non-interactive --agree-tos --email admin@kemenkopmk.go.id; then
            log_success "Let's Encrypt SSL certificate generated"
        else
            log_warning "Let's Encrypt failed. You need to manually install SSL certificates to $SSL_DIR/"
            log_info "Supported files: server.crt/server.key/server-chain.crt or paudhi.crt/paudhi.key/paudhi-chain.crt"
        fi
    fi
}

setup_firewall() {
    log_info "Setting up firewall..."
    
    # Install and configure UFW
    apt install -y ufw
    
    # Allow SSH, HTTP, and HTTPS
    ufw allow ssh
    ufw allow 'Apache Full'
    
    # Enable firewall
    ufw --force enable
    
    log_success "Firewall configured"
}

create_systemd_service() {
    log_info "Creating systemd service for backend..."
    
    cat > /etc/systemd/system/paudhi-backend.service << EOF
[Unit]
Description=PAUD HI Backend Service
After=network.target mongod.service
Wants=mongod.service

[Service]
Type=simple
User=$SERVICE_USER
WorkingDirectory=/srv/paudhi/backend
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=$BACKEND_PORT

[Install]
WantedBy=multi-user.target
EOF

    # Reload systemd and start service
    systemctl daemon-reload
    systemctl enable paudhi-backend
    systemctl start paudhi-backend
    
    log_success "Systemd service created and started"
}

verify_deployment() {
    log_info "Verifying deployment..."
    
    # Check services
    services=("apache2" "mongod" "paudhi-backend")
    for service in "${services[@]}"; do
        if systemctl is-active --quiet $service; then
            log_success "$service is running"
        else
            log_error "$service is not running"
        fi
    done
    
    # Check backend API
    sleep 5
    if curl -f -s http://localhost:$BACKEND_PORT/api/health > /dev/null; then
        log_success "Backend API is responding"
    else
        log_error "Backend API is not responding"
    fi
    
    # Check frontend
    if [[ -f "$WEB_ROOT/index.html" ]]; then
        log_success "Frontend files deployed"
    else
        log_error "Frontend files not found"
    fi
}

show_summary() {
    echo ""
    echo "=================================="
    echo "🎉 DEPLOYMENT COMPLETED!"
    echo "=================================="
    echo ""
    echo "📋 Summary:"
    echo "  • Domain: https://$DOMAIN"
    echo "  • Frontend: $WEB_ROOT"
    echo "  • Backend: /srv/paudhi/backend (Port $BACKEND_PORT)"
    echo "  • SSL: $SSL_DIR"
    echo "  • Logs: /var/log/apache2/"
    echo ""
    echo "🔧 Useful Commands:"
    echo "  • Check backend: systemctl status paudhi-backend"
    echo "  • Check Apache: systemctl status apache2"
    echo "  • Check MongoDB: systemctl status mongod"
    echo "  • View logs: tail -f /var/log/apache2/paudhi_ssl_error.log"
    echo "  • PM2 status: sudo -u $SERVICE_USER pm2 status"
    echo ""
    echo "🌐 Access your application:"
    echo "  • Website: https://$DOMAIN"
    echo "  • API Health: https://$DOMAIN/api/health"
    echo ""
}

# Main deployment process
main() {
    log_info "Starting PAUD HI deployment..."
    
    check_root
    install_dependencies
    install_nodejs
    setup_mongodb
    deploy_backend
    deploy_frontend
    setup_apache
    setup_ssl
    setup_firewall
    create_systemd_service
    verify_deployment
    show_summary
    
    log_success "Deployment completed successfully!"
}

# Run main function
main "$@"