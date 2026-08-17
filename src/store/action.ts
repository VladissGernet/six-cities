import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../types/offers';

export const changeCity = createAction<CityName>('offers/changeCity');

export const fillOffersListByCity = createAction('offers/fillOffersListByCity');
