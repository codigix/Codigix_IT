// Sends the admin login token with every request to this site's /api, so admin
// screens don't each have to add the Authorization header (the backend requires
// it for all writes, uploads and private data). Visitors have no token, so their
// requests are unchanged. An expired or invalid token sends the admin back to
// the login page instead of failing silently.
const TOKEN_KEY = 'adminToken';

const readToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

const isOwnApi = (url) => {
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.origin === window.location.origin && parsed.pathname.startsWith('/api/');
  } catch {
    return false;
  }
};

if (typeof window !== 'undefined' && window.fetch && !window.fetch.__adminAuth) {
  const originalFetch = window.fetch.bind(window);

  const adminFetch = async (input, init = {}) => {
    const token = readToken();
    const url = typeof input === 'string' || input instanceof URL ? String(input) : null;
    if (!token || !url || !isOwnApi(url)) return originalFetch(input, init);

    const headers = new Headers(init.headers || {});
    if (!headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`);
    const response = await originalFetch(input, { ...init, headers });

    const onAdminPage = window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login';
    if ((response.status === 401 || response.status === 403) && onAdminPage) {
      try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem('isAdminAuthenticated');
      } catch {
        /* storage blocked: nothing to clear */
      }
      window.location.assign('/admin/login');
    }
    return response;
  };
  adminFetch.__adminAuth = true;
  window.fetch = adminFetch;
}
