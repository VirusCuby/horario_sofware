import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RoleRoute = ({ children, allowedRoles }) => {
  const { auth } = useContext(AuthContext);

  // Verificar si el usuario está autenticado
  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Verificar si el rol del usuario está permitido
  if (!allowedRoles.includes(auth.rol)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RoleRoute;
