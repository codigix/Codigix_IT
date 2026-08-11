import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const distDir = path.resolve('dist');

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

function compressAssets() {
  console.log('🚀 Starting asset compression (Gzip + Brotli)...');
  const allFiles = getAllFiles(distDir);
  const targetFiles = allFiles.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return (ext === '.js' || ext === '.css' || ext === '.html' || ext === '.svg' || ext === '.json' || ext === '.xml') && !file.endsWith('.gz') && !file.endsWith('.br');
  });

  let totalOriginal = 0;
  let totalGzip = 0;
  let totalBrotli = 0;
  let count = 0;

  for (const filePath of targetFiles) {
    try {
      const buffer = fs.readFileSync(filePath);
      const originalSize = buffer.length;
      if (originalSize === 0) continue;

      // Gzip Level 9 (Max)
      const gzipped = zlib.gzipSync(buffer, { level: 9 });
      fs.writeFileSync(`${filePath}.gz`, gzipped);

      // Brotli Quality 11 (Max)
      const brotli = zlib.brotliCompressSync(buffer, {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      });
      fs.writeFileSync(`${filePath}.br`, brotli);

      totalOriginal += originalSize;
      totalGzip += gzipped.length;
      totalBrotli += brotli.length;
      count++;

      const filename = path.basename(filePath);
      console.log(
        `Compressed ${filename}: Original ${(originalSize / 1024).toFixed(1)}KB -> Gzip ${(gzipped.length / 1024).toFixed(1)}KB -> Brotli ${(brotli.length / 1024).toFixed(1)}KB`
      );
    } catch (err) {
      console.error(`Error compressing ${filePath}:`, err.message);
    }
  }

  console.log(`\n✅ Compressed ${count} files.`);
  console.log(`Total Original: ${(totalOriginal / 1024).toFixed(1)} KB`);
  console.log(`Total Gzip:     ${(totalGzip / 1024).toFixed(1)} KB (${(((totalOriginal - totalGzip) / totalOriginal) * 100).toFixed(1)}% reduction)`);
  console.log(`Total Brotli:   ${(totalBrotli / 1024).toFixed(1)} KB (${(((totalOriginal - totalBrotli) / totalOriginal) * 100).toFixed(1)}% reduction)`);
}

compressAssets();
