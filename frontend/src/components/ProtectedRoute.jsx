import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useStores from '../hooks/useStores';

const ProtectedRoute = () => {
  const { userStore } = useStores();

  return userStore.user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
