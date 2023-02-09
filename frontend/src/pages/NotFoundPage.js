import { useRouteError, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import img from '../assets/login.jpg';

const NotFoundPage = () => {
  const { t } = useTranslation();
  const error = useRouteError();
  console.error(error);
  
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="text-center">
        <img alt="Страница не найдена" className="img-fluid h-25" src={img} />
        <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
        <p className="text-muted">{t('notFoundPage.navigateText')}<Link to="/">{t('notFoundPage.toHomePage')}</Link></p>
      </div>
    </div>
  );
};

export default NotFoundPage;
