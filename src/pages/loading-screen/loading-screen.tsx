import Container from '../../components/container/container';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Page from '../../components/page/page';

import styles from './loading-screen.module.css';

// TODO, вынести в layout nonav, либо в header прописать, что на LoadingScreen не надо
// отображать правую часть о пользователе в header, чтобы не прокидывать isHeaderNoNav.
// TODO 2, при отображении загрузки на стринице авторизации, фон пропадает.
function LoadingScreen(): JSX.Element {
  return (
    <Page>
      <Header isHeaderNoNav />

      <Main>
        <Container>
          <p className={styles.loader}></p>
        </Container>
      </Main>
    </Page>
  );
}

export default LoadingScreen;
