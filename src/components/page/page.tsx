import { PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './page.module.css';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { makeBasePath } from '../../utils/utils';

type PageProps = PropsWithChildren<{
  isGray?: boolean;
  hasFavorites?: boolean | null;
}>;

const pageClassNames: Record<string, string | undefined> = {
  [AppRoute.Root]: 'page--main',
  [AppRoute.Login]: 'page--login',
  [AppRoute.Favorites]: styles['page--favorites-fix'],
  [AppRoute.NotFoundPage]: styles['page--not-found-fix'],
  [AppRoute.Offer]: styles['page--offer-fix'],
};

export default function Page({
  children,
  isGray,
  hasFavorites = null,
}: PageProps): JSX.Element {
  // TODO, возможно нужно вынести в общий Layout.
  const { pathname } = useLocation();
  const basePath = makeBasePath(pathname);

  // TODO, заменить флаг на проверку из state.
  const isFavoritesEmpty = hasFavorites !== null && !hasFavorites;

  const pageClassName = cn(
    'page',
    isGray && 'page--gray',
    pageClassNames[basePath] || pageClassNames[AppRoute.NotFoundPage],
    isFavoritesEmpty && 'page--favorites-empty',
    // Фикс sticky-footer на странице Favorites.
    styles['page--sticky-footer-fix'],
  );

  return <div className={pageClassName}>{children}</div>;
}
