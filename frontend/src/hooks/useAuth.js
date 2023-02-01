import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../slices/usersSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  return {
    setAuth(jwt, user) {
      return new Promise((resolve) => {
        localStorage.setItem('userId', jwt);
        dispatch(setCurrentUser(user));
        resolve();
      });
    },
    setLogout() {
      return new Promise((resolve) => {
        localStorage.removeItem('userId');
        dispatch(setCurrentUser({}));
        resolve();
      });
    },
  };
};

export default useAuth;
