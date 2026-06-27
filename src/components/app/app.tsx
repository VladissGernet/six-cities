import { Offers } from '../../types/offers';
// import MainScreen from '../../pages/main-screen/main-screen';
import Favorites from '../../pages/favorites/favorites';

type AppProps = {
  offers: Offers;
};

export default function App({ offers }: AppProps): JSX.Element {
  // todo, продолжить создание других страниц.
  // return <MainScreen offers={offers} />;
  return <Favorites offers={offers} />;
}
