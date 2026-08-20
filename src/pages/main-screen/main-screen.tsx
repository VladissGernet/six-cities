import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Tabs from '../../components/tabs/tabs';
import Cities from '../../components/cities/cities';

export default function MainScreen(): JSX.Element {
  // TODO, main не должен знать о данных.
  return (
    <Page isGray isMain>
      <Header isLoggedIn />

      <Main isIndex>
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <Cities />
      </Main>
    </Page>
  );
}
