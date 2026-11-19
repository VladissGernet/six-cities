import Container from '../../components/container/container';

import styles from './loading-screen.module.css';

export default function LoadingScreenContent(): JSX.Element {
  return (
    <Container>
      <p className={styles.loader}>Loading</p>
    </Container>
  );
}
