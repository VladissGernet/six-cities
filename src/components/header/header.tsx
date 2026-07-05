import { filterByProperty } from '../../utils';
import { Offers } from '../../types/offers';

type HeaderProps = {
  isLoggedIn?: boolean;
  isLoginPage?: boolean;
  offers?: Offers;
};

export default function Header({
  isLoggedIn,
  isLoginPage,
  // TODO, TypeGuard, возможно тут применение.
  offers = [],
}: HeaderProps): JSX.Element {
  const totalFavorites = filterByProperty(offers, 'isFavorite', true).length;

  const loggedInElement = (
    <>
      <li className="header__nav-item user">
        <a className="header__nav-link header__nav-link--profile" href="#">
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">
            Oliver.conner@gmail.com
          </span>
          <span className="header__favorite-count">{totalFavorites}</span>
        </a>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" href="#">
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </>
  );

  const signInElement = (
    <li className="header__nav-item user">
      <a className="header__nav-link header__nav-link--profile" href="#">
        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
        <span className="header__login">Sign in</span>
      </a>
    </li>
  );

  const navElement = (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {/*
          TODO, рассмотреть рефакторинг в будущем с помощью React.memo и useMemo.
          Данная реализация редерит выше сразу ДВЕ разметки для пустого и полного элемента.
        */}
        {isLoggedIn ? loggedInElement : signInElement}
      </ul>
    </nav>
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {/* TODO, на главной странице возможно придется деактивировать. */}
            <a className="header__logo-link header__logo-link--active">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </a>
          </div>
          {isLoginPage ? '' : navElement}
        </div>
      </div>
    </header>
  );
}
