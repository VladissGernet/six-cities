import { Offers, Offer } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offers;
};

export default function PlacesList({ offers }: PlacesListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list">
      {offers.map(
        (offer: Offer): JSX.Element => (
          <PlaceCard key={offer.id} offer={offer} />
        ),
      )}
    </div>
  );
}
