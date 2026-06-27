type PageProps = {
  children?: React.ReactNode;
};

export default function Page({ children }: PageProps): JSX.Element {
  return <div className="page page--gray page--main">{children}</div>;
}
