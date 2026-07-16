import cn from 'classnames';
import styles from './main.module.css';

type MainProps = {
  children?: React.ReactNode;
  isIndex?: boolean;
  isNoOffers?: boolean;
  hasFavorites?: boolean | null;
  isLoginPage?: boolean;
  isOffer?: boolean;
  isNotFound?: boolean;
};

export default function Main({
  children,
  isIndex,
  isNoOffers,
  isOffer,
  hasFavorites = null,
  isLoginPage,
  isNotFound,
}: MainProps): JSX.Element {
  const isFavoritesEmpty = hasFavorites !== null && !hasFavorites;

  const mainClassName = cn(
    'page__main',
    isIndex && 'page__main--index',
    isFavoritesEmpty && 'page__main--favorites page__main--favorites-empty',
    isNoOffers && 'page__main--index-empty',
    isLoginPage && 'page__main--login',
    isOffer && 'page__main--offer',
    hasFavorites && 'page__main--favorites',

    // Исправление sticky-footer.
    hasFavorites && styles['page__main--favorites-not-empty-fix'],
    isNotFound && styles['page__main--not-found-fix'],
    isOffer && styles['page__main--offer-fix'],
  );
  return <main className={mainClassName}>{children}</main>;
}
