import { useState } from 'react';
import cn from 'classnames';

import { GroupedOffersByCity } from '../../types/offers';
import PlacesList from './places-list';
import PlacesSorting from './places-sorting';
import { ImageSize, PlacesSortingValue } from '../../const';
import { PlacesSortingValueType } from '../../types/general';
import { sortOffers } from './places.helper';

type PlacesProps = {
  rootClassName?: string;
  title: string;
  titleClassName?: string;
  isTitleNotVisible?: boolean;
  extraTitle?: string;
  isSortingForm?: boolean;
  groupedOffersByCity: GroupedOffersByCity;
};

export default function Places({
  rootClassName,
  title,
  titleClassName,
  isTitleNotVisible,
  extraTitle,
  isSortingForm,
  groupedOffersByCity,
}: PlacesProps): JSX.Element {
  const { offerPlacesByCity } = groupedOffersByCity;
  const [activeOption, setActiveOption] = useState<PlacesSortingValueType>(
    PlacesSortingValue.Popular,
  );

  return (
    <section className={cn(rootClassName, 'places')}>
      <h2
        className={cn(isTitleNotVisible ? 'visually-hidden' : titleClassName)}
      >
        {title}
      </h2>
      {extraTitle && <b className="places__found">{extraTitle}</b>}
      {isSortingForm && (
        <PlacesSorting
          activeOption={activeOption}
          setActiveOption={setActiveOption}
        />
      )}
      <PlacesList
        groupedOffersByCity={
          activeOption === PlacesSortingValue.Popular
            ? offerPlacesByCity
            : sortOffers(offerPlacesByCity, activeOption)
        }
        className="cities__places-list places__list"
        parentName="cities"
        imageSizes={ImageSize.Places}
      />
    </section>
  );
}
