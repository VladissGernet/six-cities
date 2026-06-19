import PlaceCard from '../place-card/place-card';

export default function PlacesList(): JSX.Element {
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
