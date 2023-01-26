import { Link } from "react-router-dom";
import Header from "../header/Header";

const HomePage = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="m-3">
        <h1>Главная страница приложения</h1>
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
    </div>
  );
};

export default HomePage;