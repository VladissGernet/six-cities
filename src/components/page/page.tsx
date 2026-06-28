import cn from 'classnames';
import styles from './page.module.css';

type PageProps = {
  children?: React.ReactNode;
  isGray?: boolean;
  isMain?: boolean;
  hasFavorites?: boolean | null;
};

export default function Page({
  children,
  isGray,
  isMain,
  hasFavorites = null,
}: PageProps): JSX.Element {
  const isFavoritesEmpty = hasFavorites !== null && !hasFavorites;

  const pageClassName = cn(
    'page',
    isGray && 'page--gray',
    isMain && 'page--main',
    isFavoritesEmpty && 'page--favorites-empty',

    // Фикс sticky-footer на странице Favorites.
    hasFavorites && styles['page--favorites'],
  );

  return <div className={pageClassName}>{children}</div>;
}
