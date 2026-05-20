import React from 'react';
import EntityManager from './EntityManager';

const ServicesAdmin = () => {
  const fields = [
    { name: 'num', label: 'Service Number (e.g., 01)', type: 'text' },
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'desc', label: 'Short Description (Card)', type: 'textarea' },
    { name: 'image', label: 'Main Image', type: 'image' },
    { name: 'overview_title', label: 'Overview Title', type: 'text' },
    { name: 'overview_desc', label: 'Overview Description', type: 'textarea' },
    { name: 'key_features', label: 'Key Features (One per line)', type: 'textarea' },
    { name: 'secondary_image_1', label: 'Secondary Image 1', type: 'image' },
    { name: 'secondary_image_2', label: 'Secondary Image 2', type: 'image' },
    { name: 'maintenance_title', label: 'Maintenance Title', type: 'text' },
    { name: 'maintenance_desc', label: 'Maintenance Description', type: 'textarea' },
    { name: 'maintenance_items', label: 'Maintenance Items (JSON Array: [{"step":"01.","title":"...","desc":"..."}])', type: 'textarea' },
    { name: 'technologies', label: 'Technologies', type: 'tech-list' },
    { name: 'faqs', label: 'FAQs (JSON Array: [{"question":"...","answer":"..."}])', type: 'textarea' },
  ];

  return <EntityManager entity="services" title="Services" fields={fields} viewType="grid" />;
};

export default ServicesAdmin;
