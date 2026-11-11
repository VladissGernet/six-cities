import { useAppSelector } from '../../hooks/redux';

// Components.
import Places from '../../components/places/places';
import Container from '../container/container';
import OffersMap from '../offers-map/offers-map';

// Selectors.
import { getCity, getGroupedOffers } from '../../store/offers/offers.selectors';

type CitiesFilledProps = {
  extraTitle?: string;
};

export default function CitiesFilled({
  extraTitle,
}: CitiesFilledProps): JSX.Element | null {
  const selectedCity = useAppSelector(getCity);
  const groupedOffersByCity = useAppSelector(getGroupedOffers)[selectedCity];

  if (!groupedOffersByCity) {
    return null;
  }

  return (
    <Container className="cities__places-container container">
      <Places
        rootClassName="cities__places"
        title="Places"
        extraTitle={extraTitle}
        isTitleNotVisible
        groupedOffersByCity={groupedOffersByCity}
        isSortingForm
      />
      <div className="cities__right-section">
        <OffersMap rootClassName="cities__map" offers={groupedOffersByCity} />
      </div>
    </Container>
  );
}
