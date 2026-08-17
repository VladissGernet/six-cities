import { GroupedOffersByCity } from '../../types/offers';
import PlacesList from '../../components/places/places-list';

import { ImageSize } from '../../const';

type FavoritesFilledListProps = {
  favoriteOffersByCity: GroupedOffersByCity[];
};

export default function FavoritesFilledList({
  favoriteOffersByCity,
}: FavoritesFilledListProps): JSX.Element {
  return (
    <>
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {favoriteOffersByCity.map(({ city, offerPlacesByCity }) => (
          <li key={city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <PlacesList
              groupedOffersByCity={offerPlacesByCity}
              className="favorites__places"
              parentName="favorites"
              imageSizes={ImageSize.Favorites}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
