const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs').promises;

const SCREENSHOT_BASE_DIR = './screenshots-master';

// Screen sizes to test - focusing on large screens as requested
const SCREEN_SIZES = [
  { name: '2XL', width: 1920, height: 1080, description: 'Large Desktop' },
  { name: 'XL', width: 1440, height: 900, description: 'Desktop' },
  { name: 'LG', width: 1280, height: 720, description: 'Laptop' },
  { name: 'MD', width: 1024, height: 768, description: 'Tablet Landscape' },
  { name: 'SM', width: 768, height: 1024, description: 'Tablet Portrait' },
  { name: 'XS', width: 375, height: 812, description: 'Mobile' }
];

// Pages to screenshot
const PAGES = [
  { name: 'Home', url: '/', waitTime: 8000 },
  { name: 'Events', url: '/events', waitTime: 6000 },
  { name: 'RSVP', url: '/rsvp', waitTime: 5000 },
  { name: 'Gallery', url: '/gallery', waitTime: 10000 },
  { name: 'Live', url: '/live', waitTime: 5000 },
  { name: 'Contact', url: '/contact', waitTime: 5000 },
  { name: 'Travel', url: '/travel', waitTime: 6000 }
];

async function setupDirectories() {
  // Create base directory
  await fs.mkdir(SCREENSHOT_BASE_DIR, { recursive: true });
  
  // Create subdirectories for each screen size
  for (const size of SCREEN_SIZES) {
    await fs.mkdir(path.join(SCREENSHOT_BASE_DIR, size.name), { recursive: true });
  }
}

async function takeScreenshots() {
  console.log('🎯 Master Branch Screenshot Analysis Starting...');
  console.log(`📁 Screenshots will be saved to: ${SCREENSHOT_BASE_DIR}`);

  await setupDirectories();
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  let screenshotCount = 0;
  
  for (const size of SCREEN_SIZES) {
    console.log(`\n📱 Testing ${size.name} (${size.width}x${size.height}) - ${size.description}`);
    
    // Set viewport
    await page.setViewportSize({ width: size.width, height: size.height });
    
    for (const pageInfo of PAGES) {
      console.log(`  📸 Capturing ${pageInfo.name} page...`);
      
      try {
        // Navigate to page
        await page.goto(`http://localhost:3000${pageInfo.url}`, {
          waitUntil: 'networkidle',
          timeout: 30000
        });
        
        // Wait for additional time as requested for proper loading
        console.log(`    ⏳ Waiting ${pageInfo.waitTime}ms for complete page load...`);
        await page.waitForTimeout(pageInfo.waitTime);
        
        // Take screenshot
        const filename = `${pageInfo.name}-${size.name}.png`;
        const filepath = path.join(SCREENSHOT_BASE_DIR, size.name, filename);
        
        await page.screenshot({
          path: filepath,
          fullPage: true
        });
        
        screenshotCount++;
        console.log(`    ✅ Saved: ${filename}`);
        
      } catch (error) {
        console.error(`    ❌ Error capturing ${pageInfo.name} at ${size.name}:`, error.message);
      }
    }
  }

  await browser.close();
  
  console.log(`\n🎉 Master Branch Analysis Complete!`);
  console.log(`📊 Total screenshots captured: ${screenshotCount}`);
  console.log(`📁 Screenshots saved in: ${SCREENSHOT_BASE_DIR}`);
  
  // Create summary report
  await createSummaryReport(screenshotCount);
}

async function createSummaryReport(screenshotCount) {
  const report = {
    branch: 'master',
    timestamp: new Date().toISOString(),
    screenshotCount,
    screenSizes: SCREEN_SIZES,
    pages: PAGES,
    directory: SCREENSHOT_BASE_DIR
  };
  
  await fs.writeFile(
    path.join(SCREENSHOT_BASE_DIR, 'master-analysis-summary.json'),
    JSON.stringify(report, null, 2)
  );
  
  const readmeContent = `# Master Branch Screenshots Analysis

**Analysis Date**: ${new Date().toLocaleString()}
**Total Screenshots**: ${screenshotCount}
**Focus**: Large screen device analysis for UI/UX comparison

## Screen Sizes Tested
${SCREEN_SIZES.map(size => `- **${size.name}** (${size.width}×${size.height}): ${size.description}`).join('\n')}

## Pages Captured
${PAGES.map(page => `- **${page.name}**: ${page.url} (${page.waitTime}ms wait time)`).join('\n')}

## Directory Structure
\`\`\`
${SCREENSHOT_BASE_DIR}/
${SCREEN_SIZES.map(size => `├── ${size.name}/\n${PAGES.map(page => `│   └── ${page.name}-${size.name}.png`).join('\n')}`).join('\n')}
└── master-analysis-summary.json
\`\`\`

## Purpose
This analysis captures the master branch UI/UX patterns for comparison with the current branch, specifically focusing on:
- Container width patterns (max-w-6xl vs max-w-7xl)
- Section spacing and padding
- Typography scaling 
- Large screen layout behavior
`;

  await fs.writeFile(
    path.join(SCREENSHOT_BASE_DIR, 'README.md'),
    readmeContent
  );
}

// Run the screenshot analysis
takeScreenshots().catch(console.error);