import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import AuthConsumer from "../contexts/AuthContext";

const Header = ({ logoutBtn }) => {
  const auth = AuthConsumer();
  const onLogOut = async () => await auth.setLogout();
  
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
        { logoutBtn && <Button onClick={onLogOut}>Выйти</Button> }
      </div>
    </nav>
  );
};

export default Header;
