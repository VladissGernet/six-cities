import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

// Store.
import { logoutAction } from '../../store/api-actions';
import { getOffers } from '../../store/selectors/offers';
import { getUserAccountData } from '../../store/selectors/authentication';

// Other.
import { filterByProperty } from '../../utils/utils';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import type { MouseEventHandler } from 'react';
import styles from './header-logged-in.module.css';

export default function HeaderLoggedIn(): JSX.Element {
  const userData = useAppSelector(getUserAccountData);
  const offers = useAppSelector(getOffers);
  const totalFavorites = filterByProperty(offers, 'isFavorite', true).length;
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const signOutStatus = isSigningOut ? 'Signing out…' : 'Sign out';

  const tryDispatch = async (): Promise<void> => {
    setIsSigningOut(true);

    try {
      await dispatch(logoutAction()).unwrap();
    } catch (error: unknown) {
      toast.error('Failed to sign out. Try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleSignOut: MouseEventHandler = (evt) => {
    evt.preventDefault();

    tryDispatch();
  };

  return (
    <>
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoute.Favorites}
        >
          <div
            className="header__avatar-wrapper user__avatar-wrapper"
            style={{
              backgroundImage: userData?.avatarUrl
                ? `url("${userData.avatarUrl}")`
                : 'none',
            }}
          />
          <span className="header__user-name user__name">
            {userData?.email}
          </span>
          <span className="header__favorite-count">{totalFavorites}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <button
          className={`header__nav-link ${styles['header__nav-link--fix']}`}
          type="button"
          disabled={isSigningOut}
          onClick={handleSignOut}
        >
          <span className="header__signout">{signOutStatus}</span>
        </button>
      </li>
    </>
  );
}
