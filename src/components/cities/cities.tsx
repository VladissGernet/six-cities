import { GroupedOffers } from '../../types/offers';
import Places from '../../components/places/places';

type CitiesProps = {
  groupedOffers: GroupedOffers;
};

export default function Cities({ groupedOffers }: CitiesProps): JSX.Element {
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <Places groupedOffers={groupedOffers} />
        <div className="cities__right-section">
          <section className="cities__map map"></section>
        </div>
      </div>
    </div>
  );
}
