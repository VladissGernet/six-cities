// Файл с helpers для работы с offers.

import { CityName } from '../const';
import { GroupedOffers, GroupedOffersByCity } from '../types/offers';

/**
 * Получаем объект с городом и массивом предложеений по этому городу.
 * @param city Название города.
 * @param groupedOffers Коллекция Map предложений.
 * @returns Объект с названием города и массива предложений по этому городу.
 */
function createGroupedOffersByCity(
  city: CityName,
  groupedOffers: GroupedOffers,
): GroupedOffersByCity {
  const cities = groupedOffers.get(city);
  return {
    city: city,
    cities: cities ?? [],
  };
}

export { createGroupedOffersByCity };
