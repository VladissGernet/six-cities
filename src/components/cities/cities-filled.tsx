import Places from '../../components/places/places';
import { useAppSelector } from '../../hooks/redux';
import OffersMap from '../offers-map/offers-map';

type CitiesFilledProps = {
  extraTitle?: string;
};

export default function CitiesFilled({
  extraTitle,
}: CitiesFilledProps): JSX.Element {
  const selectedCity = useAppSelector((state) => state.city);
  const groupedOffersByCity =
    useAppSelector((state) => state.groupedOffers)[selectedCity] || [];

  // TODO, остановился здесь.
  // порпобовать заменить useState либо useRef, но сокрее всего не бдут обновления
  // меток на карте, либо через store, что более вероятнее будет правильно.

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
        {/* TOOD, переместить сюда проверку на grouped.length */}
        <OffersMap
          rootClassName="cities__map"
          groupedPlaces={groupedOffersByCity}
        />
      </div>
    </div>
  );
}
