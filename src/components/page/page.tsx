import cn from 'classnames';
import styles from './page.module.css';

type PageProps = {
  children?: React.ReactNode;
  isGray?: boolean;
  isMain?: boolean;
  isLogin?: boolean;
  hasFavorites?: boolean | null;
};

export default function Page({
  children,
  isGray,
  isMain,
  isLogin,
  hasFavorites = null,
}: PageProps): JSX.Element {
  const isFavoritesEmpty = hasFavorites !== null && !hasFavorites;

  const pageClassName = cn(
    'page',
    styles['page--fix'],
    isGray && 'page--gray',
    isMain && 'page--main',
    isLogin && 'page--login',
    isFavoritesEmpty && 'page--favorites-empty',

    // Фикс sticky-footer на странице Favorites.
    hasFavorites && styles['page--favorites'],
  );

  return <div className={pageClassName}>{children}</div>;
}
