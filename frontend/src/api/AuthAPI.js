import axios from 'axios';
import { routesAPI } from '../routes';

export default class AuthAPI {
  logIn = async (userData) => {
    try {
      const res = await axios.post(routesAPI.loginPath(), userData);
      return res.data;
    } catch (error) {
      throw new Error(`Ошибка при авторизации: ${error.message}`);
    }
  };

  signUp = async (userData) => {
    try {
      const res = await axios.post(routesAPI.signupPath(), userData);
      return res.data;
    } catch (error) {
      throw new Error(`Ошибка при регистрации: ${error.message}`);
    }
  };

  getData = async (jwt) => {
    try {
      const res = await axios.get(routesAPI.dataPath(), { headers: {"Authorization": `Bearer ${jwt}`} });
      return res.data;
    } catch (error) {
      throw new Error(`Ошибка при запросе данных: ${error.message}`);
    }
  };
}
