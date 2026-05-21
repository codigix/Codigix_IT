const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Go to the site first to set the origin for localStorage
    await page.goto('http://localhost:5173/admin/login');
    
    // Inject mock token
    await page.evaluate(() => {
      localStorage.setItem('adminToken', 'mock-token');
      localStorage.setItem('isAdminAuthenticated', 'true');
    });
    
    // Go to dashboard
    await page.goto('http://localhost:5173/admin/dashboard');
    
    // Wait for sidebar to be visible
    await page.waitForSelector('aside', { timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ path: 'd:/projects/Codigix_IT/dashboard_screenshot.png' });
    
    console.log('Screenshot saved to d:/projects/Codigix_IT/dashboard_screenshot.png');
  } catch (error) {
    console.error('Error during playwright execution:', error);
  } finally {
    await browser.close();
  }
})();
