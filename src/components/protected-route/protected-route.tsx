/* eslint-disable prettier/prettier */
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { getIsAuthChecked, getUser } from '../../services/reducers/userSlice';
type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};
export default function ProtectedRoute({
  onlyUnAuth,
  children
}: ProtectedRouteProps) {
  const location = useLocation();
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  //console.log(user, isAuthChecked, location, onlyUnAuth);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }
  return children;
}