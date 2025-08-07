import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Configure for GitHub Pages subdirectory if needed
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Output directory for static export
  distDir: '.next',
  
  // Optimize images for static export
  images: {
    unoptimized: true,
  },
  
  // Disable server-side features not available in static export
  experimental: {
    // Remove esmExternals to avoid warnings
  },
};

export default nextConfig;
