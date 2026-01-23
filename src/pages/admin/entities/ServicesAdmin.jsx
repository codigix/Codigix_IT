import React from 'react';
import EntityManager from './EntityManager';

const ServicesAdmin = () => {
  const fields = [
    { name: 'num', label: 'Service Number (e.g., 01)', type: 'text' },
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'desc', label: 'Description', type: 'textarea' },
    { name: 'image', label: 'Image Name (without ext)', type: 'text' },
  ];

  return <EntityManager entity="services" title="Services" fields={fields} viewType="grid" />;
};

export default ServicesAdmin;
