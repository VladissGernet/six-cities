import { Offers } from '../../types/offers';
import Places from '../../components/places/places';

type CitiesProps = {
  offers: Offers;
};

export default function Cities({ offers }: CitiesProps): JSX.Element {
  return (
    <div className="cities">
      <div className="cities__places-container container">
        <Places offers={offers} />
        <div className="cities__right-section">
          <section className="cities__map map"></section>
        </div>
      </div>
    </div>
  );
}
