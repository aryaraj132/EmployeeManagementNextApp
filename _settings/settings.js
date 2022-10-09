const URLS = {
    HOME_URL: '/',
    LOGIN_URL: '/auth/login',
    LOGIN_REDIRECT_URL: '/dashboard',
  };
  
  const ANONYMOUS_REQUIRED_PATHS = new Set([
    URLS.LOGIN_URL,
  ]);
  
  const ANON_OR_AUTH_PATH_PREFIX = new Set([
    URLS.HOME_URL,
  ]);

  export const Settings = {
    ANONYMOUS_REQUIRED_PATHS,
    ANON_OR_AUTH_PATH_PREFIX,
    URLS,
  };
  