import HeaderLoggedIn from './header-logged-in';
import HeaderSignIn from './header-sign-in';

type HeaderNavProps = {
  isLoggedIn?: boolean;
};

export default function HeaderNav({ isLoggedIn }: HeaderNavProps): JSX.Element {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isLoggedIn ? <HeaderLoggedIn /> : <HeaderSignIn />}
      </ul>
    </nav>
  );
}
