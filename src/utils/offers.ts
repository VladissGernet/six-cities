// Файл с helpers для работы с offers.

import { CityName } from '../types/offers';
import { GroupedOffers, GroupedOffersByCity } from '../types/offers';

/**
 * Получаем объект с городом и массивом предложеений по этому городу.
 * @param city Название города.
 * @param groupedOffers Коллекция Map предложений.
 * @param maxOffers Опциональный параметр максимального количества отображаемых
 * предложений, остаток отбрасывается.
 * @returns Объект с названием города и массива предложений по этому городу.
 */
function createGroupedOffersByCity(
  city: CityName,
  groupedOffers: GroupedOffers,
  maxOffers?: number,
): GroupedOffersByCity {
  let cities = groupedOffers.get(city) ?? [];

  if (maxOffers) {
    cities = cities.slice(0, maxOffers);
  }

  return {
    city: city,
    cities: cities,
  };
}

export { createGroupedOffersByCity };
