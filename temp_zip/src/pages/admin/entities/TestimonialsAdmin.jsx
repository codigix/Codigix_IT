import React from 'react';
import EntityManager from './EntityManager';

const TestimonialsAdmin = () => {
  const fields = [
    { name: 'quote', label: 'Quote', type: 'textarea' },
    { name: 'author', label: 'Author Name', type: 'text' },
    { name: 'designation', label: 'Designation', type: 'text' },
    { name: 'image', label: 'Image URL', type: 'text' },
  ];

  return <EntityManager entity="testimonials" title="Testimonials" fields={fields} viewType="grid" />;
};

export default TestimonialsAdmin;
