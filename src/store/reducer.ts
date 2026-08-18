// Моковые данные.
import { offers } from '../mocks/offers';

import { createReducer } from '@reduxjs/toolkit';
import { INITIAL_STATE_CITY } from '../const';
import { Offers, CityName, GroupedOffers } from '../types/offers';
import { changeCity, fillOffersListByCity } from './action';
import { groupOffers } from '../utils/offers';

type StateType = {
  city: CityName;
  offers: Offers;
  groupedOffers: GroupedOffers;
};

const initialState: StateType = {
  city: INITIAL_STATE_CITY,
  offers,
  groupedOffers: groupOffers(offers),
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    const newCity = action.payload;
    state.city = newCity;
  });
  // .addCase(fillOffersListByCity, (state) => {
  //   // Действие для заполнения списка предложений должно
  //   // поместить в хранилище все предложения по аренде. Пока
  //   // используем тестовые данные.
  // });
});
