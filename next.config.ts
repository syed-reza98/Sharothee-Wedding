import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Commented out static export for now due to NextAuth incompatibility
  // output: 'export',
  // trailingSlash: true,
  // skipTrailingSlashRedirect: true,
  
  // Configure for GitHub Pages subdirectory if needed
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Output directory
  distDir: '.next',
  
  // Optimize images
  images: {
    unoptimized: true,
  },
  
  // Experimental features
  experimental: {
    // Remove esmExternals to avoid warnings
  },
};

export default nextConfig;
