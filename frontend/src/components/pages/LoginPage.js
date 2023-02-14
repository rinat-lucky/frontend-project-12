import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Button, Form, Image, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';

import { useSchemaLogin as useSchema } from '../../hooks/useSchema';
import AuthContainer from '../AuthContainer';
import { useAuth, useChat } from '../../hooks';
import { routesApp } from "../../routes";
import img from '../../assets/login.jpg';

const LoginPage = () => {
  const { user, logIn} = useAuth();
  const { signIn } = useChat();
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [ authFailedText, setAuthFailedText ] = useState('');

  useEffect(() => {
    if (user) navigate(routesApp.homePage);
  }, [user]);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: useSchema(),
    onSubmit: async (values) => {
      try {
        const userData = await signIn(values);
        logIn(userData);
      } catch (_) {
        setAuthFailedText(t('error.wrongData'));
      }
    },
  });

  return (
    <AuthContainer>
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <Image src={img} alt={t('loginPage.imgAlt')} roundedCircle={true} />
        </div>

        <Form onSubmit={f.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
            <FloatingLabel controlId="floatingUsername" label={t('loginPage.nameLabel')} className='mb-3'>
              <Form.Control
                ref={inputEl}
                onChange={f.handleChange}
                value={f.values.username}
                name="username"
                autoComplete="username"
                placeholder={t('loginPage.nameLabel')}
                isInvalid={(f.touched.username && f.errors.username) || authFailedText}
              />
              <Form.Control.Feedback type='invalid'>{f.errors.username}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label={t('loginPage.passwordLabel')} className='mb-4'>
              <Form.Control
                onChange={f.handleChange}
                value={f.values.password}
                name="password"
                autoComplete="current-password"
                type="password"
                placeholder={t('loginPage.passwordLabel')}
                isInvalid={(f.touched.password && f.errors.password) || authFailedText}
              />
              <Form.Control.Feedback type='invalid'>{f.errors.password || authFailedText}</Form.Control.Feedback>
            </FloatingLabel> 
          <Button type="submit" variant="outline-primary" className="w-100 mb-3 btn">{t('loginPage.submitButton')}</Button>
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
