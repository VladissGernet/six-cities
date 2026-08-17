import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Tabs from '../../components/tabs/tabs';
import Cities from '../../components/cities/cities';

import { GroupedOffers } from '../../types/offers';

import { createGroupedOffersByCity } from '../../utils/offers';
import { INITIAL_STATE_CITY } from '../../const';
import { useAppSelector } from '../../hooks/redux';

type MainScreenProps = {
  groupedOffers: GroupedOffers;
};

export default function MainScreen({
  groupedOffers,
}: MainScreenProps): JSX.Element {
  // TODO, решение можно оформить еще более “по-реактовски”: через useMemo, чтобы groupedOffersByCity не пересоздавался на каждом рендере.
  const offers = useAppSelector((state) => state.offers);

  const groupedOffersByCity = createGroupedOffersByCity(
    INITIAL_STATE_CITY,
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
