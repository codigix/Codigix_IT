import React from 'react';
import EntityManager from './EntityManager';

const ProjectsAdmin = () => {
  const fields = [
    { name: 'title', label: 'Project Title', type: 'text' },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'image', label: 'Image URL or Name', type: 'text' },
  ];

  return <EntityManager entity="projects" title="Projects" fields={fields} viewType="grid" />;
};

export default ProjectsAdmin;
