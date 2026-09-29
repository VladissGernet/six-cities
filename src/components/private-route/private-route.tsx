import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Favorites from '../../pages/favorites/favorites';
import { useAppSelector } from '../../hooks/redux';

export default function PrivateRoute(): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );

  return authorizationStatus === AuthorizationStatus.Auth ? (
    <Favorites />
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
