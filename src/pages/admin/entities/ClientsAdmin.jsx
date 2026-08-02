import React from 'react';
import EntityManager from './EntityManager';

const ClientsAdmin = () => {
  const fields = [
    { name: 'name', label: 'Client Name', type: 'text' },
    { name: 'industry', label: 'Industry', type: 'text' },
    { name: 'website', label: 'Website URL', type: 'text' },
    { name: 'image', label: 'Client Logo', type: 'image' },
  ];

  return <EntityManager entity="clients" title="Clients" fields={fields} />;
};

export default ClientsAdmin;
