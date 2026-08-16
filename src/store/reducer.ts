import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { INITIAL_STATE_CITY } from '../const';
import { Offers, CityName } from '../types/offers';
import { cityChange, fillOffersListByCity } from './action';

type StateType = {
  city: CityName;
  offers: Offers;
};

const initialState: StateType = {
  city: INITIAL_STATE_CITY,
  offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChange, (state) => {
      // изменение города
    })
    .addCase(fillOffersListByCity, (state) => {
      // Действие для заполнения списка предложений должно
      // поместить в хранилище все предложения по аренде. Пока
      // используем тестовые данные.
    });
});
