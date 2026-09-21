import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';

import { store } from './store';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// TODO, В проекте наблюдается неоднозначность стрелочных функций и функциональных выражений.
// Привести все к единому виду.
// TODO, проверить все import , возможно есть дублирующие или неиспользовающиеся.

/*
(state) => state.city - и подобные функции описать как getCity и т.п. в какой-нибудь offers-selectors.ts
https://up.htmlacademy.ru/profession/react-lite/4/lite-javascript-3/4/module/7/item/17
1.01.00 - варианты для проммисов в action, чтобы обрабатывать pending,fullfild,rejected
еще пример на 1.11.00
не забыть обработку .rejected
2.25.00
Разбить reducer и исползовать combineReducer для их объеденения в один чрезе store/root-reducer.ts
изучить .createSlice
изучить Ducks (иногда «ducks-modular-redux»)

1.38.20 - д\з 2 - пример проверки авторизации.

URL для axios сохранить в enum, потому что они на проекте фиксированы.

1.53.00 рассматривается обработка ошибок на api.interceptors.response.use

1.54.00 toast - библиотека отображения ошибок в UI.
Его не нужно отображать для неавторизированных пользователей. это 401 ошибка.

Проверить ТЗ и backend сервера на response. В разборе еще указывает на надичие минимум 3 символа.
Может оно и не работает.

Перед взаимодействием с UI , например, очисткой формы при отправке данных на сервер, нужно убедиться,
а был ли успешно доставлен запрос или отобразить ошибку и оставить данные для повторной отправки.
Желательно сделать валидацию заранее. Например, можно использовать встроенные возможности валидации
у HTML элементов.

Повторить формы на ref и контролируемые и неконтролируемые формы.

проверить /tsx, т.е. файлы без react разметки, содержащие только JS код не должны быть расширения /tsx

2.50 разбор

флаги на загрузку в reducer везде должны быть свои. 2.57
*/

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>,
);
