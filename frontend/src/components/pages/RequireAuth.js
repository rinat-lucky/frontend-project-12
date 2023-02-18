import { Navigate } from 'react-router-dom';
import { routesApp } from '../../routes';
import { useAuth } from '../../hooks';

const RequireAuth = ({ children }) => {
  const { user } = useAuth();

  return user
    ? children
    : <Navigate to={routesApp.loginPage} replace />;
};

export default RequireAuth;
