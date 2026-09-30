import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/redux';
import HeaderLoggedIn from './header-logged-in';
import HeaderSignIn from './header-sign-in';

export default function HeaderNav(): JSX.Element {
  const isAuth =
    useAppSelector((state) => state.authorizationStatus) ===
    AuthorizationStatus.Auth;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuth ? <HeaderLoggedIn /> : <HeaderSignIn />}
      </ul>
    </nav>
  );
}
