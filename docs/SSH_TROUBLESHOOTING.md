# SSH Connection Troubleshooting Guide

This document provides comprehensive troubleshooting steps for SSH connection issues with the Hostinger VPS deployment workflow.

## Issue Description

The GitHub Actions workflow fails with "Permission denied" error when attempting SSH connection to the Hostinger VPS using password authentication.

**Error Message:**
```
Permission denied, please try again.
Error: Process completed with exit code 5.
```

## Root Cause Analysis

Exit code 5 indicates SSH authentication failure. Common causes include:

1. **SSH Password Authentication Disabled**: The VPS SSH daemon may have password authentication disabled
2. **Root Login Disabled**: SSH may be configured to prevent root login
3. **Incorrect Password**: The stored password may be incorrect or changed
4. **Firewall Issues**: Network connectivity or firewall blocking the connection
5. **SSH Service Issues**: SSH daemon not running or misconfigured

## Quick Diagnostic Steps

### 1. Test SSH Connection Manually

Run the provided test script:
```bash
# From the repository root
./scripts/test-ssh-connection.sh
```

### 2. Check VPS SSH Configuration

Login to the VPS via Hostinger control panel console and check SSH configuration:

```bash
# Check SSH daemon configuration
sudo nano /etc/ssh/sshd_config

# Key settings that should be enabled:
PasswordAuthentication yes
PermitRootLogin yes
PubkeyAuthentication yes
```

### 3. Check SSH Service Status

```bash
# Check if SSH service is running
sudo systemctl status ssh

# Restart SSH service after configuration changes
sudo systemctl restart ssh
```

### 4. Check Firewall Configuration

```bash
# Check firewall status
sudo ufw status

# If firewall is blocking SSH, allow it:
sudo ufw allow ssh
sudo ufw allow 22/tcp
```

## Detailed Fixes

### Fix 1: Enable SSH Password Authentication

1. Login to VPS via Hostinger control panel console
2. Edit SSH configuration:
   ```bash
   sudo nano /etc/ssh/sshd_config
   ```
3. Ensure these settings are configured:
   ```
   PasswordAuthentication yes
   PermitRootLogin yes
   PubkeyAuthentication yes
   AuthorizedKeysFile .ssh/authorized_keys
   ```
4. Restart SSH service:
   ```bash
   sudo systemctl restart ssh
   ```

### Fix 2: Verify Password

1. Check if the password `..Tensorflow2022carbon@..` is correct
2. Try manual SSH connection from a local machine:
   ```bash
   ssh root@31.97.189.238
   ```
3. If password doesn't work, reset it via Hostinger control panel

### Fix 3: Network and Firewall

1. Test basic connectivity:
   ```bash
   ping 31.97.189.238
   ```
2. Test SSH port accessibility:
   ```bash
   nc -zv 31.97.189.238 22
   ```
3. Check VPS firewall:
   ```bash
   sudo ufw status
   sudo iptables -L
   ```

### Fix 4: Alternative SSH Configuration

If password authentication continues to fail, consider these alternatives:

1. **SSH Key Authentication**: Set up SSH keys for passwordless authentication
2. **Different SSH Port**: Change SSH to use a different port
3. **User Account**: Create a non-root user for SSH access

## Workflow Improvements Made

The GitHub Actions workflow has been enhanced with:

1. **Environment Variables**: Password stored in `VPS_PASSWORD` environment variable
2. **Enhanced Debugging**: Verbose SSH output and detailed error messages
3. **Connection Testing**: Comprehensive connectivity checks (ping, port, banner)
4. **Better Error Handling**: Specific error messages and troubleshooting guidance
5. **Retry Logic**: Multiple SSH connection attempts with different options
6. **Diagnostic Tools**: Installation of netcat for port testing

## Manual Testing

To manually test the SSH connection before running the workflow:

```bash
# Set environment variables
export VPS_HOST="31.97.189.238"
export VPS_USER="root"
export VPS_PASSWORD="..Tensorflow2022carbon@.."

# Run the test script
./scripts/test-ssh-connection.sh
```

## Workflow Changes Summary

1. **Added `VPS_PASSWORD` environment variable** for secure password handling
2. **Enhanced SSH connection test** with comprehensive debugging
3. **Updated all SSH commands** to use environment variables and proper error handling
4. **Added connectivity tests** (ping, port check, SSH banner)
5. **Improved error messages** with specific troubleshooting guidance

## Next Steps

1. **Verify VPS SSH Configuration**: Ensure password authentication and root login are enabled
2. **Test Connection Manually**: Use the provided test script to verify SSH connectivity
3. **Run the Workflow**: Once SSH connection is working, the workflow should succeed
4. **Monitor Logs**: Check GitHub Actions logs for detailed diagnostic information

## Support

If SSH issues persist after following this guide:

1. Check Hostinger VPS control panel for any service alerts
2. Contact Hostinger support for VPS SSH configuration assistance
3. Consider using SSH key authentication as an alternative
4. Review VPS firewall and security settings

---

**Note**: This troubleshooting guide assumes the VPS credentials and network configuration are correct as documented in the repository.