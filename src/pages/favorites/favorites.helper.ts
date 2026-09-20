import { filterByProperty } from '../../utils/utils';

import type { GroupedOffers, GroupedOffersByCity } from '../../types/offers';

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
  /*
  TODO исправить ошбику фильтрации и типизацию

  Почему forEach не работает
    У типа Partial<Record<CityName, Offers>> нет метода forEach. forEach есть у:

    массивов (Offer[]);

    Map, Set и некоторых коллекций.

    А у обычного объекта его нет. Поэтому, когда ты пишешь:

    ts
    groupedOffers.forEach((offers, city) => {
    TypeScript видит:

    groupedOffers: Partial<Record<CityName, Offers>>;

    у этого типа нет forEach;

    в строгом режиме с noImplicitAny / noUnsafe* это выливается в ошибку вида «Unsafe call of an any typed value» (потому что TS не знает, что именно ты вызываешь).

    Как правильно итерировать GroupedOffers
    Поскольку GroupedOffers — это объект, а не Map, нужно использовать Object.entries (или Object.keys):

  */
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
