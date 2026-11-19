import { useMemo, useState } from 'react';
import cn from 'classnames';

import PlacesList from './places-list';
import PlacesSorting from './places-sorting';
import { ImageSize, PlacesSortingValue } from '../../const';
import { sortOffers } from './places.helper';

import type { Offers } from '../../types/offers';
import type { PlacesSortingValueType } from '../../types/general';

type PlacesProps = {
  sectionClassName?: string;
  title: string;
  titleClassName?: string;
  isTitleNotVisible?: boolean;
  extraTitle?: string;
  groupedOffersByCity: Offers;
  isSortingForm?: boolean;
};

export default function Places({
  sectionClassName,
  title,
  titleClassName,
  isTitleNotVisible,
  extraTitle,
  groupedOffersByCity,
  isSortingForm,
}: PlacesProps): JSX.Element {
  const [activeOption, setActiveOption] = useState<PlacesSortingValueType>(
    PlacesSortingValue.Popular,
  );

  const sortedOffers = useMemo(
    () =>
      activeOption === PlacesSortingValue.Popular
        ? groupedOffersByCity
        : sortOffers(groupedOffersByCity, activeOption),
    [groupedOffersByCity, activeOption],
  );

  return (
    <section className={cn(sectionClassName, 'places')}>
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
        groupedOffersByCity={sortedOffers}
        className="cities__places-list places__list"
        parentName="cities"
        imageSizes={ImageSize.Places}
      />
    </section>
  );
}
