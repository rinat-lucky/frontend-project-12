const apiBase = '/api/v1';

const routes = {
  loginPath: () => [apiBase, 'login'].join('/'),
  signupPath: () => [apiBase, 'signup'].join('/'),
  dataPath: () => [apiBase, 'data'].join('/'),
};

export default routes;
