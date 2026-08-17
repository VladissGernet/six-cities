import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

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
          <Link to={AppRoute.Root}>Return to main page</Link>
        </div>
      </Main>
      <Footer />
    </Page>
  );
}
