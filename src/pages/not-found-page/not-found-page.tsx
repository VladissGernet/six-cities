import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Footer from '../../components/footer/footer';

import cn from 'classnames';
import styles from './not-found-page.module.css';

export default function NotFoundPage(): JSX.Element {
  return (
    <Page isNotFound>
      <Header />

      <Main isNotFound>
        <div className={cn('container', styles['container'])}>
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
