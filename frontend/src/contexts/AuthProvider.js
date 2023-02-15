import React, { useState } from 'react';
import { AuthContext } from './index.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const initialState = currentUser || null;
  const [user, setUser] = useState(initialState);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      logIn,
      logOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
