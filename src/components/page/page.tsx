import { PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './page.module.css';

type PageProps = PropsWithChildren<{
  isGray?: boolean;
  isMain?: boolean;
  isLogin?: boolean;
  isFavorites?: boolean;
  isNotFound?: boolean;
  isOffer?: boolean;
  hasFavorites?: boolean | null;
}>;

export default function Page({
  children,
  isGray,
  isMain,
  isLogin,
  isFavorites,
  isNotFound,
  isOffer,
  hasFavorites = null,
}: PageProps): JSX.Element {
  // TODO, возможно нужно вынести в общий Layout.
  const isFavoritesEmpty = hasFavorites !== null && !hasFavorites;

  // TODO, заменить isMain, isLogin и прочее на это.
  // const locationPathname = useLocation().pathname;

  const pageClassName = cn(
    'page',
    isGray && 'page--gray',
    isMain && 'page--main',
    isLogin && 'page--login',
    isFavoritesEmpty && 'page--favorites-empty',

    // Фикс sticky-footer на странице Favorites.
    styles['page--sticky-footer-fix'],
    isFavorites && styles['page--favorites-fix'],
    isNotFound && styles['page--not-found-fix'],
    isOffer && styles['page--offer-fix'],
  );

  return <div className={pageClassName}>{children}</div>;
}
