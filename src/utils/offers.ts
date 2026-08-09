// Файл с helpers для работы с offers.

import { CityName } from '../types/offers';
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
  return {
    city: city,
    cities: groupedOffers.get(city) ?? [],
  };
}

export { createGroupedOffersByCity };
