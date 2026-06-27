import cn from 'classnames';

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
        'page__main--favorites': isFavorites,
      })}
    >
      {children}
    </main>
  );
}
