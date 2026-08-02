import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { caseStudiesData } from './src/data/caseStudiesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, 'backend', '.env') });

async function seedDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Ruchita@12345',
    port: parseInt(process.env.DB_PORT || '3306')
  });

  const dbName = process.env.DB_NAME || 'codigix_admin';

  try {
    await connection.changeUser({ database: dbName });
    console.log(`Connected to database: ${dbName}`);

    // Clear existing projects to avoid duplicates during seed
    await connection.query('TRUNCATE TABLE projects');
    console.log('Cleared existing projects.');

    for (const study of caseStudiesData) {
      const payload = {
        title: study.title,
        slug: study.slug,
        category: study.category,
        catName: study.catName,
        client: study.clientName,
        subtitle: study.overview, // mapping overview to subtitle
        objective: study.objective || '',
        heroImage: study.heroImage || study.image,
        image: study.image,
        businessChallengeDesc: study.businessChallengeDesc || '',
        challenges: JSON.stringify(study.challenges || []),
        solutionDesc: study.solutionDesc || '',
        solutionPoints: JSON.stringify(study.solutionPoints || []),
        radialNodes: JSON.stringify(study.radialNodes || []),
        keyFeatures: JSON.stringify(study.keyFeatures || []),
        techStack: JSON.stringify(study.techStack || []),
        results_impact: JSON.stringify(study.results || []),
        solutionHighlights: JSON.stringify(study.solutionHighlights || []),
        testimonial: JSON.stringify(study.testimonial || {})
      };

      const query = `
        INSERT INTO projects (
          title, slug, category, catName, client, subtitle, objective, 
          heroImage, image, businessChallengeDesc, challenges, solutionDesc, 
          solutionPoints, radialNodes, keyFeatures, techStack, results_impact, 
          solutionHighlights, testimonial
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        payload.title, payload.slug, payload.category, payload.catName, payload.client, payload.subtitle, payload.objective,
        payload.heroImage, payload.image, payload.businessChallengeDesc, payload.challenges, payload.solutionDesc,
        payload.solutionPoints, payload.radialNodes, payload.keyFeatures, payload.techStack, payload.results_impact,
        payload.solutionHighlights, payload.testimonial
      ];

      await connection.query(query, values);
      console.log(`Inserted: ${study.title}`);
    }

    console.log('Seed completed successfully!');

  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await connection.end();
  }
}

seedDatabase();
