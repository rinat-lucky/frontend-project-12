import { useRouteError, Link } from "react-router-dom";
import Header from "../components/Header";
import img from '../assets/login.jpg';

const NotFoundPage = () => {
  const error = useRouteError();
  console.error(error);
  
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="text-center">
        <img alt="Страница не найдена" className="img-fluid h-25" src={img} />
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">Но вы можете перейти <Link to="/">на главную страницу</Link></p>
      </div>
    </div>
  );
};

export default NotFoundPage;
