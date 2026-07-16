import cn from 'classnames';

type MapProps = {
  rootClassName: string;
};

export default function Map({ rootClassName }: MapProps): JSX.Element {
  return <section className={cn(rootClassName, 'map')} />;
}
