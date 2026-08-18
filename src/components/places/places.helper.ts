import { PlacesSortingValue } from '../../const';
import { PlacesSortingValueType } from '../../types/general';
import { Offers } from '../../types/offers';

export function sortOffers(
  offers: Offers,
  option: PlacesSortingValueType,
): Offers {
  console.log(offers);
  // Price: low to high. От дешёвых к дорогим.
  // const result = offers.toSorted((a, b) => a.price - b.price);
  // Price: high to low. От дорогих к дешёвым.
  // const result = offers.toSorted((a, b) => b.price - a.price);
  // Top rated first.
  const result = offers.toSorted((a, b) => b.rating - a.rating);
  console.log(result);
  return result;
}
// https://chat.deepseek.com/a/chat/s/3aaa2965-1717-4868-8bcc-b0d4d58b04ba
