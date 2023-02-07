const useAuth = () => {
  return {
    setAuth(jwt, user) {
      return new Promise((resolve) => {
        localStorage.setItem('user', JSON.stringify({token: jwt, username: user.username}));
        resolve();
      });
    },
    setLogout() {
      return new Promise((resolve) => {
        localStorage.removeItem('user');
        resolve();
      });
    },
  };
};

export default useAuth;
