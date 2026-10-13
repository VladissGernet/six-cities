import { Helmet } from 'react-helmet-async';
import Tabs from '../../components/tabs/tabs';
import Cities from '../../components/cities/cities';

export default function MainScreen(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Cities</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <Tabs />
      <Cities />
    </>
  );
}
