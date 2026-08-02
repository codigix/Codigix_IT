import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

// A robust way to extract the JSON data from caseStudiesData.js without eval()
// We'll just read the file, locate the array, and parse it using a regex or simple eval of just the array.
const dataFilePath = path.join(__dirname, '../src/data/caseStudiesData.js');
const fileContent = fs.readFileSync(dataFilePath, 'utf-8');

// The file exports caseStudiesData as an array. We can use a simple trick to extract it by finding the first '[' and the last ']' before the next export.
let arrayString = fileContent.substring(
  fileContent.indexOf('export const caseStudiesData =') + 'export const caseStudiesData ='.length,
  fileContent.indexOf('export const getCaseStudyById')
).trim();

// Remove trailing semicolon if exists
if (arrayString.endsWith(';')) {
  arrayString = arrayString.slice(0, -1);
}

// Evaluate just the array literal
const caseStudiesData = eval(`(${arrayString})`);

async function seedDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'appuser',
    password: process.env.DB_PASSWORD || 'Appuser@123',
    database: process.env.DB_NAME || 'codigix_admin',
    port: parseInt(process.env.DB_PORT || '3306')
  });

  try {
    console.log('Connected to MySQL. Clearing existing projects...');
    await connection.query('DELETE FROM projects');

    for (const study of caseStudiesData) {
      const payload = {
        title: study.title,
        slug: study.slug,
        category: study.category,
        catName: study.catName,
        client: study.clientName,
        subtitle: study.overview || study.subtitle,
        objective: study.objective || 'To build a robust and scalable solution tailored to client needs.',
        heroImage: study.heroImage || study.image || '',
        image: study.image || '',
        businessChallengeDesc: study.businessChallengeDesc || 'The client faced significant operational hurdles before implementation.',
        challenges: JSON.stringify(study.challenges || [{title: 'Challenge 1', desc: 'Dummy challenge description', icon: 'AlertCircle'}]),
        solutionDesc: study.solutionDesc || 'We implemented a state-of-the-art solution resolving all core issues.',
        solutionPoints: JSON.stringify(study.solutionPoints || ['Point 1', 'Point 2']),
        radialNodes: JSON.stringify(study.radialNodes || []),
        keyFeatures: JSON.stringify(study.keyFeatures || []),
        techStack: JSON.stringify(study.techStack || []),
        results_impact: JSON.stringify(study.results || []),
        solutionHighlights: JSON.stringify(study.solutionHighlights || []),
        testimonial: JSON.stringify(study.testimonial || {}),
        sidebarSpecs: JSON.stringify(study.sidebarSpecs || {
          client: study.clientName || '',
          industry: study.category || '',
          projectType: study.catName || '',
          duration: '6 Months',
          technologies: study.technology_stack || 'React, Node.js',
          liveUrl: 'www.codigix.com'
        })
      };

      const query = `
        INSERT INTO projects (
          title, slug, category, catName, client, subtitle, objective, 
          heroImage, image, businessChallengeDesc, challenges, solutionDesc, 
          solutionPoints, radialNodes, keyFeatures, techStack, results_impact, 
          solutionHighlights, testimonial, sidebarSpecs
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        payload.title, payload.slug, payload.category, payload.catName, payload.client, payload.subtitle, payload.objective,
        payload.heroImage, payload.image, payload.businessChallengeDesc, payload.challenges, payload.solutionDesc,
        payload.solutionPoints, payload.radialNodes, payload.keyFeatures, payload.techStack, payload.results_impact,
        payload.solutionHighlights, payload.testimonial, payload.sidebarSpecs
      ];

      await connection.query(query, values);
      console.log(`Inserted: ${study.title}`);
    }

    console.log('Successfully populated ALL case studies with comprehensive data!');

  } catch (err) {
    console.error('Error seeding database:', err.message);
  } finally {
    await connection.end();
  }
}

seedDatabase();
