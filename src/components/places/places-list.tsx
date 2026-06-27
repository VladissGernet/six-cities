import { Offers, Offer } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  offers: Offers;
  className: string;
  parentName: string;
  imageSizes: {
    width: number;
    height: number;
  };
};

export default function PlacesList({
  offers,
  className,
  parentName,
  imageSizes,
}: PlacesListProps): JSX.Element {
  return (
    <div className={className}>
      {offers.map(
        (offer: Offer): JSX.Element => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            parentName={parentName}
            imageSizes={imageSizes}
          />
        ),
      )}
    </div>
  );
}
