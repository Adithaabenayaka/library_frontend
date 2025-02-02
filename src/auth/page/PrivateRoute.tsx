import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../services/AuthService';

const PrivateRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
