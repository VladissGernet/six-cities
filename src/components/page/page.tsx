import cn from 'classnames';
import styles from './page.module.css';

type PageProps = {
  children?: React.ReactNode;
  isGray?: boolean;
  isMain?: boolean;
  isLogin?: boolean;
  isFavorites?: boolean;
  isNotFound?: boolean;
  isOffer?: boolean;
  hasFavorites?: boolean | null;
};

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
  const isFavoritesEmpty = hasFavorites !== null && !hasFavorites;

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
