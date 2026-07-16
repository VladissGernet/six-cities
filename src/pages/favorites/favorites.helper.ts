import { GroupedOffers, Offer } from '../../types/offers';
import { CityName } from '../../const';
import { filterByProperty } from '../../utils/utils';

type FilteredFavorites = { city: CityName; group: Offer[] }[];

/**
 * Группирует избранные предложения по городу и фильтрует их, оставляя только избранные значения.
 *
 * @param groupedOffers - Коллекция предложений.
 * @returns Массив объектов вида `{ city: CityName, group: Offer[] }`,
 *          где каждый объект соответствует одному городу и содержит
 *          только избранные предложения этого города.
 */
function filterFavoriteOffers(groupedOffers: GroupedOffers): FilteredFavorites {
  const transformedFilteredOffers: FilteredFavorites = [];

  groupedOffers.forEach((offers, city) => {
    const filteredOffers = filterByProperty(offers, 'isFavorite', true);

    if (filteredOffers.length) {
      transformedFilteredOffers.push({ city, group: filteredOffers });
    }
  });

  return transformedFilteredOffers;
}

export { filterFavoriteOffers };
