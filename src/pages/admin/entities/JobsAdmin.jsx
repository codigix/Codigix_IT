import React from 'react';
import EntityManager from './EntityManager';

const JobsAdmin = () => {
  const fields = [
    { name: 'title', label: 'Job Title', type: 'text' },
    { name: 'company', label: 'Company Name', type: 'text' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'type', label: 'Job Type (e.g., Full-time)', type: 'text' },
    { name: 'experience', label: 'Experience', type: 'text' },
    { name: 'description', label: 'Job Summary', type: 'textarea' },
    { name: 'responsibilities', label: 'Key Responsibilities', type: 'textarea' },
    { name: 'skills', label: 'Required Skills', type: 'textarea' },
    { name: 'qualifications', label: 'Qualifications', type: 'textarea' },
    { name: 'requirements', label: 'Other Requirements', type: 'textarea' },
  ];

  return <EntityManager entity="jobs" title="Job Openings" fields={fields} viewType="grid" />;
};

export default JobsAdmin;
