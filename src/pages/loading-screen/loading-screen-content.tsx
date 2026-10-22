import Container from '../../components/container/container';

import styles from './loading-screen.module.css';

function LoadingScreenContent(): JSX.Element {
  return (
    <Container>
      <p className={styles.loader}>Loading</p>
    </Container>
  );
}

export default LoadingScreenContent;
