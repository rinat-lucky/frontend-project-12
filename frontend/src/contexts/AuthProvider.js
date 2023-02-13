import React, { useState } from 'react';
import { AuthContext } from './index.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const initialState = currentUser ? currentUser : null;
  const [user, setUser] = useState(initialState);

  const logIn = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
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
