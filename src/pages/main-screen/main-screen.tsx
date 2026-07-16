import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Tabs from '../../components/tabs/tabs';
import Cities from '../../components/cities/cities';

import { GroupedOffers, Offers } from '../../types/offers';

import { createGroupedOffersByCity } from '../../utils';

type MainScreenProps = {
  groupedOffers: GroupedOffers;
  offers: Offers;
};

// TODO, Заглушка для рендера
const DEFAULT_CITY = 'Paris'; // Дефолтный первый активный город.
// const DEFAULT_CITY_EMPTY = 'Dusseldorf';

export default function MainScreen({
  groupedOffers,
  offers,
}: MainScreenProps): JSX.Element {
  // TODO, решение можно оформить еще более “по-реактовски”: через useMemo, чтобы groupedOffersByCity не пересоздавался на каждом рендере.
  const groupedOffersByCity = createGroupedOffersByCity(
    DEFAULT_CITY,
    groupedOffers,
  );
  const isNoOffers = !groupedOffersByCity.cities.length;

  return (
    <Page isGray isMain>
      <Header isLoggedIn offers={offers} isMainScreen />

      <Main isIndex isNoOffers={isNoOffers}>
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <Cities groupedOffersByCity={groupedOffersByCity} />
      </Main>
    </Page>
  );
}
