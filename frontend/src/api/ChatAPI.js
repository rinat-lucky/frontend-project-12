import axios from 'axios';

export default class ChatAPI {
  _apiBase = "/api/v1/";

  logIn = async (payload) => {
    try {
      const res = await axios.post(`${this._apiBase}login`, payload);
      return res.data.token;
    } catch (error) {
      throw new Error(`Ошибка при авторизации: ${error.message}`);
    }
  };

  signUp = async (payload) => {
    try {
      const res = await axios.post(`${this._apiBase}signup`, payload);
      return res.data.token;
    } catch (error) {
      throw new Error(`Ошибка при регистрации: ${error.message}`);
    }
  };

  getData = async (jwt) => {
    try {
      const res = await axios.get(`${this._apiBase}data`, { headers: {"Authorization": `Bearer ${jwt}`} });
      return res.data;
    } catch (error) {
      throw new Error(`Ошибка при запросе данных: ${error.message}`);
    }
  };
}
