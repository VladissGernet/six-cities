import { PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './page.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { isNotFoundParams, makeBasePath } from '../../utils/utils';
import { useAppSelector } from '../../hooks/redux';
import { getGroupedFavoriteOffers } from '../../store/offers/offers-selectors';

const pageClassNames: Record<string, string | undefined> = {
  [AppRoute.Root]: 'page--main page--gray',
  [AppRoute.Login]: 'page--login page--gray',
  [AppRoute.Favorites]: styles['page--favorites-fix'],
  [AppRoute.NotFoundPage]: styles['page--not-found-fix'],
  [AppRoute.Offer]: styles['page--offer-fix'],
};

export default function Page({ children }: PropsWithChildren): JSX.Element {
  const { pathname } = useLocation();
  const params = useParams();

  const isNotFound = isNotFoundParams(params);
  const basePath = makeBasePath(pathname);

  const favoriteOffersByCity = useAppSelector(getGroupedFavoriteOffers);

  const isFavoritesPage = (AppRoute.Favorites as string) === basePath;
  const hasFavorites = favoriteOffersByCity.length > 0;
  const isFavoritesEmpty = hasFavorites !== null && !hasFavorites;

  if (isNotFound) {
    return (
      <div
        className={cn(
          'page',
          pageClassNames[AppRoute.NotFoundPage],
          // Фикс sticky-footer на странице Favorites.
          styles['page--sticky-footer-fix'],
        )}
      >
        {children}
      </div>
    );
  }

  const pageClassName = cn(
    'page',
    pageClassNames[basePath],
    isFavoritesPage && isFavoritesEmpty && 'page--favorites-empty',
    // Фикс sticky-footer на странице Favorites.
    styles['page--sticky-footer-fix'],
  );

  return <div className={pageClassName}>{children}</div>;
}
