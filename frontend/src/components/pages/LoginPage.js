import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import {
  Button,
  Form,
  Image,
  FloatingLabel,
} from 'react-bootstrap';

import AuthContainer from '../AuthContainer';
import { useAuth } from '../../hooks';
import { routesApp } from '../../routes';
import img from '../../assets/login.jpg';

const LoginPage = () => {
  const { user, logIn, signIn } = useAuth();
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    if (user) navigate(routesApp.homePage);
  }, [user, navigate]);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const userData = await signIn(formData);
      logIn(userData);
    } catch (err) {
      switch (err.code) {
        case 'ERR_NETWORK':
          toast.error(t('notice.networkError'));
          rollbar.error(t('notice.networkError'), err);
          throw new Error(`${t('notice.networkError')}: ${err}`);
        case 'ERR_BAD_REQUEST':
          setAuthFailed(true);
          rollbar.error(t('error.wrongData'), err, formData);
          throw new Error(`${t('error.wrongData')}: ${err}`);
        default:
          rollbar.error(t('notice.signin'), err, formData);
          throw new Error(`${t('notice.signin')}: ${err}`);
      }
    }
  };

  const validationSchema = yup.object().shape({
    username: yup.string()
      .min(3, t('error.wrongLength'))
      .max(20, t('error.wrongLength'))
      .required(t('error.required')),
    password: yup.string()
      .required(t('error.required')),
  });

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values);
      setSubmitting(false);
    },
  });

  return (
    <AuthContainer>
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <Image src={img} alt={t('loginPage.imgAlt')} roundedCircle />
        </div>
        <Form onSubmit={f.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
          <FloatingLabel controlId="floatingUsername" label={t('loginPage.nameLabel')} className="mb-3">
            <Form.Control
              ref={inputEl}
              onChange={f.handleChange}
              value={f.values.username}
              name="username"
              autoComplete="username"
              placeholder={t('loginPage.nameLabel')}
              isInvalid={(f.touched.username && f.errors.username) || authFailed}
              disabled={f.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">{f.errors.username}</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label={t('loginPage.passwordLabel')} className="mb-4">
            <Form.Control
              onChange={f.handleChange}
              value={f.values.password}
              name="password"
              autoComplete="current-password"
              type="password"
              placeholder={t('loginPage.passwordLabel')}
              isInvalid={(f.touched.password && f.errors.password) || authFailed}
              disabled={f.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {authFailed ? t('error.wrongData') : f.errors.password}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3 btn"
            disabled={f.isSubmitting || !f.values.password || !f.values.username}
          >
            {t('loginPage.submitButton')}
          </Button>
        </Form>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>{t('loginPage.haveNotAccount')}</span>
          <Link to={routesApp.signupPage}>{t('loginPage.registerLink')}</Link>
        </div>
      </div>
    </AuthContainer>
  );
};

export default LoginPage;
