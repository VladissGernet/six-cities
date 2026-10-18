import Places from '../../components/places/places';
import { useAppSelector } from '../../hooks/redux';
import { getCity, getGroupedOffers } from '../../store/offers/offers-selectors';
import Container from '../container/container';
import OffersMap from '../offers-map/offers-map';

type CitiesFilledProps = {
  extraTitle?: string;
};

export default function CitiesFilled({
  extraTitle,
}: CitiesFilledProps): JSX.Element {
  const selectedCity = useAppSelector(getCity);
  const groupedOffersByCity =
    useAppSelector(getGroupedOffers)[selectedCity] || [];

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
        {/* TOOD, переместить сюда проверку на grouped.length */}
        <OffersMap rootClassName="cities__map" offers={groupedOffersByCity} />
      </div>
    </Container>
  );
}
