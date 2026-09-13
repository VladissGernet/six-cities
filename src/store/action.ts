import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../types/offers';
import { ActiveMapMarkerId } from '../types/general';

export const changeCity = createAction<CityName>('offers/changeCity');

export const setActiveMapMaker = createAction<ActiveMapMarkerId>(
  'offersMap/setActiveMapMaker',
);
