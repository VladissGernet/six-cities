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
  Проверить вызовы метода в render .map и вынести для читабельности item в отдельные компоненты.

  изучить Ducks (иногда «ducks-modular-redux»)
  Проверить issues в DevTools, есть проблемы.

  Есть еще useStore.
  Если я использую useCallback и в нём нужно получить значение из store.
  На данный момент я мог реализовать передачу через useAppSelector в этот
  useCallBack.
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
