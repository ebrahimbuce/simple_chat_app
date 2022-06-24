import { Navigate, Outlet } from 'react-router-dom';
import useSession from '../hooks/useSession';

const PrivateRoute = () => {
  const { isAuthenticated } = useSession();
  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to='/' replace />;
};

export default PrivateRoute;
