const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// Define screen sizes from large to small
const screenSizes = [
  { name: '2xl', width: 1920, height: 1080 },
  { name: 'xl', width: 1440, height: 900 },
  { name: 'lg', width: 1280, height: 720 },
  { name: 'md', width: 1024, height: 768 },
  { name: 'sm', width: 768, height: 1024 },
  { name: 'xs', width: 375, height: 812 }
];

// Define all pages to screenshot
const pages = [
  { name: 'home', url: '/' },
  { name: 'events', url: '/events' },
  { name: 'rsvp', url: '/rsvp' },
  { name: 'gallery', url: '/gallery' },
  { name: 'live', url: '/live' },
  { name: 'contact', url: '/contact' },
  { name: 'travel', url: '/travel' }
];

async function takeScreenshots() {
  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (fs.existsSync(screenshotsDir)) {
    fs.rmSync(screenshotsDir, { recursive: true });
  }
  fs.mkdirSync(screenshotsDir, { recursive: true });

  console.log('🚀 Starting screenshot capture process...');
  console.log(`📁 Screenshots will be saved to: ${screenshotsDir}`);

  const browser = await chromium.launch({ headless: true });
  
  for (const size of screenSizes) {
    console.log(`\n📱 Capturing screenshots for ${size.name} (${size.width}x${size.height})`);
    
    const context = await browser.newContext({
      viewport: { width: size.width, height: size.height }
    });
    
    const page = await context.newPage();
    
    // Create size-specific directory
    const sizeDir = path.join(screenshotsDir, size.name);
    fs.mkdirSync(sizeDir, { recursive: true });
    
    for (const pageInfo of pages) {
      try {
        console.log(`  📸 Capturing ${pageInfo.name} page...`);
        
        // Navigate to the page
        const response = await page.goto(`http://localhost:3000${pageInfo.url}`, { 
          waitUntil: 'networkidle',
          timeout: 30000 
        });
        
        if (!response || !response.ok()) {
          console.log(`    ❌ Failed to load ${pageInfo.name}: ${response?.status() || 'No response'}`);
          continue;
        }
        
        // Wait for page to be fully loaded
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000); // Allow any animations/transitions to complete
        
        // Take full page screenshot
        const screenshotPath = path.join(sizeDir, `${pageInfo.name}.png`);
        await page.screenshot({ 
          path: screenshotPath, 
          fullPage: true,
          type: 'png'
        });
        
        console.log(`    ✅ Screenshot saved: ${screenshotPath}`);
        
      } catch (error) {
        console.log(`    ❌ Error capturing ${pageInfo.name}: ${error.message}`);
      }
    }
    
    await context.close();
  }
  
  await browser.close();
  console.log('\n🎉 Screenshot capture complete!');
  console.log(`📂 All screenshots saved in: ${screenshotsDir}`);
  
  // Create a summary
  const summary = {
    timestamp: new Date().toISOString(),
    totalScreenSizes: screenSizes.length,
    totalPages: pages.length,
    screenSizes: screenSizes,
    pages: pages
  };
  
  fs.writeFileSync(
    path.join(screenshotsDir, 'summary.json'),
    JSON.stringify(summary, null, 2)
  );
  
  console.log('\n📊 Summary:');
  console.log(`   Screen sizes tested: ${screenSizes.length}`);
  console.log(`   Pages captured: ${pages.length}`);
  console.log(`   Total screenshots: ${screenSizes.length * pages.length}`);
}

// Run the script
takeScreenshots().catch(console.error);