import { Helmet } from 'react-helmet-async';
import cn from 'classnames';

import Container from '../../components/container/container';

import FavoritesFilledList from './favorites-filled-list';
import FavoritesEmptyList from './favorites-empty-list';

// Исправление sticky-footer.
import styles from './favorites.module.css';
import { useAppSelector } from '../../hooks/redux';

export default function Favorites(): JSX.Element {
  const favoriteOffersByCity = useAppSelector(
    (state) => state.groupedFavoirteOffers,
  );
  const hasFavorites = favoriteOffersByCity.length > 0;

  const mainContainerClassName = cn(
    'page__favorites-container',
    // Исправление sticky-footer.
    hasFavorites && styles['page__favorites-container'],
    'container',
  );
  const favoritesClassName = cn(
    'favorites',
    !hasFavorites && 'favorites--empty',

    // Исправление sticky-footer.
    hasFavorites && styles['favorites'],
  );

  return (
    <>
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <Container className={mainContainerClassName}>
        <section className={favoritesClassName}>
          {hasFavorites ? (
            <FavoritesFilledList favoriteOffersByCity={favoriteOffersByCity} />
          ) : (
            <FavoritesEmptyList />
          )}
        </section>
      </Container>
    </>
  );
}
