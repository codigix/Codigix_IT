const API_BASE_URL = '/api';

const getImageUrl = (image, defaultFolder = "") => {
    if (!image) return "";
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
  getImageUrl
};
