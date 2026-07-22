import { Offers } from '../../types/offers';
import { filterByProperty } from '../../utils/utils';

type HeaderNavProps = {
  offers?: Offers;
  isLoggedIn?: boolean;
};

export default function HeaderNav({
  offers = [],
  isLoggedIn,
}: HeaderNavProps): JSX.Element {
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
  return (
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
}
