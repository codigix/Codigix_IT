import React from 'react';
import EntityManager from './EntityManager';

const ProjectsAdmin = () => {
  const fields = [
    { name: 'title', label: 'Project Title', type: 'text' },
    { name: 'slug', label: 'URL Slug', type: 'text' },
    { name: 'category', label: 'Category/Industry', type: 'text' },
    { name: 'catName', label: 'Category Name Badge', type: 'text' },
    { name: 'client', label: 'Client Name', type: 'text' },
    { name: 'subtitle', label: 'Subtitle (Short Description)', type: 'textarea' },
    { name: 'objective', label: 'Project Objective', type: 'textarea' },
    { name: 'heroImage', label: 'Hero Image', type: 'image' },
    { name: 'image', label: 'Thumbnail Image', type: 'image' },
    
    // Detailed Sections
    { name: 'businessChallengeDesc', label: 'Business Challenge Description', type: 'textarea' },
    { name: 'challenges', label: 'Challenges (JSON array of objects with title, desc, icon)', type: 'textarea' },
    
    { name: 'solutionDesc', label: 'Solution Description', type: 'textarea' },
    { name: 'solutionPoints', label: 'Solution Points (JSON array of strings)', type: 'textarea' },
    { name: 'radialNodes', label: 'Radial Nodes (JSON array of strings)', type: 'textarea' },
    
    { name: 'keyFeatures', label: 'Key Features (JSON array of objects with title, desc, icon)', type: 'textarea' },
    { name: 'techStack', label: 'Technology Stack (JSON array of objects with name, color, bg)', type: 'textarea' },
    
    { name: 'results_impact', label: 'Results & Impact (JSON array of objects with val, title, icon)', type: 'textarea' },
    { name: 'solutionHighlights', label: 'Solution Highlights Sidebar (JSON array of strings)', type: 'textarea' },
    { name: 'testimonial', label: 'Testimonial (JSON object with quote, author, title, company, avatar)', type: 'textarea' },

    // Old fields (kept for backward compatibility)
    { name: 'overview', label: 'Legacy Overview', type: 'textarea' },
    { name: 'goals', label: 'Legacy Goals', type: 'textarea' },
    { name: 'technology_stack', label: 'Legacy Tech Stack', type: 'textarea' },
    { name: 'results', label: 'Legacy Results', type: 'textarea' },
    { name: 'budget', label: 'Project Budget', type: 'text' },
    { name: 'gallery', label: 'Gallery Images', type: 'multi-image' },
    { name: 'client_logo', label: 'Client Logo', type: 'image' },
  ];

  return <EntityManager entity="projects" title="Projects" fields={fields} viewType="grid" />;
};

export default ProjectsAdmin;
