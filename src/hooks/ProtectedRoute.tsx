import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: any) => {

  const token = localStorage.getItem('biztoken');

  const location = useLocation();

  if (!token) {
    return <Navigate to='/' state={{ from: location }} replace></Navigate >;
  }

  return children;
};

export default ProtectedRoute;