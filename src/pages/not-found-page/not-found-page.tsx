import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Footer from '../../components/footer/footer';

export default function NotFoundPage(): JSX.Element {
  return (
    <Page>
      <Header />

      <Main>
        <div className="container">
          <h1>404 Not Found</h1>
          <p>This page doesn’t exist.</p>
          {/* TODO, исправить на <Link> из реакт роутера */}
          <a>Return to main page</a>
        </div>
      </Main>
      <Footer />
    </Page>
  );
}
