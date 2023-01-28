import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import AuthConsumer from "../../contexts/AuthContext";

const Header = ({ logoutBtn }) => {
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
        { logoutBtn && <LogoutButton/>}
      </div>
    </nav>
  );
};

const LogoutButton = () => {
  const auth = AuthConsumer();
  const onLogOut = async () => await auth.setLogout();

  return <Button onClick={onLogOut}>Выйти</Button>
};

export default Header;
