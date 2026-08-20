import CitiesFilled from './cities-filled';
import CitiesEmpty from './cities-empty';
import { useAppSelector } from '../../hooks/redux';

export default function Cities(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const groupedOffers = useAppSelector((state) => state.groupedOffers);
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
