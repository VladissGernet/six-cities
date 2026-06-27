import cn from 'classnames';
import styles from './main.module.css';

type MainProps = {
  children?: React.ReactNode;
  isIndex?: boolean;
  isFavorites?: boolean;
};

export default function Main({
  children,
  isIndex,
  isFavorites,
}: MainProps): JSX.Element {
  return (
    <main
      className={cn('page__main', {
        'page__main--index': isIndex,
        // Исправление sticky-footer.
        [`page__main--favorites ${styles['page__main--favorites']}`]:
          isFavorites,
      })}
    >
      {children}
    </main>
  );
}
