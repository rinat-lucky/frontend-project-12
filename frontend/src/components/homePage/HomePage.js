import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Header from "../header/Header";
import AuthConsumer from "../../contexts/AuthContext";

const HomePage = () => {
  const auth = AuthConsumer();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('userId');

  useEffect(() => {
    const checkAuth = async () => {
      if (!jwt) return navigate('login');
      await auth.setLogin(jwt);
    };
    checkAuth();
  }, [jwt, navigate, auth]);
  
  return (
    <div className="d-flex flex-column h-100">
      <Header logoutBtn={true} />
      <div className="m-3">
        <h1>Главная страница приложения</h1>
        <div>
          <Link to="login">на страницу авторизации</Link>
        </div>
        <div>
          <Link to="signup">на страницу регистрации</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
