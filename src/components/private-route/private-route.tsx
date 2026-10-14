import { Navigate } from 'react-router-dom';
import { AppRoute, AuthenticationStatus } from '../../const';
import Favorites from '../../pages/favorites/favorites';
import { useAppSelector } from '../../hooks/redux';
import { getAuthenticationStatus } from '../../store/offers/offers-selectors';

export default function PrivateRoute(): JSX.Element {
  const authenticationStatus = useAppSelector(getAuthenticationStatus);

  return authenticationStatus === AuthenticationStatus.Auth ? (
    <Favorites />
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
