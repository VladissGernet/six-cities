import { PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './page.module.css';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { makeBasePath } from '../../utils/utils';
import { useAppSelector } from '../../hooks/redux';

const pageClassNames: Record<string, string | undefined> = {
  [AppRoute.Root]: 'page--main page--gray',
  [AppRoute.Login]: 'page--login page--gray',
  [AppRoute.Favorites]: styles['page--favorites-fix'],
  [AppRoute.NotFoundPage]: styles['page--not-found-fix'],
  [AppRoute.Offer]: styles['page--offer-fix'],
};

export default function Page({ children }: PropsWithChildren): JSX.Element {
  // TODO, возможно нужно вынести в общий Layout.
  const { pathname } = useLocation();
  const basePath = makeBasePath(pathname);

  const favoriteOffersByCity = useAppSelector(
    (state) => state.groupedFavoirteOffers,
  );
  const hasFavorites = favoriteOffersByCity.length > 0;
  const isFavoritesEmpty = hasFavorites !== null && !hasFavorites;

  const pageClassName = cn(
    'page',
    pageClassNames[basePath] || pageClassNames[AppRoute.NotFoundPage],
    isFavoritesEmpty && 'page--favorites-empty',
    // Фикс sticky-footer на странице Favorites.
    styles['page--sticky-footer-fix'],
  );

  return <div className={pageClassName}>{children}</div>;
}
