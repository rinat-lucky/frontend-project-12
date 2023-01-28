import axios from 'axios';

export default class ChatAPI {
  _apiBase = "/api/v1/";

  login = async (payload) => {
    try {
      const res = await axios.post(`${this._apiBase}login`, payload);
      return res.data.token;
    } catch (error) {
      throw new Error(`Ошибка при авторизации: ${error.message}`);
    }
  };
}
