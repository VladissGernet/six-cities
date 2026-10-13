import { Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import Main from '../components/main/main';
import Page from '../components/page/page';
import Footer from '../components/footer/footer';

export default function PageWithFooterLayout() {
  return (
    <Page>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Page>
  );
}
