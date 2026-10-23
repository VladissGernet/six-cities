type LogoContentProps = {
  className: string;
  logoSize: {
    WIDTH: number;
    HEIGHT: number;
  };
};

export default function LogoContent({
  className,
  logoSize,
}: LogoContentProps): JSX.Element {
  return (
    <img
      className={className}
      src="img/logo.svg"
      alt="6 cities logo"
      width={logoSize.WIDTH}
      height={logoSize.HEIGHT}
    />
  );
}
