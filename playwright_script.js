import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const targetUrl = 'http://localhost:5173/services/details/1';
  
  try {
    console.log(`Navigating to ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Set theme to light
    await page.evaluate(() => {
      const root = window.document.documentElement;
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    });
    
    // Wait a bit for transitions
    await page.waitForTimeout(2000);
    
    // Take screenshots of specific sections
    const ctaSection = await page.$('.tj-cta-section');
    if (ctaSection) {
      await ctaSection.screenshot({ path: path.join(__dirname, 'cta_section_light.png') });
    }
    
    const processSection = await page.$('.tj-service-details-section');
    if (processSection) {
      await processSection.screenshot({ path: path.join(__dirname, 'process_section_light.png') });
    }
    
    const fullScreenshotPath = path.join(__dirname, 'service_details_light_full.png');
    await page.screenshot({ path: fullScreenshotPath, fullPage: true });
    
    console.log(`Screenshots saved.`);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
