import { Offers, GroupedOffers } from '../../types/offers';

/**
 * Преобразует массив прдложений в коллекцию.
 * @param offers Массив всех предложений.
 * @returns Коллекция Map предложений по городам(ключам).
 */
function groupOffers(offers: Offers): GroupedOffers {
  return offers.reduce<GroupedOffers>((favoriteOffersByCity, offer) => {
    const offersByCity = favoriteOffersByCity.get(offer.city.name);

    if (offersByCity) {
      offersByCity.push(offer);
    } else {
      favoriteOffersByCity.set(offer.city.name, [offer]);
    }
    return favoriteOffersByCity;
  }, new Map());
}

export { groupOffers };
