import { Offers } from '../../types/offers';

import HeaderLogo from './header-logo';
import HeaderNav from './header-nav';

type HeaderProps = {
  isLoggedIn?: boolean;
  isLoginPage?: boolean;
  isMainScreen?: boolean;
  offers?: Offers;
};

export default function Header({
  isLoggedIn,
  isLoginPage,
  isMainScreen,
  offers = [],
}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo isMainScreen={isMainScreen} />

          {isLoginPage ? (
            ''
          ) : (
            <HeaderNav offers={offers} isLoggedIn={isLoggedIn} />
          )}
        </div>
      </div>
    </header>
  );
}
