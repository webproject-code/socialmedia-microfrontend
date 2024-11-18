import { useStore } from '@social-media/utils';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
