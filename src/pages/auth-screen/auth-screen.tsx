import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useRef, useState, type FormEventHandler } from 'react';

import Page from '../../components/page/page';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import Container from '../../components/container/container';

import { loginAction } from '../../store/api-actions';
import { changeCity } from '../../store/action';

import { AppRoute, CITY_NAMES } from '../../const';
import { getRandomElement } from '../../utils/utils';
import { useAppDispatch } from '../../hooks/redux';
import type { CityName } from '../../types/offers';

const MIN_LENGTH_PASSWORD = 2;

export default function AuthScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const authTitleStatus = isSubmitting ? 'Signing in…' : 'Sign in';

  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler = (evt) => {
    evt.preventDefault();
    if (isSubmitting) {
      return;
    }
    if (loginRef.current !== null && passwordRef.current !== null) {
      setIsSubmitting(true);
      dispatch(
        loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        }),
      ).finally(() => {
        setIsSubmitting(false);
      });
    }
  };

  const randomCity = getRandomElement<CityName>(CITY_NAMES);

  const handleRandomCityClick = () => {
    if (randomCity) {
      dispatch(changeCity(randomCity));
    }
  };

  return (
    <Page>
      <Helmet>
        <title>{authTitleStatus}</title>
      </Helmet>
      <Header isHeaderNoNav />
      <Main>
        <Container className="page__login-container container">
          <section className="login">
            <h1 className="login__title">{authTitleStatus}</h1>
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
                  pattern="^.*(?=.*[a-zA-Z])(?=.*\d).*$"
                  title="Password must be longer than or equal to 2 characters"
                  minLength={MIN_LENGTH_PASSWORD}
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isSubmitting}
              >
                {authTitleStatus}
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Root}
                onClick={handleRandomCityClick}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </Container>
      </Main>
    </Page>
  );
}
