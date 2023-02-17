import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';

const Header = () => {
  const { user, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">{t('header.appTitle')}</Link>
        { user && <Button onClick={logOut}>{t('header.logOutButton')}</Button> }
      </div>
    </nav>
  );
};

export default Header;
