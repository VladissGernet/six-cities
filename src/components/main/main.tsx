import { PropsWithChildren } from 'react';
import cn from 'classnames';
import styles from './main.module.css';
import { AppRoute } from '../../const';
import { useLocation } from 'react-router-dom';
import { makeBasePath } from '../../utils/utils';

type MainProps = PropsWithChildren<{
  hasFavorites?: boolean | null;
}>;

const mainClassNames: Record<string, string | undefined> = {
  [AppRoute.Root]: 'page__main--index',
  [AppRoute.Login]: 'page__main--login',
  // [AppRoute.Favorites]: styles['page--favorites-fix'],
  [AppRoute.NotFoundPage]: styles['page__main--not-found-fix'],
  [AppRoute.Offer]: `page__main--offer ${styles['page__main--offer-fix']}`,
};

export default function Main({
  children,
  hasFavorites = null,
}: MainProps): JSX.Element {
  const { pathname } = useLocation();
  const basePath = makeBasePath(pathname);

  // TODO, убрать и зменить проверкой через state.
  const isFavoritesEmpty = hasFavorites !== null && !hasFavorites;

  const mainClassName = cn(
    'page__main',
    isFavoritesEmpty && 'page__main--favorites page__main--favorites-empty',
    mainClassNames[basePath] || mainClassNames[AppRoute.NotFoundPage],

    // Исправление sticky-footer.
    hasFavorites &&
      `page__main--favorites ${styles['page__main--favorites-not-empty-fix']}`,
  );

  // TODO, использовать uselocation для подстановки классов, т.е. создать хук (useEffect или useLayoutEffect) после рендера и только
  // потом добавлять классы , также этот код с эффектом можно вынести в другой компонент -кастомный хук.
  // isNoOffers убрать и другие классы без стилей!
  return <main className={mainClassName}>{children}</main>;
}
