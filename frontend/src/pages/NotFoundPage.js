import { useRouteError, Link } from "react-router-dom";
import Header from "../components/Header";

const imgURL = "https://hsto.org/getpro/moikrug/uploads/company/100/006/614/6/logo/medium_733e8366d5e14ff8539f5fccc8c058da.jpg";

const NotFoundPage = () => {
  const error = useRouteError();
  console.error(error);
  
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="text-center">
        <img alt="Страница не найдена" className="img-fluid h-25" src={imgURL} />
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">Но вы можете перейти <Link to="/">на главную страницу</Link></p>
      </div>
    </div>
  );
};

export default NotFoundPage;
