import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { routesApp } from '../../routes';
import { useAuth } from '../../hooks';
import img from '../../assets/signup.jpg';

const SignupPage = () => {
  const { user, logIn, signUp } = useAuth();
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

  const handleSubmitForm = async (formData) => {
    try {
      const userData = await signUp(formData);
      logIn(userData);
    } catch (err) {
      switch (err.code) {
        case 'ERR_NETWORK':
          toast.error(t('notice.networkError'));
          rollbar.error(t('notice.networkError'), err);
          throw new Error(`${t('notice.networkError')}: ${err}`);
        case 'ERR_BAD_REQUEST':
          setAuthFailed(true);
          rollbar.error(t('error.userAlreadyExist'), err, formData);
          throw new Error(`${t('error.userAlreadyExist')}: ${err}`);
        default:
          rollbar.error(t('notice.signup'), err, formData);
          throw new Error(`${t('notice.signup')}: ${err}`);
      }
    }
  };

  const validationSchema = yup.object().shape({
    username: yup.string()
      .min(3, t('error.wrongLength'))
      .max(20, t('error.wrongLength'))
      .required(t('error.required')),
    password: yup.string()
      .min(6, t('error.tooShort'))
      .required(t('error.required')),
    confirmPassword: yup.string()
      .required(t('error.required'))
      .oneOf([yup.ref('password')], t('error.mustMatch')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleSubmitForm(values);
      setSubmitting(false);
    },
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = formik;
  const disabled = isSubmitting || !values.password || !values.username || !values.confirmPassword;

  return (
    <AuthContainer>
      <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div>
          <Image src={img} roundedCircle alt={t('signupPage.title')} />
        </div>

        <Form onSubmit={handleSubmit} className="w-50">
          <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
          <FloatingLabel controlId="floatingUsername" label={t('signupPage.nameLabel')} className="mb-3">
            <Form.Control
              ref={inputEl}
              onChange={handleChange}
              value={values.username}
              name="username"
              placeholder={t('signupPage.nameLabel')}
              isInvalid={authFailed || (touched.username && errors.username)}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid" tooltip>{errors.username}</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label={t('signupPage.passwordLabel')}
            className="mb-3"
          >
            <Form.Control
              onChange={handleChange}
              value={values.password}
              name="password"
              aria-describedby="passwordHelpBlock"
              type="password"
              placeholder={t('signupPage.passwordLabel')}
              isInvalid={authFailed || (touched.password && errors.password)}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingConfirmPassword"
            label={t('signupPage.confirmPasswordLabel')}
            className="mb-4"
          >
            <Form.Control
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              value={values.confirmPassword}
              placeholder={t('signupPage.confirmPasswordLabel')}
              isInvalid={authFailed || (touched.confirmPassword && errors.confirmPassword)}
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {authFailed ? t('error.userAlreadyExist') : errors.confirmPassword}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button
            type="submit"
            className="w-100"
            variant="outline-primary"
            disabled={disabled}
          >
            {t('signupPage.submitButton')}
          </Button>
        </Form>
      </div>
    </AuthContainer>
  );
};

export default SignupPage;
