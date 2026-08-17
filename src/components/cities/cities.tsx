import CitiesFilled from './cities-filled';
import CitiesEmpty from './cities-empty';
import { GroupedOffersByCity } from '../../types/offers';

type CitiesProps = {
  groupedOffersByCity: GroupedOffersByCity;
};

export default function Cities({
  groupedOffersByCity,
}: CitiesProps): JSX.Element {
  const isNoCities = !groupedOffersByCity.offerPlacesByCity.length;
  const { city, offerPlacesByCity } = groupedOffersByCity;
  const isMultipleCities = offerPlacesByCity.length > 1;
  const extraTitle = `${offerPlacesByCity.length} ${isMultipleCities ? 'places' : 'place'} to stay in ${city}`;

  return (
    <div className="cities">
      {isNoCities ? (
        <CitiesEmpty />
      ) : (
        <CitiesFilled
          extraTitle={extraTitle}
          groupedOffersByCity={groupedOffersByCity}
        />
      )}
    </div>
  );
}
