import { GroupedOffersByCity } from '../../types/offers';

import Places from '../places/places';

type NearPlacesProps = {
  groupedOffersByCity: GroupedOffersByCity;
};

/** Отображает 3 первых предложения неподалёку. */
export default function NearPlaces({
  groupedOffersByCity,
}: NearPlacesProps): JSX.Element {
  return (
    <Places
      title="Other places in the neighbourhood"
      groupedOffersByCity={groupedOffersByCity}
    />
  );
}
