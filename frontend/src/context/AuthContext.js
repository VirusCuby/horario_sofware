import React, { createContext, useState } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    user: null,
  });

  const login = (token, user) => {
    setAuth({
      isAuthenticated: true,
      token,
      user,
    });
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      token: null,
      user: null,
    });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
