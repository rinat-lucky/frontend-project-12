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

  // https://github.com/jquense/yup/tree/pre-v1#using-a-custom-locale-dictionary
  const schema = yup.object().shape({
    username: yup.string().min(3).max(20).required()
      .notOneOf(usersNames),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().required()
      .oneOf([yup.ref('password'), null]),
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
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingUsername" label="Имя пользователя">
              <Form.Control
                ref={inputEl}
                onChange={handleChange}
                value={values.username}
                placeholder="От 3 до 20 символов"
                name="username"
                autoComplete="username"
                required
                isInvalid={touched.username && errors.username}
              />
            </FloatingLabel>
            <Form.Control.Feedback type="invalid" tooltip>Обязательное поле</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="floatingPassword" label="Пароль">
              <Form.Control
                onChange={handleChange}
                value={values.password}
                placeholder="Не менее 6 символов"
                name="password"
                aria-describedby="passwordHelpBlock"
                required
                autoComplete="new-password"
                type="password"
                isInvalid={touched.password && errors.password}
              />
            </FloatingLabel>
            <Form.Control.Feedback type="invalid" tooltip>Обязательное поле</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4">
            <FloatingLabel controlId="floatingConfirmPassword" label="Подтвердите пароль">
              <Form.Control
                placeholder="Пароли должны совпадать"
                name="confirmPassword"
                required
                autoComplete="new-password"
                type="password"
                onChange={handleChange}
                value={values.confirmPassword}
              />
            </FloatingLabel>
            <Form.Control.Feedback type="invalid" tooltip>Пароли должны совпадать</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="w-100" variant="outline-primary">Зарегистрироваться</Button>
        </Form>

      </div>
    </AuthContainer>
  );
};

export default SignupPage;
