import { GroupedOffersByCity, Location } from '../../types/offers';
import Places from '../../components/places/places';
import Map from '../map/map';
import { useState } from 'react';

type CitiesFilledProps = {
  extraTitle?: string;
  groupedOffersByCity: GroupedOffersByCity;
};

export default function CitiesFilled({
  extraTitle,
  groupedOffersByCity,
}: CitiesFilledProps): JSX.Element {
  const [selectedOfferLocation, setSelectedOfferLocation] =
    useState<Location | null>(null);

  const { offerPlacesByCity } = groupedOffersByCity;
  // TODO, остановился здесь.
  // Решение рабочее, но карта заново рендериться. Надо как-то без нового рендера обновлять слой маркеров.

  return (
    <div className="cities__places-container container">
      <Places
        rootClassName="cities__places"
        title="Places"
        extraTitle={extraTitle}
        isTitleNotVisible
        groupedOffersByCity={groupedOffersByCity}
        setLocation={setSelectedOfferLocation}
        isSortingForm
      />
      <div className="cities__right-section">
        <Map
          rootClassName="cities__map"
          groupedPlaces={offerPlacesByCity}
          selectedOfferLocation={selectedOfferLocation}
        />
      </div>
    </div>
  );
}
