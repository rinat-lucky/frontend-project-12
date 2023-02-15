import axios from 'axios';
import { routesAPI } from '../routes';

const ChatAPI = () => {
  const signIn = async (userData) => {
    const res = await axios.post(routesAPI.signinPath(), userData);
    return res.data;
  };

  const signUp = async (userData) => {
    const res = await axios.post(routesAPI.signupPath(), userData);
    return res.data;
  };

  const getData = async (jwt) => {
    const res = await axios.get(
      routesAPI.dataPath(),
      { headers: { Authorization: `Bearer ${jwt}` } },
    );
    return res.data;
  };

  return {
    signIn,
    signUp,
    getData,
  };
};

export default ChatAPI;
