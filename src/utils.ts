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
 * Типобезопасно фильтрует массив объектов по значению свойства массив объектов
 * по значению указанного свойства.
 * @param collection Массив объектов одного типа.
 * @param property Ключ свойства объекта из массива collection.
 * @param value Значение свойства, по которому выполняется фильтрация.
 * @returns Массив объектов, у которых значение свойства совпадает с value.
 */
function filterByProperty<T, K extends keyof T>(
  collection: T[],
  property: K,
  value: T[K],
): T[] {
  return collection.filter((item) => item[property] === value);
}

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

export { getRandomElement, filterFavoriteOffers, filterByProperty };
