import HeaderLogo from './header-logo';
import HeaderNav from './header-nav';

type HeaderProps = {
  isLoggedIn?: boolean;
  isLoginPage?: boolean;
  isMainScreen?: boolean;
};

export default function Header({
  isLoggedIn,
  isLoginPage,
  isMainScreen,
}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo isMainScreen={isMainScreen} />

          {isLoginPage ? '' : <HeaderNav isLoggedIn={isLoggedIn} />}
        </div>
      </div>
    </header>
  );
}
