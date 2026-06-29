import cn from 'classnames';
import styles from './main.module.css';

type MainProps = {
  children?: React.ReactNode;
  isIndex?: boolean;
  isNoOffers?: boolean;
  hasFavorites?: boolean | null;
};

export default function Main({
  children,
  isIndex,
  isNoOffers,
  hasFavorites = null,
}: MainProps): JSX.Element {
  const isFavoritesEmpty = hasFavorites !== null && !hasFavorites;

  const mainClassName = cn(
    'page__main',
    isIndex && 'page__main--index',
    isFavoritesEmpty && 'page__main--favorites page__main--favorites-empty',
    isNoOffers && 'page__main--index-empty',

    // Исправление sticky-footer.
    hasFavorites && `page__main--favorites ${styles['page__main--favorites']}`,
  );
  return <main className={mainClassName}>{children}</main>;
}
