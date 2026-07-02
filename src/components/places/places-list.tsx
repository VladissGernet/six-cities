import { Offers } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type PlacesListProps = {
  groupedOffersByCity: Offers;
  className: string;
  /*
  TODO, исправить parentName на такойже, как и в Rating решение.
  TODO, рассмотреть возможность использования переиспользование и наращивание типов через "&"
  // Например
  type Item = {
    id: string;
  };

  type Post = Item & {
    title: string;
    description: string;
  };

  type MegaPost = Post & {
    viewsCount: number;
  };
  */
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
