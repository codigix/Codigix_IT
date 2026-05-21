import { useEffect } from 'react';

const STYLES = [
  '/assets/css/bootstrap.min.css',
  '/assets/css/animate.min.css',
  '/assets/css/ainex-icons.css',
  '/assets/css/nice-select.css',
  '/assets/css/swiper.min.css',
  '/assets/css/venobox.min.css',
  '/assets/css/meanmenu.css',
  '/assets/css/main.css'
];

const ExternalStyles = () => {
  useEffect(() => {
    const links = STYLES.map(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.className = 'external-style';
      document.head.appendChild(link);
      return link;
    });

    return () => {
      links.forEach(link => {
        if (link && link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, []);

  return null;
};

export default ExternalStyles;
