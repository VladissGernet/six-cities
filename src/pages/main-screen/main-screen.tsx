import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Tabs from '../../components/tabs/tabs';
import Cities from '../../components/cities/cities';

import { GroupedOffers, GroupedOffersByCity } from '../../types/offers';

type MainScreenProps = {
  groupedOffers: GroupedOffers;
};

// TODO, Заглушка для рендера
const DEFAULT_CITY = 'Paris'; // Дефолтный первый активный город.
// const DEFAULT_CITY_EMPTY = 'Dusseldorf';

export default function MainScreen({
  groupedOffers,
}: MainScreenProps): JSX.Element {
  const groupedOffersByCity: GroupedOffersByCity = {
    city: DEFAULT_CITY,
    cities: groupedOffers.get(DEFAULT_CITY) ?? [],
  };
  const isNoOffers = !groupedOffersByCity.cities.length;

  return (
    <Page isGray isMain>
      <Header isLoggedIn groupedOffers={groupedOffers} />

      <Main isIndex isNoOffers={isNoOffers}>
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <Cities groupedOffersByCity={groupedOffersByCity} />
      </Main>
    </Page>
  );
}
