import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const jwtToken = sessionStorage.getItem('jwtToken');

  if (!jwtToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
