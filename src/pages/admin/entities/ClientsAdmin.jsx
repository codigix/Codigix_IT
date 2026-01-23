import React from 'react';
import EntityManager from './EntityManager';

const ClientsAdmin = () => {
  const fields = [
    { name: 'image', label: 'Client Logo URL', type: 'text' },
  ];

  return <EntityManager entity="clients" title="Clients" fields={fields} />;
};

export default ClientsAdmin;
