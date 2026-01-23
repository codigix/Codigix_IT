import React from 'react';
import EntityManager from './EntityManager';

const BlogsAdmin = () => {
  const fields = [
    { name: 'title', label: 'Blog Title', type: 'text' },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'date', label: 'Date', type: 'text' },
    { name: 'image', label: 'Image Name', type: 'text' },
  ];

  return <EntityManager entity="blogs" title="Blogs" fields={fields} viewType="grid" />;
};

export default BlogsAdmin;
