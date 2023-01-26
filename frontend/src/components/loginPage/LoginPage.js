import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Button, Form } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import Header from "../header/Header";

import ChatAPI from '../../api/ChatAPI';

const LoginPage = () => {
  const [logFailed, setLogFailed] = useState(false);
  const inputEl = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.state?.from?.pathname || '/';
  const api = new ChatAPI();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const logIn = async (params) => {
    try {
      const token = await api.logIn(params);
      console.log('token', token);
      localStorage.setItem('userId', JSON.stringify(token));
      return navigate(path);
    } catch (error) {
      setLogFailed(true);
      throw new Error(`Ошибка при попытке авторизации: ${error}`)
    }
  };

  const getValidData = async (object) => {
    
    try {
      const schemaStr = yup.string().required().trim();
      const name = await schemaStr.validate(object['username']);
      const pass = await schemaStr.validate(object['password']);
      return { username: name, password: pass };
    } catch (error) {
      setLogFailed(true);
      throw new Error(`Ошибка валидации: ${error}`)
    }
  };
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const validData = await getValidData(values);
      await logIn(validData);

      // const handleSubmit = (event) => {
      //   const form = event.currentTarget;
      //   if (form.checkValidity() === false) {
      //     event.preventDefault();
      //     event.stopPropagation();
      //   }
      //   setValidated(true);
      // };
    },
  });
  
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  {/* <Image src="../../resources/images/login.jpg" alt="Войти" roundedCircle={true} /> */}
                  <Image src="" alt="Войти" roundedCircle={true} />
                </div>

                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                    <Form.Control
                      ref={inputEl}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder="Ваш ник"
                      name="username"
                      autoComplete="username"
                      required
                      id="username"
                    />
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="Пароль"
                      name="password"
                      autoComplete="current-password"
                      required
                      id="password"
                      type="password"
                      isInvalid={logFailed}
                    />
                    <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="outline-primary" className="w-100 mb-3 btn">Войти</Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        Полезные ссылки:
        <div>
          <Link to="../404">на страницу 404</Link>
        </div>
        <div>
          <Link to="../login">на страницу авторизации</Link>
        </div>
        <div>
          <Link to="/">на главную страницу</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
