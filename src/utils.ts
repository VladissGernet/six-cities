import { Offer, GroupedOffers } from './types/offers';
import { CityName } from './const';

/**
 * Получение случайного элемента из массива.
 * @param array Массив из значений.
 * @returns Случайный элемент массива array.
 */
function getRandomElement<T>(array: readonly T[]): T | undefined {
  if (!array.length) {
    return undefined;
  }
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Группирует избранные предложения по городу и фильтрует их, оставляя только избранные значения.
 *
 * @param groupedOffers - Коллекция предложений.
 * @returns Массив объектов вида `{ city: CityName, group: Offer[] }`,
 *          где каждый объект соответствует одному городу и содержит
 *          только избранные предложения этого города.
 */
type FilteredFavorites = { city: CityName; group: Offer[] }[];

function filterFavoriteOffers(groupedOffers: GroupedOffers): FilteredFavorites {
  const transformedFilteredOffers: FilteredFavorites = [];

  groupedOffers.forEach((offers, city) => {
    const filteredOffers = offers.filter((offer) => offer.isFavorite);

    if (filteredOffers.length) {
      transformedFilteredOffers.push({ city, group: filteredOffers });
    }
  });

  return transformedFilteredOffers;
}

export { getRandomElement, filterFavoriteOffers };
