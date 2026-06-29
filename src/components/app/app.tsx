import { Offers, GroupedOffers } from '../../types/offers';
import MainScreen from '../../pages/main-screen/main-screen';
// import Favorites from '../../pages/favorites/favorites';

type AppProps = {
  offers: Offers;
};

function groupOffers(offers: Offers): GroupedOffers {
  return offers.reduce<GroupedOffers>((favoriteOffersByCity, offer) => {
    const isIncluded = favoriteOffersByCity.get(offer.city.name);

    if (isIncluded) {
      isIncluded.push(offer);
    } else {
      favoriteOffersByCity.set(offer.city.name, [offer]);
    }
    return favoriteOffersByCity;
  }, new Map());
}

export default function App({ offers }: AppProps): JSX.Element {
  // TODO, остановился на:
  // 1. Рендер login
  // 2. рендер Offer
  return <MainScreen groupedOffers={groupOffers(offers)} />;
  // return <Favorites groupedOffers={groupOffers(offers)} />;
}
