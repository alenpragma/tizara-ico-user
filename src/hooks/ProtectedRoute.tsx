import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();
  const token = localStorage.getItem('tizaraUserToken');

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
