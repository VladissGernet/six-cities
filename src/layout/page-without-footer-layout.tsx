import { Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import Main from '../components/main/main';
import Page from '../components/page/page';

export default function PageWithoutFooterLayout() {
  return (
    <Page>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Page>
  );
}
