import cb from 'classnames';
import { Offers, Offer } from '../../types/offers';
import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import PlacesList from '../../components/places/places-list';
import Footer from '../../components/footer/footer';
import { FAVORITES_IMAGE_SIZES } from '../../const';

// Исправление sticky-footer.
import styles from './favorites.module.css';

type FavoritesProps = {
  offers: Offers;
};

/**
 * Группирует избранные предложения по городу.
 *
 * @param offers - Массив предложений.
 * @returns Массив объектов вида `{ city: string, group: Offer[] }`,
 *          где каждый объект соответствует одному городу и содержит
 *          только избранные предложения этого города.
 */
function groupFavoriteOffersByCity(offers: Offers) {
  const groups = offers.reduce<Map<string, Offer[]>>(
    (favoriteOffersByCity, offer) => {
      if (!offer.isFavorite) {
        return favoriteOffersByCity;
      }

      const isIncluded = favoriteOffersByCity.get(offer.city.name);

      if (isIncluded) {
        isIncluded.push(offer);
      } else {
        favoriteOffersByCity.set(offer.city.name, [offer]);
      }
      return favoriteOffersByCity;
    },
    new Map<string, Offer[]>(),
  );
  return Array.from(groups, ([city, group]) => ({
    city,
    group,
  }));
}

export default function Favorites({ offers }: FavoritesProps): JSX.Element {
  const favoriteOffersByCity = groupFavoriteOffersByCity(offers);
  const hasFavorites = favoriteOffersByCity.length > 0;
  const mainContainerClassName = cb(
    'page__favorites-container',

    // Исправление sticky-footer.
    hasFavorites && styles['page__favorites-container'],

    'container',
  );

  const favoritesClassName = cb(
    'favorites',
    !hasFavorites && 'favorites--empty',

    // Исправление sticky-footer.
    hasFavorites && styles.favorites,
  );

  return (
    <Page hasFavorites={hasFavorites}>
      <Header />
      <Main hasFavorites={hasFavorites}>
        <div className={mainContainerClassName}>
          <section className={favoritesClassName}>
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
                    offers={group}
                    className="favorites__places"
                    parentName="favorites"
                    imageSizes={FAVORITES_IMAGE_SIZES}
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Main>
      <Footer />
    </Page>
  );
}
