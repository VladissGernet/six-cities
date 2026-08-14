import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { INITIAL_STATE_CITY } from '../const';

import { cityChange, fillOffersList } from './action';

const initialState = {
  city: INITIAL_STATE_CITY,
  offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChange, (state) => {
      // изменение города
    })
    .addCase(fillOffersList, (state) => {
      // Действие для заполнения списка предложений должно
      // поместить в хранилище все предложения по аренде. Пока
      // используем тестовые данные.
    });
});
