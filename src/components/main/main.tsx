import cn from 'classnames';

import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';

import { makeBasePath } from '../../utils/utils';
import { AppRoute } from '../../const';
import { getGroupedFavoirteOffers } from '../../store/offers/offers-selectors';
import { useAppSelector } from '../../hooks/redux';

import styles from './main.module.css';

const mainClassNames: Record<string, string | undefined> = {
  [AppRoute.Root]: 'page__main--index',
  [AppRoute.Login]: 'page__main--login',
  [AppRoute.Favorites]: 'page__main--favorites',
  [AppRoute.NotFoundPage]: styles['page__main--not-found-fix'],
  [AppRoute.Offer]: `page__main--offer ${styles['page__main--offer-fix']}`,
};
export default function Main({ children }: PropsWithChildren): JSX.Element {
  const { pathname } = useLocation();
  const basePath = makeBasePath(pathname);

  const favoriteOffersByCity = useAppSelector(getGroupedFavoirteOffers);
  const hasFavorites = favoriteOffersByCity.length > 0;
  const isFavoritesEmpty = hasFavorites !== null && !hasFavorites;

  const mainClassName = cn(
    'page__main',
    mainClassNames[basePath] || mainClassNames[AppRoute.NotFoundPage],
    isFavoritesEmpty && 'page__main--favorites-empty',

    // Исправление sticky-footer.
    hasFavorites &&
      `page__main--favorites ${styles['page__main--favorites-not-empty-fix']}`,
  );

  return <main className={mainClassName}>{children}</main>;
}
