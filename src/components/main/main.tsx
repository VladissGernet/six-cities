import { PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './main.module.css';
import { AppRoute } from '../../const';
import { useLocation } from 'react-router-dom';
import { makeBasePath } from '../../utils/utils';

type MainProps = PropsWithChildren<{
  isIndex?: boolean;
  hasFavorites?: boolean | null;
  isLoginPage?: boolean;
  isNotFound?: boolean;
}>;

const mainClassNames: Record<string, string | undefined> = {
  [AppRoute.Root]: 'page--main',
  [AppRoute.Login]: 'page--login',
  [AppRoute.Favorites]: styles['page--favorites-fix'],
  [AppRoute.NotFoundPage]: styles['page--not-found-fix'],
  [AppRoute.Offer]: `page__main--offer ${styles['page__main--offer-fix']}`,
};

export default function Main({
  children,
  isIndex,
  hasFavorites = null,
  isLoginPage,
  isNotFound,
}: MainProps): JSX.Element {
  const { pathname } = useLocation();
  const basePath = makeBasePath(pathname);

  // TODO, убрать и зменить проверкой через state.
  const isFavoritesEmpty = hasFavorites !== null && !hasFavorites;

  const mainClassName = cn(
    'page__main',
    isIndex && 'page__main--index',
    isFavoritesEmpty && 'page__main--favorites page__main--favorites-empty',
    isLoginPage && 'page__main--login',
    hasFavorites && 'page__main--favorites',

    // Исправление sticky-footer.
    hasFavorites && styles['page__main--favorites-not-empty-fix'],
    isNotFound && styles['page__main--not-found-fix'],
    mainClassNames[basePath],
  );

  // TODO, использовать uselocation для подстановки классов, т.е. создать хук (useEffect или useLayoutEffect) после рендера и только
  // потом добавлять классы , также этот код с эффектом можно вынести в другой компонент -кастомный хук.
  // isNoOffers убрать и другие классы без стилей!
  return <main className={mainClassName}>{children}</main>;
}
