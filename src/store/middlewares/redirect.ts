import type { Middleware, PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { reducer } from '../reducer';
import { redirectToRoute } from '../action';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (redirectToRoute.match(action)) {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
