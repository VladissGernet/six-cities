// Файл с helpers для работы с offers.

import type { CityName } from '../types/offers';
import type {
  GroupedOffers,
  GroupedOffersByCity,
  Offers,
} from '../types/offers';
import { filterByProperty } from './utils';

/**
 * Преобразует массив предложений в объект сгруппированных городов.
 * @param offers Массив всех предложений.
 * @returns Объект предложений по городам(ключам).
 */
const groupOffers = (offers: Offers): GroupedOffers =>
  offers.reduce((groupedOffers, offer) => {
    const currentOfferCity = offer.city.name;

    if (groupedOffers[currentOfferCity]?.length) {
      groupedOffers[currentOfferCity].push(offer);
    } else {
      groupedOffers[currentOfferCity] = [offer];
    }

    return groupedOffers;
  }, {} as GroupedOffers);

/**
 * Группирует избранные предложения по городу и фильтрует их, оставляя только избранные значения.
 *
 * @param groupedOffers - Объект предложений с ключами городами и их массивами с предложениями.
 * @returns Массив объектов вида `{ city: CityName, offerPlacesByCity: Offer[] }`,
 *          где каждый объект соответствует одному городу и содержит
 *          только избранные предложения этого города.
 */
const filterFavoriteOffers = (
  groupedOffers: GroupedOffers,
): GroupedOffersByCity[] => {
  const transformedFilteredOffers: GroupedOffersByCity[] = [];

  Object.entries(groupedOffers).forEach(([city, offers]) => {
    const filteredOffers = filterByProperty(offers, 'isFavorite', true);
    if (filteredOffers.length) {
      transformedFilteredOffers.push({
        city: city as CityName,
        offerPlacesByCity: filteredOffers,
      });
    }
  });

  return transformedFilteredOffers;
};

export { groupOffers, filterFavoriteOffers };
