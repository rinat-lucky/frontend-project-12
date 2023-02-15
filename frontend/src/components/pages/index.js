import { createBrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import NotFoundPage from './NotFoundPage';
import { routesApp } from '../../routes';

const router = createBrowserRouter([
  {
    path: routesApp.homePage,
    element: <HomePage />,
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
