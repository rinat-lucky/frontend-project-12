import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import axios from 'axios';
import { routesAPI } from '../routes';

const ChatAPI = () => {
  const { t } = useTranslation();
  
  const signIn = async (userData) => {
    try {
      const res = await axios.post(routesAPI.signinPath(), userData);
      return res.data;
    } catch (err) {
      if (err.message === 'Network Error') {
        toast.error(t(`notice.networkError`));
      } else {
        toast.error(t(`notice.signin`));
      }
      throw new Error(`${t(`notice.signin`)}: ${err}`);
    }
  };

  const signUp = async (userData) => {
    try {
      const res = await axios.post(routesAPI.signupPath(), userData);
      return res.data;
    } catch (err) {
      if (err.message === 'Network Error') {
        toast.error(t(`notice.networkError`));
      } else {
        toast.error(t(`notice.signup`));
      }
      throw new Error(`${t(`notice.signup`)}: ${err}`);
    }
  };

  const getData = async (jwt) => {
    try {
      const res = await axios.get(routesAPI.dataPath(), { headers: {"Authorization": `Bearer ${jwt}`} });
      return res.data;
    } catch (err) {
      if (err.message === 'Network Error') {
        toast.error(t(`notice.networkError`));
      } else {
        toast.error(t(`notice.getData`));
      }
      throw new Error(`${t(`notice.getData`)}: ${err}`);
    }
  };

  return {
    signIn,
    signUp,
    getData,
  };
};

export default ChatAPI;
