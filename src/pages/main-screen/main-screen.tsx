import { useAppSelector } from '../../hooks/redux';

import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Tabs from '../../components/tabs/tabs';
import Cities from '../../components/cities/cities';

import { createGroupedOffersByCity } from '../../utils/offers';

export default function MainScreen(): JSX.Element {
  const groupedOffers = useAppSelector((state) => state.groupedOffers);
  const selectedCity = useAppSelector((state) => state.city);

  // TODO, решение можно оформить еще более “по-реактовски”: через useMemo, чтобы groupedOffersByCity не пересоздавался на каждом рендере.
  const groupedOffersByCity = createGroupedOffersByCity(
    selectedCity,
    groupedOffers,
  );
  const isNoOffers = !groupedOffersByCity.cities.length;

  return (
    <Page isGray isMain>
      <Header isLoggedIn isMainScreen />

      <Main isIndex isNoOffers={isNoOffers}>
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <Cities groupedOffersByCity={groupedOffersByCity} />
      </Main>
    </Page>
  );
}
