import CitiesFilled from './cities-filled';
import CitiesEmpty from './cities-empty';
import { useAppSelector } from '../../hooks/redux';
import { getCity, getGroupedOffers } from '../../store/offers/offers-selectors';

export default function Cities(): JSX.Element {
  const currentCity = useAppSelector(getCity);
  const groupedOffers = useAppSelector(getGroupedOffers);
  const groupedOffersByCity = groupedOffers[currentCity];
  // TODO, обработать получение ошибки загрузки офферов.

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
