import { useAppSelector } from '../../hooks/redux';

// Components.
import CitiesFilled from './cities-filled';
import CitiesEmpty from './cities-empty';

// Selectors.
import { getGroupedOffers } from '../../store/selectors/offers';
import { getCity } from '../../store/selectors/general';

export default function Cities(): JSX.Element {
  const currentCity = useAppSelector(getCity);
  const groupedOffers = useAppSelector(getGroupedOffers);
  const groupedOffersByCity = groupedOffers[currentCity];

  const isNoCities = !groupedOffersByCity?.length;
  const isMultipleCities =
    groupedOffersByCity && groupedOffersByCity.length > 1;
  const extraTitle = `${groupedOffersByCity?.length} ${isMultipleCities ? 'places' : 'place'} to stay in ${currentCity}`;

  return (
    <div className="cities">
      {isNoCities ? <CitiesEmpty /> : <CitiesFilled extraTitle={extraTitle} />}
    </div>
  );
}
