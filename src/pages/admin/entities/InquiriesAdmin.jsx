import React from 'react';
import EntityManager from './EntityManager';

const InquiriesAdmin = () => {
  const fields = [
    { name: 'name', label: 'Client Name', type: 'text' },
    { name: 'email', label: 'Client Email', type: 'text' },
    { name: 'phone', label: 'Phone Number', type: 'text' },
    { name: 'subject', label: 'Subject', type: 'text' },
    { name: 'message', label: 'Inquiry Message', type: 'textarea' },
  ];

  return <EntityManager entity="inquiries" title="Contact Inquiries" fields={fields} viewType="table" />;
};

export default InquiriesAdmin;
