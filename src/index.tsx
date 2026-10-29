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

/* TODO
  Проверить, есть ли создание анонимных функций в обработчиках разметки onClick, onSubmit и пр.
  флаги на загрузку в reducer везде должны быть свои. 2.57
  8 раздел. 2.25.00
  Разбить reducer и исползовать combineReducer для их объеденения в один чрезе store/root-reducer.ts
  изучить .createSlice
  изучить Ducks (иногда «ducks-modular-redux»)

  Проверить issues в DevTools, есть проблемы.
  Исправить опечатки через Spell Checker. Поискать возможность поиска сразу по всему проекту.
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
