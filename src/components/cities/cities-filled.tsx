import { GroupedOffersByCity } from '../../types/offers';
import Places from '../../components/places/places';
import Map from '../map/map';

type CitiesFilledProps = {
  extraTitle?: string;
  groupedOffersByCity: GroupedOffersByCity;
};

export default function CitiesFilled({
  extraTitle,
  groupedOffersByCity,
}: CitiesFilledProps): JSX.Element {
  const { cities } = groupedOffersByCity;
  return (
    <div className="cities__places-container container">
      <Places
        rootClassName="cities__places"
        title="Places"
        extraTitle={extraTitle}
        isTitleNotVisible
        groupedOffersByCity={groupedOffersByCity}
        isSortingForm
      />
      <div className="cities__right-section">
        <Map rootClassName="cities__map" groupedPlaces={cities} />
      </div>
    </div>
  );
}
