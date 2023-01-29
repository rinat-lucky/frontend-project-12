import { Link } from "react-router-dom";
import Header from "../components/Header";

const SignupPage = () => {
  return (
    <div>
      <Header />
      <div className="m-3">
        <h1>Страница регистрации</h1>
        <div>
          <Link to="../login">на страницу авторизации</Link>
        </div>
        <div>
          <Link to="../signup">на страницу регистрации</Link>
        </div>
        <div>
          <Link to="/">на главную страницу</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
