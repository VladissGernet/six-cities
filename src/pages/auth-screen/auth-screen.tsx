import { useRef, type FormEventHandler } from 'react';

import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';

import { CITY_NAMES } from '../../const';
import { getRandomElement } from '../../utils/utils';

import type { CityName } from '../../types/offers';
import { useAppDispatch } from '../../hooks/redux';
import { loginAction } from '../../store/api-actions';
// import { useNavigate } from 'react-router-dom';

export default function AuthScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  // TODO возможно использовать для другого это нужно.
  // const navigate = useNavigate();

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();
    // TODO, добавить валидацию на пароль Password no have letter or number!
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(
        loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        }),
      );
      // TODO, проверка на ошибку логина
      // navigate(AppRoute.Root);
    }
  };

  const randomCity = getRandomElement<CityName>(CITY_NAMES);

  return (
    <Page isGray isLogin>
      <Header isLoginPage />
      <Main isLoginPage>
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              onSubmit={handleSubmit}
              className="login__form form"
              action="#"
              method="post"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                {/* TODO
                  В правой части страницы «Login» отображается кнопка для быстрого перехода
                  к списку предложений по аренде в этом городе. Город для быстрого перехода
                  определяется случайным образом. Клик по кнопке перенаправляет пользователя
                  на главную страницу и устанавливает фильтр в соответствии с выбранным
                  городом.
                */}
                <span>{randomCity}</span>
              </a>
            </div>
          </section>
        </div>
      </Main>
    </Page>
  );
}
