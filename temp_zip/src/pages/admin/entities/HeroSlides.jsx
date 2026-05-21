import React from 'react';
import EntityManager from './EntityManager';

const HeroSlides = () => {
  const fields = [
    { name: 'image', label: 'Image URL', type: 'text' },
    { name: 'subtitle', label: 'Subtitle', type: 'text' },
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ];

  return <EntityManager entity="slides" title="Hero Slides" fields={fields} viewType="grid" />;
};

export default HeroSlides;
