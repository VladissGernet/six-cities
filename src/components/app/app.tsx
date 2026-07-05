import { Offers } from '../../types/offers';

import MainScreen from '../../pages/main-screen/main-screen';
import Favorites from '../../pages/favorites/favorites';
// import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';

import { groupOffers } from './app.helper';

type AppProps = {
  offers: Offers;
};

export default function App({ offers }: AppProps): JSX.Element {
  const groupedOffers = groupOffers(offers);
  return <MainScreen groupedOffers={groupedOffers} offers={offers} />;
  // return <Favorites groupedOffers={groupedOffers} />;
  // return <Login />;
  return <Offer />;
}
