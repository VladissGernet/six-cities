import { Offers } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  groupedOffersByCity: Offers;
  className: string;
  parentName: string;
  imageSizes: {
    width: number;
    height: number;
  };
};

export default function PlacesList({
  groupedOffersByCity,
  className,
  parentName,
  imageSizes,
}: PlacesListProps): JSX.Element {
  return (
    <div className={className}>
      {groupedOffersByCity.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          parentName={parentName}
          imageSizes={imageSizes}
        />
      ))}
    </div>
  );
}
