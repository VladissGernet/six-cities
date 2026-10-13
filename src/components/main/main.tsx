import cn from 'classnames';

import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';

import { makeBasePath } from '../../utils/utils';

import { AppRoute } from '../../const';

import { useAppSelector } from '../../hooks/redux';

import styles from './main.module.css';

const mainClassNames: Record<string, string | undefined> = {
  [AppRoute.Root]: 'page__main--index',
  [AppRoute.Login]: 'page__main--login',
  [AppRoute.NotFoundPage]: styles['page__main--not-found-fix'],
  [AppRoute.Offer]: `page__main--offer ${styles['page__main--offer-fix']}`,
};
export default function Main({ children }: PropsWithChildren): JSX.Element {
  const { pathname } = useLocation();
  const basePath = makeBasePath(pathname);

  const favoriteOffersByCity = useAppSelector(
    (state) => state.groupedFavoirteOffers,
  );
  const hasFavorites = favoriteOffersByCity.length > 0;
  const isFavoritesEmpty = hasFavorites !== null && !hasFavorites;

  const mainClassName = cn(
    'page__main',
    isFavoritesEmpty && 'page__main--favorites page__main--favorites-empty',
    // TODO, условие или не совсем подходит
    mainClassNames[basePath] || mainClassNames[AppRoute.NotFoundPage],

    // Исправление sticky-footer.
    hasFavorites &&
      `page__main--favorites ${styles['page__main--favorites-not-empty-fix']}`,
  );

  return <main className={mainClassName}>{children}</main>;
}
