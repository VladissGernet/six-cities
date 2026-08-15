import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { INITIAL_STATE_CITY } from '../const';

import { cityChange, getOffersListByCity } from './action';

const initialState = {
  city: INITIAL_STATE_CITY,
  offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChange, (state) => {
      // изменение города
    })
    .addCase(getOffersListByCity, (state) => {
      // Действие для заполнения списка предложений должно
      // поместить в хранилище все предложения по аренде. Пока
      // используем тестовые данные.
    });
});
// https://www.perplexity.ai/search/385e4d6b-3b3f-475b-8765-130fc51a8a44
