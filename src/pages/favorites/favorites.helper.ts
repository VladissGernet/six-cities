import { GroupedOffers, GroupedOffersByCity } from '../../types/offers';
import { filterByProperty } from '../../utils/utils';

/**
 * Группирует избранные предложения по городу и фильтрует их, оставляя только избранные значения.
 *
 * @param groupedOffers - Коллекция предложений.
 * @returns Массив объектов вида `{ city: CityName, offerPlacesByCity: Offer[] }`,
 *          где каждый объект соответствует одному городу и содержит
 *          только избранные предложения этого города.
 */
function filterFavoriteOffers(
  groupedOffers: GroupedOffers,
): GroupedOffersByCity[] {
  // TODO исправить типизацию
  const transformedFilteredOffers: GroupedOffersByCity[] = [];

  groupedOffers.forEach((offers, city) => {
    const filteredOffers = filterByProperty(offers, 'isFavorite', true);

    if (filteredOffers.length) {
      transformedFilteredOffers.push({
        city,
        offerPlacesByCity: filteredOffers,
      });
    }
  });

  return transformedFilteredOffers;
}

export { filterFavoriteOffers };
