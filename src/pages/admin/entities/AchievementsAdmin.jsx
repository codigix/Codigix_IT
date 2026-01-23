import React from 'react';
import EntityManager from './EntityManager';

const AchievementsAdmin = () => {
  const fields = [
    { name: 'num', label: 'Number (e.g., 01)', type: 'text' },
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'year', label: 'Year', type: 'text' },
  ];

  return <EntityManager entity="achievements" title="Achievements" fields={fields} />;
};

export default AchievementsAdmin;
