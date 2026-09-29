import type { PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export default function Container({
  className,
  children,
}: ContainerProps): JSX.Element {
  return <div className={className ? className : 'container'}>{children}</div>;
}
