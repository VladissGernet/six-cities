import { GroupedOffersByCity } from '../../types/offers';
import Places from '../../components/places/places';

type CitiesProps = {
  groupedOffersByCity: GroupedOffersByCity;
};

export default function Cities({
  groupedOffersByCity,
}: CitiesProps): JSX.Element {
  const isNoCities = !groupedOffersByCity.cities.length;
  const { city, cities } = groupedOffersByCity;
  // TODO, сделать окончание динамичным places
  const citiesElement = (
    <div className="cities__places-container container">
      <Places
        rootClassName="cities__places"
        title="Places"
        extraTitle={`${cities.length} places to stay in ${city}`}
        isTitleNotVisible
        groupedOffersByCity={groupedOffersByCity}
      />
      <div className="cities__right-section">
        <section className="cities__map map"></section>
      </div>
    </div>
  );

  const emptyCitiesElement = (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">
            We could not find any property available at the moment in Dusseldorf
          </p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  );

  return (
    <div className="cities">
      {/*
        TODO, рассмотреть рефакторинг в будущем с помощью React.memo и useMemo.
        Данная реализация редерит выше сразу ДВЕ разметки для пустого и полного элемента.
      */}
      {isNoCities ? emptyCitiesElement : citiesElement}
    </div>
  );
}
