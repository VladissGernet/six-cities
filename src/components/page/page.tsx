import cn from 'classnames';
import styles from './page.module.css';

type PageProps = {
  children?: React.ReactNode;
  isGray?: boolean;
  isMain?: boolean;
  hasFavorites?: boolean;
};

export default function Page({
  children,
  isGray,
  isMain,
  hasFavorites,
}: PageProps): JSX.Element {
  const pageClassName = cn('page', {
    'page--gray': isGray,
    'page--main': isMain,
    // Фикс sticky-footer на странице Favorites.
    [styles['page--favorites']]: hasFavorites,
    'page--favorites-empty': !hasFavorites,
  });

  return <div className={pageClassName}>{children}</div>;
}
