import Container from '../../components/container/container';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Page from '../../components/page/page';

import styles from './loading-screen.module.css';

function LoadingScreen(): JSX.Element {
  return (
    <Page isGray isMain>
      <Header isHeaderNoNav />

      <Main isIndex>
        <Container>
          <span className={styles.loader}></span>
        </Container>
      </Main>
    </Page>
  );
}

export default LoadingScreen;
