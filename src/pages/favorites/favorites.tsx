import cb from 'classnames';
import { GroupedOffers, CityName, Offer } from '../../types/offers';
import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import PlacesList from '../../components/places/places-list';
import Footer from '../../components/footer/footer';
import { FAVORITES_IMAGE_SIZES } from '../../const';

// Исправление sticky-footer.
import styles from './favorites.module.css';

type FilteredFavorites = { city: CityName; group: Offer[] }[];

type FavoritesProps = {
  groupedOffers: GroupedOffers;
};

/**
 * Группирует избранные предложения по городу и фильтрует их, оставляя только избранные значения.
 *
 * @param groupedOffers - Коллекция предложений.
 * @returns Массив объектов вида `{ city: CityName, group: Offer[] }`,
 *          где каждый объект соответствует одному городу и содержит
 *          только избранные предложения этого города.
 */
function filterFavoriteOffers(groupedOffers: GroupedOffers): FilteredFavorites {
  const transformedFilteredOffers: FilteredFavorites = [];

  groupedOffers.forEach((offers, city) => {
    const filteredOffers = offers.filter((offer) => offer.isFavorite);

    if (filteredOffers.length) {
      transformedFilteredOffers.push({ city, group: filteredOffers });
    }
  });

  return transformedFilteredOffers;
}

export default function Favorites({
  groupedOffers,
}: FavoritesProps): JSX.Element {
  const favoriteOffersByCity = filterFavoriteOffers(groupedOffers);

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
              imageSizes={FAVORITES_IMAGE_SIZES}
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
    <Page hasFavorites={hasFavorites}>
      <Header />
      <Main hasFavorites={hasFavorites}>
        <div className={mainContainerClassName}>
          <section className={favoritesClassName}>
            {/*
              TODO, рассмотреть рефакторинг в будущем с помощью React.memo и useMemo.
              Данная реализация редерит выше сразу ДВЕ разметки для пустого и полного элемента.
            */}
            {hasFavorites ? favoritesListTemplate : emptyListTemplate}
          </section>
        </div>
      </Main>
      <Footer />
    </Page>
  );
}
