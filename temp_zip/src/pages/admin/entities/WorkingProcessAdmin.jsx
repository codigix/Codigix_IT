import React from 'react';
import EntityManager from './EntityManager';

const WorkingProcessAdmin = () => {
  const fields = [
    { name: 'step', label: 'Step Number (e.g., 01)', type: 'text' },
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'icon', label: 'Icon Class (e.g., tji-discovery)', type: 'text' },
    { name: 'desc', label: 'Description', type: 'textarea' },
  ];

  return <EntityManager entity="workingProcess" title="Working Process" fields={fields} />;
};

export default WorkingProcessAdmin;
