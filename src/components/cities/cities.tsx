import CitiesFilled from './cities-filled';
import CitiesEmpty from './cities-empty';
import { GroupedOffersByCity } from '../../types/offers';

type CitiesProps = {
  groupedOffersByCity: GroupedOffersByCity;
};

export default function Cities({
  groupedOffersByCity,
}: CitiesProps): JSX.Element {
  const isNoCities = !groupedOffersByCity.cities.length;
  const { city, cities } = groupedOffersByCity;
  const isMultipleCities = cities.length > 1;
  const extraTitle = `${cities.length} ${isMultipleCities ? 'places' : 'place'} to stay in ${city}`;

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
