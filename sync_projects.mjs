import { caseStudiesData } from './src/data/caseStudiesData.js';

async function seedDatabase() {
  const API_BASE = process.env.API_BASE_URL || 'http://localhost:5000/api';

  try {
    // Delete existing ones to prevent duplicates (optional, doing it manually by deleting all first via GET)
    const getRes = await fetch(`${API_BASE}/projects`);
    const existing = await getRes.json();
    console.log('Existing data type:', typeof existing, 'Data:', existing);
    if (!Array.isArray(existing)) {
      console.log('Error: API did not return an array. Aborting delete phase.');
    } else {
      for (const proj of existing) {
        await fetch(`${API_BASE}/projects/${proj.id}`, { method: 'DELETE' });
        console.log(`Deleted existing project: ${proj.title}`);
      }
    }

    for (const study of caseStudiesData) {
      const payload = {
        title: study.title,
        slug: study.slug,
        category: study.category,
        catName: study.catName,
        client: study.clientName,
        subtitle: study.overview, 
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

      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        console.error(`Failed to insert: ${study.title}`, await res.text());
      } else {
        console.log(`Successfully synced: ${study.title}`);
      }
    }

    console.log('API Sync completed successfully!');

  } catch (err) {
    console.error('Error syncing API:', err);
  }
}

seedDatabase();
