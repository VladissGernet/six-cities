import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import App from './components/app/app';

import { store } from './store';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

/* TODO  8 раздел. 2.25.00
  Разбить reducer и использовать combineReducer для их объедения в один
  через store/root-reducer.ts
  изучить .createSlice
  изучить Ducks (иногда «ducks-modular-redux»)

  Проверить issues в DevTools, есть проблемы.
*/

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

root.render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </StrictMode>,
);
