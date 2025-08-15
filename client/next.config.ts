import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Commented out static export for now due to NextAuth incompatibility
  // output: 'export',
  // trailingSlash: true,
  // skipTrailingSlashRedirect: true,
  
  // Configure for production deployment
  basePath: '',
  assetPrefix: '',
  
  // Output directory
  distDir: '.next',
  
  // Optimize images for production
  images: {
    unoptimized: false, // Enable optimization in production
    domains: ['res.cloudinary.com'], // Allow Cloudinary images
    formats: ['image/webp', 'image/avif'],
  },
  
  // Production optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true, // Enable gzip compression
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Experimental features
  experimental: {
    // Enable experimental features as needed
  },
  
  // Environment variable validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
