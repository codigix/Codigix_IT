const API_BASE_URL = '/api';
const SITE_URL = 'https://codigixinfotech.com';
const SITE_NAME = 'Codigix';

const getImageUrl = (image, defaultFolder = "", width = null) => {
    if (!image) return null;

    // Handle Cloudinary optimization
    if (typeof image === 'string' && image.includes('res.cloudinary.com')) {
      const widthParam = width ? `,w_${width},c_limit` : ',w_1920,c_limit';
      return image.replace('/upload/', `/upload/f_auto,q_auto${widthParam}/`);
    }

    // Admin uploads: older ones were saved as http://localhost:5000/uploads/<file>
    // (the backend's own address) or /uploads/<file>; the live site serves them
    // at /api/uploads/<file>
    const upload = typeof image === 'string' && image.match(/^(?:https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?)?\/uploads\/(.+)$/);
    if (upload) return `/api/uploads/${upload[1]}`;

    if (image.startsWith("http") || image.startsWith("/") || image.startsWith("data:")) {
      return image;
    }
    if (defaultFolder && !image.startsWith("assets")) {
      // Don't append .webp if it's already a base64 or has a dot
      if (image.startsWith("data:") || image.includes('.')) {
          return `/${defaultFolder}/${image}`;
      }
      return `/${defaultFolder}/${image}.webp`;
    }
    return `/${image}`;
};

export default {
  API_BASE_URL,
  SITE_URL,
  SITE_NAME,
  getImageUrl
};
