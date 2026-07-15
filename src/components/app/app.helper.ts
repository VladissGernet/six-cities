import { Offers, GroupedOffers } from '../../types/offers';

// TODO, попробовать реализовать infer.
/**
 * Преобразует массив прдложений в коллекцию.
 * @param offers Массив всех предложений.
 * @returns Коллекция Map предложений по городам(ключам).
 */
function groupOffers(offers: Offers): GroupedOffers {
  return offers.reduce<GroupedOffers>((favoriteOffersByCity, offer) => {
    const isIncluded = favoriteOffersByCity.get(offer.city.name);

    if (isIncluded) {
      isIncluded.push(offer);
    } else {
      favoriteOffersByCity.set(offer.city.name, [offer]);
    }
    return favoriteOffersByCity;
  }, new Map());
}

export { groupOffers };
