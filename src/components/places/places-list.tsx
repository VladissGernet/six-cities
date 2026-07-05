import { Offers } from '../../types/offers';
import { ImageSizes } from '../../types/general';

import PlaceCard from '../place-card/place-card';

type PlacesListProps = ImageSizes & {
  groupedOffersByCity: Offers;
  className: string;
  parentName: string;
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
