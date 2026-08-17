import { useAppSelector } from '../../hooks/redux';

import { filterByProperty } from '../../utils/utils';

export default function HeaderLoggedIn(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const totalFavorites = filterByProperty(offers, 'isFavorite', true).length;

  return (
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
}
