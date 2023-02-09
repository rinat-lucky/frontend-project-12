import { useEffect, useRef, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Image, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { addNewUser } from '../slices/usersSlice';

import AuthContainer from '../components/AuthContainer';
import ChatAPI from '../api/ChatAPI';
import useAuth from '../hooks/useAuth';
import img from '../assets/login.jpg';

const SignupPage = () => {
  const auth = useAuth();
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useMemo(() => new ChatAPI(), []);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const [ authFailed, setAuthFailedText ] = useState('');

  useEffect(() => {
    if (userInfo) navigate('/');
  }, [userInfo, navigate]);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  yup.setLocale({
    string: {
      min: 'field_too_short',
      max: 'field_too_big',
      required: 'field_empty',
      oneOf: 'field_must_match',
    },
  });

  const schema = yup.object().shape({
    username: yup.string().min(3).max(20).required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().required()
      .oneOf([yup.ref('password')]),
  });
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const jwt = await api.signUp(values);
        const { confirmPassword, ...userData } = values;
        await auth.setAuth(jwt, userData);
        dispatch(addNewUser(userData));
      } catch (_) {
        setAuthFailedText('Такой пользователь уже существует');
      }
    },
  });
  
  const { handleSubmit, handleChange, values, errors, touched } = formik;
  
  return (
    <AuthContainer>
      <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div>
          <Image src={img} roundedCircle={true} alt="Регистрация" />
        </div>

        <Form onSubmit={handleSubmit} className="w-50">
          <h1 className="text-center mb-4">Регистрация</h1>
            <FloatingLabel controlId="floatingUsername" label="Имя пользователя" className="mb-3">
              <Form.Control
                ref={inputEl}
                onChange={handleChange}
                value={values.username}
                name="username"
                placeholder='Имя пользователя'
                isInvalid={authFailed || (touched.username && errors.username)}
              />
              <Form.Control.Feedback type="invalid" tooltip>{errors.username}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Пароль" className="mb-3">
              <Form.Control
                onChange={handleChange}
                value={values.password}
                name="password"
                aria-describedby="passwordHelpBlock"
                type="password"
                placeholder='Пароль'
                isInvalid={authFailed || (touched.password && errors.password)}
              />
              <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingConfirmPassword" label="Подтвердите пароль" className="mb-4">
              <Form.Control
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                value={values.confirmPassword}
                placeholder='Подтвердите пароль'
                isInvalid={authFailed || (touched.confirmPassword && errors.confirmPassword)}
              />
              <Form.Control.Feedback type="invalid" tooltip>{authFailed || errors.confirmPassword}</Form.Control.Feedback>
            </FloatingLabel>
          <Button type="submit" className="w-100" variant="outline-primary">Зарегистрироваться</Button>
        </Form>

      </div>
    </AuthContainer>
  );
};

export default SignupPage;
