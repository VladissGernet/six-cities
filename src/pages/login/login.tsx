import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';

import { CITY_NAMES } from '../../const';
import { CityName } from '../../types/offers';
import { getRandomElement } from '../../utils/utils';

export default function Login(): JSX.Element {
  const randomCity = getRandomElement<CityName>(CITY_NAMES);

  return (
    <Page isGray isLogin>
      <Header isLoginPage />
      <Main isLoginPage>
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
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
