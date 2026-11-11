import { store } from '../store/index';

type ErrorMessage = string | null;

type State = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export type { State, AppDispatch, ErrorMessage };
