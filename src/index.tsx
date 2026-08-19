import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';

import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// TODO, В проекте наблюдается неоднозначность стрелочных функций и функциональных выражений.
// Привести все к единому виду.
// TODO, проверить все import , возможно есть дублирующие или неиспользовающиеся.
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
