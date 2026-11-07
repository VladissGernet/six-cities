// Components.
import FavoritesTemplate from './favorites-template';
import FavoritesFilledList from './favorites-filled-list';
import FavoritesEmptyList from './favorites-empty-list';

// Selectors.
import { useAppSelector } from '../../hooks/redux';
import {
  getGroupedFavoriteOffers,
  getOffersErrorMessage,
} from '../../store/selectors/offers';

export default function Favorites(): JSX.Element {
  const offersErrorMessage = useAppSelector(getOffersErrorMessage);
  const favoriteOffersByCity = useAppSelector(getGroupedFavoriteOffers);
  const hasFavorites = favoriteOffersByCity.length > 0;

  if (offersErrorMessage) {
    return (
      <FavoritesTemplate>
        <h1>{offersErrorMessage}</h1>
      </FavoritesTemplate>
    );
  }

  return (
    <FavoritesTemplate>
      {hasFavorites ? (
        <FavoritesFilledList favoriteOffersByCity={favoriteOffersByCity} />
      ) : (
        <FavoritesEmptyList />
      )}
    </FavoritesTemplate>
  );
}
