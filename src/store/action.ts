import { createAction } from '@reduxjs/toolkit';

import type { AppRoute } from '../const';

const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');

export { redirectToRoute };
