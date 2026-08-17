import cn from 'classnames';

import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import PlacesList from '../../components/places/places-list';
import Footer from '../../components/footer/footer';

import { filterFavoriteOffers } from './favorites.helper';
import { ImageSize } from '../../const';

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

  const favoritesListTemplate = (
    <>
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {favoriteOffersByCity.map(({ city, group }) => (
          <li key={city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <PlacesList
              groupedOffersByCity={group}
              className="favorites__places"
              parentName="favorites"
              imageSizes={ImageSize.Favorites}
            />
          </li>
        ))}
      </ul>
    </>
  );
  const emptyListTemplate = (
    <>
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">
          Save properties to narrow down search or plan your future trips.
        </p>
      </div>
    </>
  );

  return (
    <Page hasFavorites={hasFavorites} isFavorites>
      <Header />
      <Main hasFavorites={hasFavorites}>
        <div className={mainContainerClassName}>
          <section className={favoritesClassName}>
            {/*
          TODO, вынести компоненты favoritesListTemplate и emptyListTemplate в отдельные компоненты.
        */}
            {hasFavorites ? favoritesListTemplate : emptyListTemplate}
          </section>
        </div>
      </Main>
      <Footer />
    </Page>
  );
}
