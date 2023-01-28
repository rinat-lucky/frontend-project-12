import { useState } from "react";

const useAuth = () => {
  const [isAuth, setAuth] = useState(false);

  return {
    isAuth,
    setLogin(id) {
      return new Promise((resolve) => {
        localStorage.setItem('userId', id);
        setAuth(true);
        resolve();
      });
    },
    setLogout() {
      return new Promise((resolve) => {
        localStorage.removeItem('userId');
        setAuth(false);
        resolve();
      });
    },
  };
};

export default useAuth;
