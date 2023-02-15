import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useRollbar } from '@rollbar/react';
import { Button, Form, Image, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { addNewUser } from '../../slices/usersSlice';
import AuthContainer from '../AuthContainer';
import { routesApp } from '../../routes';
import { useAuth, useChat } from '../../hooks';
import { useSchemaSignup as useSchema } from '../../hooks/useSchema';
import img from '../../assets/login.jpg';

const SignupPage = () => {
  const { user, logIn } = useAuth();
  const { signUp } = useChat();
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const [ authFailed, setAuthFailedText ] = useState('');

  useEffect(() => {
    if (user) navigate(routesApp.homePage);
  }, [user]);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const userData = await signUp(formData);
      logIn(userData);
      dispatch(addNewUser(userData));
    } catch (err) {
      switch (err.code) {
        case 'ERR_NETWORK':
          toast.error(t('notice.networkError'));
          rollbar.error(t('notice.networkError'), err);
          throw new Error(`${t('notice.networkError')}: ${err}`);
        case 'ERR_BAD_REQUEST':
          setAuthFailedText(t('error.userAlreadyExist'));
          rollbar.error(t('error.userAlreadyExist'), err, formData);
          throw new Error(`${t('error.userAlreadyExist')}: ${err}`);
        default:
          rollbar.error(t('notice.signup'), err, formData);
          throw new Error(`${t('notice.signup')}: ${err}`);
      }
    }
  };
  
  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: useSchema(),
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <AuthContainer>
      <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div>
          <Image src={img} roundedCircle={true} alt={t('signupPage.title')} />
        </div>

        <Form onSubmit={f.handleSubmit} className="w-50">
          <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
            <FloatingLabel controlId="floatingUsername" label={t('signupPage.nameLabel')} className="mb-3">
              <Form.Control
                ref={inputEl}
                onChange={f.handleChange}
                value={f.values.username}
                name="username"
                placeholder={t('signupPage.nameLabel')}
                isInvalid={authFailed || (f.touched.username && f.errors.username)}
              />
              <Form.Control.Feedback type="invalid" tooltip>{f.errors.username}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label={t('signupPage.passwordLabel')} className="mb-3">
              <Form.Control
                onChange={f.handleChange}
                value={f.values.password}
                name="password"
                aria-describedby="passwordHelpBlock"
                type="password"
                placeholder={t('signupPage.passwordLabel')}
                isInvalid={authFailed || (f.touched.password && f.errors.password)}
              />
              <Form.Control.Feedback type="invalid" tooltip>{f.errors.password}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingConfirmPassword" label={t('signupPage.confirmPasswordLabel')} className="mb-4">
              <Form.Control
                name="confirmPassword"
                type="password"
                onChange={f.handleChange}
                value={f.values.confirmPassword}
                placeholder={t('signupPage.confirmPasswordLabel')}
                isInvalid={authFailed || (f.touched.confirmPassword && f.errors.confirmPassword)}
              />
              <Form.Control.Feedback type="invalid" tooltip>{authFailed || f.errors.confirmPassword}</Form.Control.Feedback>
            </FloatingLabel>
          <Button type="submit" className="w-100" variant="outline-primary">{t('signupPage.submitButton')}</Button>
        </Form>

      </div>
    </AuthContainer>
  );
};

export default SignupPage;
