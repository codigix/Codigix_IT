// Google Analytics (GA4) Tracking Utility for Codigix Infotech
export const GA_TRACKING_ID = 'G-T3T20910VX';

// Trigger page view on route change
export const trackPageView = (path, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: path || window.location.pathname + window.location.search,
      page_title: title || document.title,
      send_page_view: true
    });
    console.log(`[GA4 Tracked Pageview]: ${path} - ${title || document.title}`);
  }
};

// Custom Event Tracker
export const trackEvent = (action, category, label = '', value = 0) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
    console.log(`[GA4 Tracked Event]: Category=${category}, Action=${action}, Label=${label}`);
  }
};

// Specialized Event Helpers
export const trackContactSubmit = (formData) => {
  trackEvent('contact_form_submit', 'Contact', formData?.service || 'General Inquiry');
};

export const trackJobApply = (jobTitle) => {
  trackEvent('job_application_submit', 'Careers', jobTitle);
};

export const trackServiceView = (serviceName) => {
  trackEvent('service_view', 'Services', serviceName);
};

export const trackIndustryView = (industryName) => {
  trackEvent('industry_view', 'Industries', industryName);
};
