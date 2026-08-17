import HeaderLogo from './header-logo';
import HeaderNav from './header-nav';

type HeaderProps = {
  isLoggedIn?: boolean;
  isLoginPage?: boolean;
};

export default function Header({
  isLoggedIn,
  isLoginPage,
}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo />

          {isLoginPage ? '' : <HeaderNav isLoggedIn={isLoggedIn} />}
        </div>
      </div>
    </header>
  );
}
