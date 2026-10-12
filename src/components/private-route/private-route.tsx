import { Navigate } from 'react-router-dom';
import { AppRoute, AuthenticationStatus } from '../../const';
import Favorites from '../../pages/favorites/favorites';
import { useAppSelector } from '../../hooks/redux';

export default function PrivateRoute(): JSX.Element {
  const authenticationStatus = useAppSelector(
    (state) => state.AuthenticationStatus,
  );

  return authenticationStatus === AuthenticationStatus.Auth ? (
    <Favorites />
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
