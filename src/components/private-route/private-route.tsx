import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  // Todo, заменить на PropsWithChildren,  см демо проект guess-mellody
  children: JSX.Element;
};

export default function PrivateRoute({
  authorizationStatus,
  children,
}: PrivateRouteProps): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
