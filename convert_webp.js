import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.resolve('public/assets/images');
const srcDir = path.resolve('src');
const publicDir = path.resolve('public');

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function convertImages() {
  const allImageFiles = getAllFiles(imagesDir);
  const targetImages = allImageFiles.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return (ext === '.png' || ext === '.jpg' || ext === '.jpeg') && !file.endsWith('.webp');
  });

  console.log(`Found ${targetImages.length} images to convert to WebP.`);

  const conversions = [];
  let totalSavedBytes = 0;

  for (const imgPath of targetImages) {
    const ext = path.extname(imgPath);
    const webpPath = imgPath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
    
    try {
      await sharp(imgPath)
        .webp({ quality: 85, lossless: false })
        .toFile(webpPath);
      
      const oldSize = fs.statSync(imgPath).size;
      const newSize = fs.statSync(webpPath).size;
      const savedBytes = oldSize - newSize;
      totalSavedBytes += savedBytes;
      const savedPercent = (((oldSize - newSize) / oldSize) * 100).toFixed(1);

      console.log(`Converted: ${path.basename(imgPath)} -> ${path.basename(webpPath)} (${(oldSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB, saved ${savedPercent}%)`);

      const relOld = imgPath.replace(publicDir, '').replace(/\\/g, '/');
      const relNew = webpPath.replace(publicDir, '').replace(/\\/g, '/');
      conversions.push({ oldRel: relOld, newRel: relNew, oldBasename: path.basename(imgPath), newBasename: path.basename(webpPath) });
    } catch (err) {
      console.error(`Error converting ${imgPath}:`, err.message);
    }
  }

  console.log(`\nTotal Storage Savings: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);

  // Update code references in src/ and public/
  const codeFiles = [
    ...getAllFiles(srcDir).filter(f => /\.(jsx?|tsx?|css|json)$/i.test(f)),
    ...getAllFiles(publicDir).filter(f => /\.(html|xml|json)$/i.test(f))
  ];

  console.log(`\nUpdating references across ${codeFiles.length} code files...`);
  let updatedCount = 0;

  for (const codeFile of codeFiles) {
    let content = fs.readFileSync(codeFile, 'utf8');
    let original = content;

    for (const conv of conversions) {
      if (content.includes(conv.oldRel)) {
        content = content.replaceAll(conv.oldRel, conv.newRel);
      }
      const oldNoSlash = conv.oldRel.replace(/^\//, '');
      const newNoSlash = conv.newRel.replace(/^\//, '');
      if (content.includes(oldNoSlash)) {
        content = content.replaceAll(oldNoSlash, newNoSlash);
      }
      if (content.includes(conv.oldBasename)) {
        content = content.replaceAll(conv.oldBasename, conv.newBasename);
      }
    }

    if (content !== original) {
      fs.writeFileSync(codeFile, content, 'utf8');
      updatedCount++;
      console.log(`Updated references in: ${path.basename(codeFile)}`);
    }
  }

  console.log(`\nSuccessfully converted all images and updated ${updatedCount} code files to WebP.`);
}

convertImages();
