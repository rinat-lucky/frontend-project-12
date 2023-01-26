import axios from 'axios';

export default class ChatAPI {
  _apiBase = "/api/v1/";

  logIn = async (payload) => {
    const res = await axios.post(`${this._apiBase}login`, payload);
    return res.data.token;
  };
}
