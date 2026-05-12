import React from 'react';
import EntityManager from './EntityManager';

const ProjectsAdmin = () => {
  const fields = [
    { name: 'title', label: 'Project Title', type: 'text' },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'image', label: 'Main Image Name (without ext)', type: 'text' },
    { name: 'overview', label: 'Project Overview', type: 'textarea' },
    { name: 'goals', label: 'Project Goals (one per line)', type: 'textarea' },
    { name: 'technology_stack', label: 'Technology Stack', type: 'textarea' },
    { name: 'results', label: 'Results & Impact', type: 'textarea' },
    { name: 'client', label: 'Client Name', type: 'text' },
    { name: 'budget', label: 'Project Budget', type: 'text' },
    { name: 'gallery', label: 'Gallery Images (comma separated names)', type: 'text' },
  ];

  return <EntityManager entity="projects" title="Projects" fields={fields} viewType="grid" />;
};

export default ProjectsAdmin;
