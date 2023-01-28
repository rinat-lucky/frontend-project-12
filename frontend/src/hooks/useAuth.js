import { useState } from "react";

const useAuth = () => {
  const [isAuth, setAuth] = useState(false);

  return {
    isAuth,
    setLogin(jwt) {
      return new Promise((resolve) => {
        localStorage.setItem('JWT', jwt);
        setAuth(true);
        resolve();
      });
    },
    setLogout() {
      return new Promise((resolve) => {
        localStorage.removeItem('JWT');
        setAuth(false);
        resolve();
      });
    },
  };
};

export default useAuth;
