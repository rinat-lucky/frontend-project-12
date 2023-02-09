import { useEffect, useRef, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Image, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import AuthContainer from '../components/AuthContainer';
import ChatAPI from '../api/ChatAPI';
import useAuth from '../hooks/useAuth';
import img from '../assets/login.jpg';

const schema = yup.object().shape({
  username: yup.string().min(3).max(20).required(),
  password: yup.string().min(5).required(),
});

const LoginPage = () => {
  const auth = useAuth();
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const api = useMemo(() => new ChatAPI(), []);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const [ authFailed, setAuthFailed ] = useState(false);

  useEffect(() => {
    if (userInfo) navigate('/');
  }, [userInfo, navigate]);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const jwt = await api.logIn(values);
        await auth.setAuth(jwt, values);
      } catch (_) {
        setAuthFailed(true);
      }
    },
  });
  
  const { handleSubmit, handleChange, values, errors, touched } = formik;

  return (
    <AuthContainer>
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <Image src={img} alt="Войти" roundedCircle={true} />
        </div>

        <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Войти</h1>
            <FloatingLabel controlId="floatingUsername" label="Ваш ник (admin)" className='mb-3'>
              <Form.Control
                ref={inputEl}
                onChange={handleChange}
                value={values.username}
                name="username"
                autoComplete="username"
                placeholder='Ваш ник (admin)'
                isInvalid={(touched.username && errors.username) || authFailed}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Пароль (admin)" className='mb-4'>
              <Form.Control
                onChange={handleChange}
                value={values.password}
                name="password"
                autoComplete="current-password"
                type="password"
                placeholder='Пароль (admin)'
                isInvalid={(touched.password && errors.password) || authFailed}
              />
              <Form.Control.Feedback type='invalid'>Неверные имя пользователя или пароль</Form.Control.Feedback>
            </FloatingLabel> 
          <Button type="submit" variant="outline-primary" className="w-100 mb-3 btn">Войти</Button>
        </Form>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>Нет аккаунта? </span>
          <Link to="../signup">Регистрация</Link>
        </div>
      </div>
    </AuthContainer>
  );
};

export default LoginPage;
