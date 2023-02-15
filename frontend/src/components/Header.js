import { memo } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line react/display-name
const Header = memo(({ onLogOut }) => {
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">{t('header.appTitle')}</Link>
        { onLogOut && <Button onClick={onLogOut}>{t('header.logOutButton')}</Button> }
      </div>
    </nav>
  );
});

export default Header;
