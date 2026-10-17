import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import App from './components/app/app';

import { store } from './store';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

/* TODO
1.53.00 рассматривается обработка ошибок на api.interceptors.response.use

2.17.58 - проверка отправки формы с .then.

2.50 разбор

флаги на загрузку в reducer везде должны быть свои. 2.57

8 раздел. 2.25.00
Разбить reducer и исползовать combineReducer для их объеденения в один чрезе store/root-reducer.ts
изучить .createSlice
изучить Ducks (иногда «ducks-modular-redux»)
*/

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
);
