import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Page from '../../components/page/page';
import LoadingScreenContent from './loading-screen-content';

function LoadingScreen(): JSX.Element {
  return (
    <Page>
      <Header isHeaderNoNav />

      <Main>
        <LoadingScreenContent />
      </Main>
    </Page>
  );
}

export default LoadingScreen;
