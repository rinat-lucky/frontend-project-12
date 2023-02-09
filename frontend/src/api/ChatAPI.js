import axios from 'axios';
import routes from '../routes';

export default class ChatAPI {
  logIn = async (userData) => {
    try {
      const res = await axios.post(routes.loginPath(), userData);
      return res.data.token;
    } catch (error) {
      throw new Error(`Ошибка при авторизации: ${error.message}`);
    }
  };

  signUp = async (userData) => {
    try {
      const res = await axios.post(routes.signupPath(), userData);
      return res.data.token;
    } catch (error) {
      throw new Error(`Ошибка при регистрации: ${error.message}`);
    }
  };

  getData = async (jwt) => {
    try {
      const res = await axios.get(routes.dataPath(), { headers: {"Authorization": `Bearer ${jwt}`} });
      return res.data;
    } catch (error) {
      throw new Error(`Ошибка при запросе данных: ${error.message}`);
    }
  };
}
