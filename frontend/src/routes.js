const apiBase = '/api/v1';

export const routesAPI = {
  dataPath: () => [apiBase, 'data'].join('/'),
  signinPath: () => [apiBase, 'login'].join('/'),
  signupPath: () => [apiBase, 'signup'].join('/'),
};

export const routesApp = {
  homePage: '/',
  loginPage: '/login',
  signupPage: '/signup',
};
