import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const brainDir = path.resolve('C:/Users/Admin/.gemini/antigravity-ide/brain/4c81f10a-48a3-4bba-92ca-0fbec0dbbe8e');
const destDir = path.resolve('public/assets/images/blog');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const imageMap = {
  'ai-solutions-transformation': 'blog_ai_transformation',
  'industrial-iot-architecture': 'blog_iiot_architecture',
  'enterprise-erp-systems': 'blog_enterprise_erp',
  'nextgen-crm-sales': 'blog_nextgen_crm',
  'custom-web-engineering': 'blog_web_engineering',
  'enterprise-mobile-apps': 'blog_mobile_engineering',
  'cloud-devops-security': 'blog_cloud_devops',
  'smart-manufacturing-industry-40': 'blog_smart_manufacturing',
  'healthcare-ai-digital-health': 'blog_healthcare_tech',
  'retail-ecommerce-omnichannel': 'blog_retail_ecommerce',
  'fintech-ai-fraud-automation': 'blog_fintech_banking',
  'construction-erp-fleet-iot': 'blog_construction_tech',
  'automotive-smart-factory-qa': 'blog_smart_manufacturing',
  'education-edtech-ai-learning': 'blog_web_engineering'
};

async function processImages() {
  const files = fs.readdirSync(brainDir);

  for (const [blogId, prefix] of Object.entries(imageMap)) {
    const match = files.find(f => f.startsWith(prefix) && f.endsWith('.png'));
    if (match) {
      const srcPath = path.join(brainDir, match);
      const destWebpPath = path.join(destDir, `${prefix}.webp`);
      
      await sharp(srcPath)
        .webp({ quality: 90 })
        .toFile(destWebpPath);

      console.log(`Processed: ${match} -> public/assets/images/blog/${prefix}.webp`);
    }
  }

  // Update src/data/blogData.js
  const blogDataPath = path.resolve('src/data/blogData.js');
  let content = fs.readFileSync(blogDataPath, 'utf8');

  for (const [blogId, prefix] of Object.entries(imageMap)) {
    const webpUrl = `/assets/images/blog/${prefix}.webp`;
    const regex = new RegExp(`(id:\\s*['"]${blogId}['"][\\s\\S]*?image:\\s*['"])([^'"]+)(['"])`);
    if (regex.test(content)) {
      content = content.replace(regex, `$1${webpUrl}$3`);
      console.log(`Updated blogData.js for ${blogId} -> ${webpUrl}`);
    }
  }

  fs.writeFileSync(blogDataPath, content, 'utf8');
  console.log('Successfully updated blogData.js with custom banner images.');
}

processImages();
