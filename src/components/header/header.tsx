import Container from '../container/container';
import HeaderLogo from './header-logo';
import HeaderNav from './header-nav';

type HeaderProps = {
  isLoggedIn?: boolean;
  isHeaderNoNav?: boolean;
};

export default function Header({
  isLoggedIn,
  isHeaderNoNav,
}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <Container>
        <div className="header__wrapper">
          <HeaderLogo />

          {isHeaderNoNav ? '' : <HeaderNav isLoggedIn={isLoggedIn} />}
        </div>
      </Container>
    </header>
  );
}
