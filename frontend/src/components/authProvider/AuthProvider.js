import { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/contexts";

const AuthProvider = ({ children }) => {
  const [isAuthorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('JWT')) setAuthorized(true);
  }, [])

  console.log('Авторизован ?', isAuthorized);

  return (
    <AuthContext.Provider value={{ isAuthorized, setAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
