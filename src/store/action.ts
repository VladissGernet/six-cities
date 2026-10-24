import { createAction } from '@reduxjs/toolkit';

import type { CityName } from '../types/offers';
import type { ActiveMapMarkerId } from '../types/general';
import type { AppRoute } from '../const';

const changeCity = createAction<CityName>('offers/changeCity');
const setActiveMapMaker = createAction<ActiveMapMarkerId>(
  'offersMap/setActiveMapMaker',
);
const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');

export { changeCity, setActiveMapMaker, redirectToRoute };
