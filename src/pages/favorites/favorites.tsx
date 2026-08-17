import cn from 'classnames';

import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Footer from '../../components/footer/footer';

import FavoritesFilledList from './favorites-filled-list';
import FavoritesEmptyList from './favorites-empty-list';

import { filterFavoriteOffers } from './favorites.helper';

// Исправление sticky-footer.
import styles from './favorites.module.css';
import { useAppSelector } from '../../hooks/redux';

export default function Favorites(): JSX.Element {
  const groupedOffers = useAppSelector((state) => state.groupedOffers);
  const favoriteOffersByCity = filterFavoriteOffers(groupedOffers);
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
    <Page hasFavorites={hasFavorites} isFavorites>
      <Header />
      <Main hasFavorites={hasFavorites}>
        <div className={mainContainerClassName}>
          <section className={favoritesClassName}>
            {hasFavorites ? (
              <FavoritesFilledList
                favoriteOffersByCity={favoriteOffersByCity}
              />
            ) : (
              <FavoritesEmptyList />
            )}
          </section>
        </div>
      </Main>
      <Footer />
    </Page>
  );
}
