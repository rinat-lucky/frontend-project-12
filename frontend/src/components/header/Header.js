import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
      </div>
    </nav>
  );
};

export default Header;
