import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Header from "../header/Header";
import AuthConsumer from "../../contexts/AuthContext";

const HomePage = () => {
  const auth = AuthConsumer();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuth) navigate('login');
  }, [auth.isAuth, navigate])
  
  return (
    <div className="d-flex flex-column h-100">
      <Header logoutBtn={true} />
      <div className="m-3">
        <h1>Главная страница приложения</h1>
        <div>
          <Link to="404">на страницу 404</Link>
        </div>
        <div>
          <Link to="login">на страницу авторизации</Link>
        </div>
        <div>
          <Link to="signup">на страницу регистрации</Link>
        </div>
        <div>
          <Link to="/">на главную страницу</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
