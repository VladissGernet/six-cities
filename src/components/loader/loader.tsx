import styles from './loader.module.css';

type LoaderProps = {
  text?: string;
};

export default function Loader({ text }: LoaderProps): JSX.Element {
  return <p className={styles['loader']}>{text ? text : 'Loading'}</p>;
}
