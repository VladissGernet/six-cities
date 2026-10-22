import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

import Container from '../../components/container/container';

import cn from 'classnames';
import styles from './not-found-page.module.css';

export default function NotFoundPage(): JSX.Element {
  return (
    <Container className={cn('container', styles['container'])}>
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <h1>404 Not Found</h1>
      <p>This page doesn’t exist.</p>
      <Link to={AppRoute.Root}>Return to main page</Link>
    </Container>
  );
}
