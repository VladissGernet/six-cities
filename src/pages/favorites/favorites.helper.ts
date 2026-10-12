import { filterByProperty } from '../../utils/utils';

import type {
  CityName,
  GroupedOffers,
  GroupedOffersByCity,
} from '../../types/offers';

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

export { filterFavoriteOffers };
