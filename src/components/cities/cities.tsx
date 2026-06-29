import { GroupedOffersByCity } from '../../types/offers';
import Places from '../../components/places/places';

type CitiesProps = {
  groupedOffersByCity: GroupedOffersByCity;
};

export default function Cities({
  groupedOffersByCity,
}: CitiesProps): JSX.Element {
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <Places groupedOffersByCity={groupedOffersByCity} />
        <div className="cities__right-section">
          <section className="cities__map map"></section>
        </div>
      </div>
    </div>
  );
}
