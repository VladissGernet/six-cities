import { PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './main.module.css';

type MainProps = PropsWithChildren<{
  isIndex?: boolean;
  hasFavorites?: boolean | null;
  isLoginPage?: boolean;
  isOffer?: boolean;
  isNotFound?: boolean;
}>;

export default function Main({
  children,
  isIndex,
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
    isLoginPage && 'page__main--login',
    isOffer && 'page__main--offer',
    hasFavorites && 'page__main--favorites',

    // Исправление sticky-footer.
    hasFavorites && styles['page__main--favorites-not-empty-fix'],
    isNotFound && styles['page__main--not-found-fix'],
    isOffer && styles['page__main--offer-fix'],
  );

  // TODO, использовать uselocation для подстановки классов, т.е. создать хук (useEffect или useLayoutEffect) после рендера и только
  // потом добавлять классы , также этот код с эффектом можно вынести в другой компонент -кастомный хук.
  // isNoOffers убрать и другие классы без стилей!
  return <main className={mainClassName}>{children}</main>;
}
