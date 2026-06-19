import { Offers } from '../../types/offers';
import MainScreen from '../../pages/main-screen/main-screen';

type AppProps = {
  offers: Offers;
};

export default function App({ offers }: AppProps): JSX.Element {
  return <MainScreen offers={offers} />;
}
