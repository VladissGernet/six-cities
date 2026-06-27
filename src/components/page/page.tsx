import cn from 'classnames';
import styles from './page.module.css';

type PageProps = {
  children?: React.ReactNode;
  isGray?: boolean;
  isMain?: boolean;
  isFavorites?: boolean;
};

export default function Page({
  children,
  isGray,
  isMain,
  isFavorites,
}: PageProps): JSX.Element {
  const pageClassName = cn('page', {
    'page--gray': isGray,
    'page--main': isMain,
    // Фикс sticky-footer на странице Favorites.
    [styles['page--favorites']]: isFavorites,
  });

  return <div className={pageClassName}>{children}</div>;
}
