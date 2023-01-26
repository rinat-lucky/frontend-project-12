import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Домашняя страница</h1>
      <div>
        <Link to="404" relative="/">на страницу 404</Link>
      </div>
      <div>
        <Link to="login" relative="/">на страницу авторизации</Link>
      </div>
      <div>
        <Link to="/" relative="/">на главную страницу</Link>
      </div>
    </div>
  );
};

export default HomePage;