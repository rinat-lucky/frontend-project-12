import axios from 'axios';
import { routesAPI } from '../routes';

const authAPI = () => {
  const signIn = async (userData) => {
    const { data } = await axios.post(routesAPI.signinPath(), userData);
    return data;
  };

  const signUp = async (userData) => {
    const { data } = await axios.post(routesAPI.signupPath(), userData);
    return data;
  };

  return { signIn, signUp };
};

export default authAPI;
