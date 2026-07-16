import cn from 'classnames';

import { GroupedOffersByCity } from '../../types/offers';
import PlacesList from './places-list';
import PlacesForm from './places-form';
import { PLACES_IMAGE_SIZES } from '../../const';

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
  const { cities } = groupedOffersByCity;
  return (
    <section className={cn(rootClassName, 'places')}>
      <h2
        className={cn(isTitleNotVisible ? 'visually-hidden' : titleClassName)}
      >
        {title}
      </h2>
      {extraTitle && <b className="places__found">{extraTitle}</b>}
      {isSortingForm && <PlacesForm />}
      <PlacesList
        groupedOffersByCity={cities}
        className="cities__places-list places__list"
        parentName="cities"
        imageSizes={PLACES_IMAGE_SIZES}
      />
    </section>
  );
}
