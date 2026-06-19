import { Offers } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offers;
};

export default function PlacesList({ offers }: PlacesListProps): JSX.Element {
  console.log(offers);

  return (
    <div className="cities__places-list places__list">
      <PlaceCard />
      <PlaceCard />
      <PlaceCard />
      <PlaceCard />
      <PlaceCard />
    </div>
  );
}
