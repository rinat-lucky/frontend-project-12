import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Header from "../components/Header";
import ChatAPI from '../api/ChatAPI';
import AuthConsumer from '../contexts/AuthContext';

const imgURL = "https://hsto.org/getpro/moikrug/uploads/company/100/006/614/6/logo/medium_733e8366d5e14ff8539f5fccc8c058da.jpg";
const schema = yup.object().shape({
  username: yup.string().min(2).max(15).required(),
  password: yup.string().min(2).max(15).required(),
});

const LoginPage = () => {
  const auth = AuthConsumer();
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const api = new ChatAPI();

  useEffect(() => {
    if (auth.isAuth) navigate('/');
  }, [auth, navigate])

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
      const jwt = await api.login(values);
      await auth.setLogin(jwt);
    },
  });
  
  const { handleSubmit, handleChange, values, errors, touched } = formik;

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <Image src={imgURL} alt="Войти" roundedCircle={true} />
                </div>

                <Form onSubmit={handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Label htmlFor="username">Ваш ник (admin)</Form.Label>
                    <Form.Control
                      ref={inputEl}
                      onChange={handleChange}
                      value={values.username}
                      placeholder="Ваш ник"
                      name="username"
                      autoComplete="username"
                      required
                      id="username"
                      isInvalid={touched.username && errors.username}
                    />
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Label htmlFor="password">Пароль (admin)</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      value={values.password}
                      placeholder="Пароль"
                      name="password"
                      autoComplete="current-password"
                      required
                      id="password"
                      type="password"
                      isInvalid={touched.password && errors.password}
                    />
                    <Form.Control.Feedback type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3 btn">Войти</Button>
                </Form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <Link to="../signup" relative="/">Регистрация</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
