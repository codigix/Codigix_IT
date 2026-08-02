import fs from 'fs';
import path from 'path';

const blogDataPath = path.resolve('src/data/blogData.js');
let content = fs.readFileSync(blogDataPath, 'utf8');

// Replace className= with class= inside string templates
content = content.replace(/className=/g, 'class=');

// Replace dark code blocks bg-[#07041a] with bg-[#0c0828] dark:bg-[#07041a] for better contrast
content = content.replace(/class="bg-\[#07041a\]/g, 'class="bg-[#0c0828] dark:bg-[#07041a]');

fs.writeFileSync(blogDataPath, content, 'utf8');
console.log('Successfully updated src/data/blogData.js HTML classes.');
