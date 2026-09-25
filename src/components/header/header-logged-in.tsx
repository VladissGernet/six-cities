import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { filterByProperty } from '../../utils/utils';
import { AppRoute } from '../../const';
import { logoutAction } from '../../store/api-actions';

export default function HeaderLoggedIn(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const totalFavorites = filterByProperty(offers, 'isFavorite', true).length;
  const dispatch = useAppDispatch();

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
        <Link
          className="header__nav-link"
          onClick={(evt) => {
            // TODO, доработать header и проверить разлогинивание.
            evt.preventDefault();
            dispatch(logoutAction());
          }}
          to={AppRoute.Root}
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}
