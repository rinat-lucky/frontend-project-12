import { useContext, createContext } from "react";
// import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  // const navigate = useNavigate();
  // const jwt = localStorage.getItem('JWT');

  // useEffect(() => {
  //   if (!jwt) navigate('../login');
  // }, [jwt, navigate])

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = () => useContext(AuthContext);

export default AuthConsumer;
