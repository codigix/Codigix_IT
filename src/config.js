const API_BASE_URL = '/api';
const SITE_URL = 'https://codigixinfotech.com';
const SITE_NAME = 'Codigix';

const getImageUrl = (image, defaultFolder = "") => {
    if (!image) return null;
    if (image.startsWith("http") || image.startsWith("/") || image.startsWith("data:")) {
      return image;
    }
    if (defaultFolder && !image.startsWith("assets")) {
      return `/${defaultFolder}/${image}${image.includes('.') ? '' : '.webp'}`;
    }
    return `/${image}`;
};

export default {
  API_BASE_URL,
  SITE_URL,
  SITE_NAME,
  getImageUrl
};
