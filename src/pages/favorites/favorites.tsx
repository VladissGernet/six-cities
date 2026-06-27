import { Offers, Offer } from '../../types/offers';
import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import PlacesList from '../../components/places/places-list';
import { FAVORITES_IMAGE_SIZES } from '../../const';

// Исправление sticky-footer.
import styles from './favorites.module.css';

type FavoritesProps = {
  offers: Offers;
};

function groupFavoriteOffersByCity(offers: Offers) {
  return offers.reduce<Map<string, Offer[]>>((favoriteOffersByCity, offer) => {
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
  }, new Map<string, Offer[]>());
}

export default function Favorites({ offers }: FavoritesProps): JSX.Element {
  const favoriteOffersByCity = groupFavoriteOffersByCity(offers);
  // TODO продолжить реализацию ренедра городов добавленных в избранное.

  return (
    <Page isFavorites>
      <Header />
      <Main isFavorites>
        <div
          // Исправление sticky-footer.
          className={`page__favorites-container ${styles['page__favorites-container']} container`}
        >
          <section className={`favorites ${styles.favorites}`}>
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <PlacesList
                  offers={offers}
                  className="favorites__places"
                  parentName="favorites"
                  imageSizes={FAVORITES_IMAGE_SIZES}
                />
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <PlacesList
                  offers={offers}
                  className="favorites__places"
                  parentName="favorites"
                  imageSizes={FAVORITES_IMAGE_SIZES}
                />
              </li>
            </ul>
          </section>
        </div>
      </Main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </Page>
  );
}
