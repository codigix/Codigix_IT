import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetFile = path.join(__dirname, 'src/pages/admin/entities/CaseStudiesAdmin.jsx');

let content = fs.readFileSync(targetFile, 'utf-8');

// Global Replacements for Light Theme
content = content.replace(/text-white/g, 'text-slate-900');
content = content.replace(/bg-\[#130a38\]/g, 'bg-white shadow-sm');
content = content.replace(/border-purple-900\/40/g, 'border-slate-200');
content = content.replace(/bg-black\/40/g, 'bg-slate-100');
content = content.replace(/text-slate-400/g, 'text-slate-500');
content = content.replace(/border-white\/5/g, 'border-slate-100');
content = content.replace(/bg-\[#0b0520\]/g, 'bg-white');
content = content.replace(/border-purple-900\/50/g, 'border-slate-200');
content = content.replace(/bg-\[#10072b\]/g, 'bg-slate-50');
content = content.replace(/text-gray-400 hover:text-white/g, 'text-slate-400 hover:text-slate-900');
content = content.replace(/bg-\[#0c051f\]/g, 'bg-white');
content = content.replace(/border-purple-900\/30/g, 'border-slate-200');
content = content.replace(/hover:text-white/g, 'hover:text-slate-900');
content = content.replace(/bg-purple-900\/10/g, 'bg-purple-50');
content = content.replace(/text-slate-300/g, 'text-slate-700 font-medium');
content = content.replace(/bg-\[#160b3b\]/g, 'bg-slate-50');
content = content.replace(/text-white/g, 'text-slate-900'); // Run twice just in case
content = content.replace(/bg-purple-600 hover:bg-purple-700 text-slate-900/g, 'bg-purple-600 hover:bg-purple-700 text-white'); // Fix buttons
content = content.replace(/bg-blue-600 hover:bg-blue-700 text-slate-900/g, 'bg-blue-600 hover:bg-blue-700 text-white'); // Fix buttons
content = content.replace(/bg-purple-900\/50 hover:bg-purple-600 text-slate-900/g, 'bg-purple-100 hover:bg-purple-200 text-purple-700'); // Add point button
content = content.replace(/span className="absolute top-2 left-2 bg-purple-600 text-slate-900/g, 'span className="absolute top-2 left-2 bg-purple-600 text-white'); // Fix badge
content = content.replace(/bg-black\/80/g, 'bg-slate-900/50'); // Backdrop

// Wait, the "Loading..." also got its text changed.
// Let's make sure the "Save Case Study" button didn't break.
content = content.replace(/className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-slate-900/g, 'className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white');
content = content.replace(/<button type="button" onClick=\{\(\) => setIsModalOpen\(false\)\} className="px-6 py-2 bg-transparent text-slate-900 hover:text-slate-900/g, '<button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-transparent text-slate-600 hover:text-slate-900');

fs.writeFileSync(targetFile, content, 'utf-8');
console.log('Theme replaced successfully');
