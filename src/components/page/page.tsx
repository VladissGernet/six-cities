import cn from 'classnames';

type PageProps = {
  children?: React.ReactNode;
  isGray?: boolean;
  isMain?: boolean;
};

export default function Page({
  children,
  isGray,
  isMain,
}: PageProps): JSX.Element {
  const pageClassName = cn('page', {
    'page--gray': isGray,
    'page--main': isMain,
  });
  return <div className={pageClassName}>{children}</div>;
}
