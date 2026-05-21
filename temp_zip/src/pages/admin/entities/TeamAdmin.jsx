import React from 'react';
import EntityManager from './EntityManager';

const TeamAdmin = () => {
  const fields = [
    { name: 'num', label: 'Order Number', type: 'number' },
    { name: 'name', label: 'Member Name', type: 'text' },
    { name: 'position', label: 'Position', type: 'text' },
    { name: 'image', label: 'Image URL', type: 'text' },
  ];

  return <EntityManager entity="team" title="Team" fields={fields} viewType="grid" />;
};

export default TeamAdmin;
