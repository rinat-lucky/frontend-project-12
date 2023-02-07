import { useEffect, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Image, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import AuthContainer from '../components/AuthContainer';
import ChatAPI from '../api/ChatAPI';
import useAuth from '../hooks/useAuth';

const imgURL = "https://hsto.org/getpro/moikrug/uploads/company/100/006/614/6/logo/medium_733e8366d5e14ff8539f5fccc8c058da.jpg";
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
      const jwt = await api.logIn(values);
      await auth.setAuth(jwt, values);
    },
  });
  
  const { handleSubmit, handleChange, values, errors, touched } = formik;

  return (
    <AuthContainer>
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <Image src={imgURL} alt="Войти" roundedCircle={true} />
        </div>

        <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
          <h1 className="text-center mb-4">Войти</h1>
          <Form.Group className="form-floating mb-3">
            <FloatingLabel controlId="floatingUsername" label="Ваш ник (admin)">
              <Form.Control
                ref={inputEl}
                onChange={handleChange}
                value={values.username}
                placeholder="Ваш ник"
                name="username"
                autoComplete="username"
                required
                isInvalid={touched.username && errors.username}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="form-floating mb-4">
            <FloatingLabel controlId="floatingPassword" label="Пароль (admin)">
              <Form.Control
                onChange={handleChange}
                value={values.password}
                placeholder="Пароль"
                name="password"
                autoComplete="current-password"
                required
                type="password"
                isInvalid={touched.password && errors.password}
              />
            </FloatingLabel>
            <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
          </Form.Group>
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
