import type { Middleware, PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { redirectToRoute } from '../action';

const redirect: Middleware =
  () => (next) => (action: PayloadAction<string>) => {
    if (redirectToRoute.match(action)) {
      browserHistory.push(action.payload);
    }

    return next(action);
  };

export { redirect };
