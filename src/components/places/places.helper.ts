import { PlacesSortingValue } from '../../const';
import { PlacesSortingValueType } from '../../types/general';
import { Offer, Offers } from '../../types/offers';

export type Comparator = (a: Offer, b: Offer) => number;

const SortingComparator: Readonly<Record<PlacesSortingValueType, Comparator>> =
  {
    [PlacesSortingValue.Popular]: () => 0,
    [PlacesSortingValue.PriceLowToHigh]: (a, b) => a.price - b.price,
    [PlacesSortingValue.PriceHighToLow]: (a, b) => b.price - a.price,
    [PlacesSortingValue.TopRatedFirst]: (a, b) => b.rating - a.rating,
  } as const;

export function sortOffers(
  offers: Offers,
  option: PlacesSortingValueType,
): Offers {
  return offers.toSorted(SortingComparator[option]);
}
