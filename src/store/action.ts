import { createAction } from '@reduxjs/toolkit';

import type { CityName } from '../types/offers';
import type { ActiveMapMarkerId } from '../types/general';
import type { AppRoute } from '../const';

// TODO, добавить общий export { changeCity, ...} и так во всех в поиске export const.
export const changeCity = createAction<CityName>('offers/changeCity');
export const setActiveMapMaker = createAction<ActiveMapMarkerId>(
  'offersMap/setActiveMapMaker',
);
export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
