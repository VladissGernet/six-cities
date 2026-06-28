import cn from 'classnames';
import styles from './main.module.css';

type MainProps = {
  children?: React.ReactNode;
  isIndex?: boolean;
  hasFavorites?: boolean;
};

export default function Main({
  children,
  isIndex,
  hasFavorites,
}: MainProps): JSX.Element {
  return (
    <main
      className={cn('page__main', {
        'page__main--index': isIndex,
        // Исправление sticky-footer.
        [`page__main--favorites ${styles['page__main--favorites']}`]:
          hasFavorites,
        'page__main--favorites page__main--favorites-empty': !hasFavorites,
      })}
    >
      {children}
    </main>
  );
}
