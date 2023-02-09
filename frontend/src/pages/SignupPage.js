import { useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Image, FloatingLabel } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { addNewUser } from '../slices/usersSlice';

import AuthContainer from '../components/AuthContainer';
import ChatAPI from '../api/ChatAPI';
import useAuth from '../hooks/useAuth';

const imgURL = "https://hsto.org/getpro/moikrug/uploads/company/100/006/614/6/logo/medium_733e8366d5e14ff8539f5fccc8c058da.jpg";

const SignupPage = () => {
  const auth = useAuth();
  const inputEl = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useMemo(() => new ChatAPI(), []);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const users = useSelector((state) => state.users.list);
  const usersNames = users.map((u) => u.username);

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
      notOneOf: 'field_not_unique',
      oneOf: 'field_must_match',
    },
  });

  const schema = yup.object().shape({
    username: yup.string().min(3).max(20).required()
      .notOneOf(usersNames),
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
      const jwt = await api.signUp(values);
      const { confirmPassword, ...userData } = values;
      await auth.setAuth(jwt, userData);
      // при неудачной регистрации/авторизации принудительно вызывать ошибку
      dispatch(addNewUser(userData));
    },
  });
  
  const { handleSubmit, handleChange, values, errors, touched } = formik;
  
  return (
    <AuthContainer>
      <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
        <div>
          <Image src={imgURL} roundedCircle={true} alt="Регистрация" />
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
                isInvalid={touched.username && errors.username}
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
                isInvalid={touched.password && errors.password}
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
                isInvalid={touched.confirmPassword && errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid" tooltip>{errors.confirmPassword}</Form.Control.Feedback>
            </FloatingLabel>
          <Button type="submit" className="w-100" variant="outline-primary">Зарегистрироваться</Button>
        </Form>

      </div>
    </AuthContainer>
  );
};

export default SignupPage;
