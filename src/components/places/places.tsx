import cn from 'classnames';

import { GroupedOffersByCity } from '../../types/offers';
import PlacesList from './places-list';
import { PLACES_IMAGE_SIZES } from '../../const';

type PlacesProps = {
  rootClassName?: string;
  title: string;
  titleClassName?: string;
  isTitleNotVisible?: boolean;
  extraTitle?: string;
  groupedOffersByCity: GroupedOffersByCity;
};

export default function Places({
  rootClassName,
  title,
  titleClassName,
  isTitleNotVisible,
  extraTitle,

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
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
          Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use href="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          <li className="places__option places__option--active" tabIndex={0}>
            Popular
          </li>
          <li className="places__option" tabIndex={0}>
            Price: low to high
          </li>
          <li className="places__option" tabIndex={0}>
            Price: high to low
          </li>
          <li className="places__option" tabIndex={0}>
            Top rated first
          </li>
        </ul>
      </form>
      <PlacesList
        groupedOffersByCity={cities}
        className="cities__places-list places__list"
        parentName="cities"
        imageSizes={PLACES_IMAGE_SIZES}
      />
    </section>
  );
}
