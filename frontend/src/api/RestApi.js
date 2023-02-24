import axios from 'axios';
import { routesAPI } from '../routes';
import getAuthHeader from '../utils';

const RestAPI = () => {
  const signIn = async (userData) => {
    const res = await axios.post(routesAPI.signinPath(), userData);
    return res.data;
  };

  const signUp = async (userData) => {
    const res = await axios.post(routesAPI.signupPath(), userData);
    return res.data;
  };

  const fetchData = async () => {
    const res = await axios.get(
      routesAPI.dataPath(),
      { headers: { ...getAuthHeader() } },
    );
    return res.data;
  };

  return {
    signIn,
    signUp,
    fetchData,
  };
};

export default RestAPI;
