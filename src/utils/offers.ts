// Файл с helpers для работы с offers.

import { CityName } from '../types/offers';
import {
  GroupedOffers,
  GroupedOffersByCity,
  Offers,
  Offer,
} from '../types/offers';
import { MAX_NEAR_OFFERS } from '../const';

/**
 * Преобразует массив прдложений в объект сгруппированных городов.
 * @param offers Массив всех предложений.
 * @returns Объект предложений по городам(ключам).
 */
function groupOffers(offers: Offers): GroupedOffers {
  return offers.reduce((groupedOffers, offer) => {
    const currentOfferCity = offer.city.name;

    if (groupedOffers[currentOfferCity]?.length) {
      groupedOffers[currentOfferCity].push(offer);
    } else {
      groupedOffers[currentOfferCity] = [offer];
    }

    return groupedOffers;
  }, {} as GroupedOffers);
}

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
    offerPlacesByCity: groupedOffers[city] ?? [],
  };
}

/**
 * Возвращает ближайшие предложения, исключая предложения
 * с идентификатором выбранного города.
 *
 * Функция просматривает предложения по порядку и добавляет
 * только те, чей идентификатор отличается от 'selectedId'.
 * Количество возвращаемых предложений ограничено константой
 * 'MAX_NEAR_OFFERS'.
 *
 * @param offers Массив предложений.
 * @param excludedOfferId — идентификатор предложения,
 * которое необходимо исключить.
 * @returns Не более 'MAX_NEAR_OFFERS' предложений без выбранного предложения.
 */
const getNearOffersWithRestriction = (
  offers: Offers,
  selectedId: Offer['id'],
): Offers => {
  const filteredOffers = [];
  for (
    let i = 0;
    filteredOffers.length < MAX_NEAR_OFFERS && i < offers.length;
    i++
  ) {
    const element = offers[i];
    const { id: elementId } = element;
    if (elementId !== selectedId) {
      filteredOffers.push(element);
    }
  }
  return filteredOffers;
};

export { createGroupedOffersByCity, getNearOffersWithRestriction, groupOffers };
