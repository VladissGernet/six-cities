// import Header from '../../components/header/header';
import Page from '../../components/page/page';

import styles from './loading-screen.module.css';

function LoadingScreen(): JSX.Element {
  return (
    <Page>
      {/* TODO, решить проблему добавления header. Описание см. app.tsx. */}
      {/* <Header /> */}
      <span className={styles.loader}></span>
    </Page>
  );
}

export default LoadingScreen;
