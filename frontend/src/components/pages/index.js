import { createBrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import RequireAuth from './RequireAuth';
import NotFoundPage from './NotFoundPage';
import { routesApp } from '../../routes';

const router = createBrowserRouter([
  {
    path: routesApp.homePage,
    element: (
      <RequireAuth>
        <HomePage />
      </RequireAuth>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: routesApp.loginPage,
    element: <LoginPage />,
  },
  {
    path: routesApp.signupPage,
    element: <SignupPage />,
  },
]);

export default router;
