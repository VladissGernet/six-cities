import { Helmet } from 'react-helmet-async';

// Components.
import Tabs from '../../components/tabs/tabs';
import Cities from '../../components/cities/cities';
import Container from '../../components/container/container';

// Selectors.
import { useAppSelector } from '../../hooks/redux';
import { getOffersErrorMessage } from '../../store/offers/offers.selectors';

export default function MainScreen(): JSX.Element {
  const errorMessage = useAppSelector(getOffersErrorMessage);

  if (errorMessage) {
    return (
      <Container>
        <h1>{errorMessage}</h1>
      </Container>
    );
  }

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
