import { Offers } from '../../types/offers';
import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Tabs from '../../components/tabs/tabs';
import Cities from '../../components/cities/cities';

type MainScreenProps = {
  offers: Offers;
};

export default function MainScreen({ offers }: MainScreenProps): JSX.Element {
  return (
    <Page isGray isMain>
      <Header />

      <Main isIndex>
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <Cities offers={offers} />
      </Main>
    </Page>
  );
}
