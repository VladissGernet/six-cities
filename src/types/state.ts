import { store } from '../store/index';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

/* TODO
Заменить на
  import type { Questions } from '../types/question';
  import type { AppDispatch, State } from '../types/state';
*/
