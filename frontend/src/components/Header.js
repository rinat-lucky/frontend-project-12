import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Header = ({ onLogOut }) => {
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
        { onLogOut && <Button onClick={onLogOut}>Выйти</Button> }
      </div>
    </nav>
  );
};

export default Header;
