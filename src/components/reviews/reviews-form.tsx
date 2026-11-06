import {
  useState,
  Fragment,
  type FormEventHandler,
  type ChangeEventHandler,
} from 'react';

import type { RatingValue } from '../../types/general';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/redux';
import { getAuthenticationStatus } from '../../store/selectors/authentication';
import { AuthenticationStatus, RATING_VALUES } from '../../const';

const MIN_TEXTAREA_CHARACTERS = 50;
const MAX_TEXTAREA_CHARACTERS = 300;

const isRatingValue = (value: string): value is RatingValue =>
  (RATING_VALUES as readonly string[]).includes(value);

export default function ReviewsForm(): JSX.Element {
  const authenticationStatus = useAppSelector(getAuthenticationStatus);
  const [userRating, setUserRating] = useState<RatingValue | null>(null);
  const [userReviewText, setUserReviewText] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);

  if (authenticationStatus !== AuthenticationStatus.Auth) {
    return <span>Sign in to leave a review.</span>;
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // TODO, добавить обработку ошибки отправки

    const isUserRating = userRating === null;
    const isMinCharacters = userReviewText.length < MIN_TEXTAREA_CHARACTERS;

    setIsSubmitDisabled(isUserRating || isMinCharacters);

    if (isUserRating) {
      toast.warn('Leave your rating star of this offer.');
      return;
    }

    if (
      userReviewText.length < MIN_TEXTAREA_CHARACTERS ||
      userReviewText.length > MAX_TEXTAREA_CHARACTERS
    ) {
      toast.warn(
        `
          The review text should be between ${MIN_TEXTAREA_CHARACTERS} and
          ${MAX_TEXTAREA_CHARACTERS} characters long. Current review text
          length is ${userReviewText.length}.
        `,
      );
      return;
    }
  };

  const handleReviewText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.currentTarget.value;
    setIsSubmitDisabled(false);
    setUserReviewText(value);
  };

  const handleRatingChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    if (!isRatingValue(value)) {
      return;
    }
    setIsSubmitDisabled(false);
    setUserRating(value);
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING_VALUES.toReversed().map((value) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width="37" height="33">
                <use href="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      {/* TODO к реализации.
        3. Практический пример из твоего проекта
          Допустим, пользователь отправляет форму отзыва.
          const handleSubmit = async () => {
            try {
              await dispatch(sendCommentAction({
                offerId,
                comment,
                rating,
              })).unwrap();

              // Только если сервер успешно принял отзыв:
              setComment('');

            } catch (error) {
              // Ошибка отправки.
              // Текст отзыва останется в textarea.
            }
          };


          Здесь .unwrap() особенно полезен: ты очищаешь форму только после успешной отправки.

          Без .unwrap() пришлось бы самостоятельно проверять:
          const result = await dispatch(sendCommentAction(data));

          if (sendCommentAction.fulfilled.match(result)) {
            setComment('');
          }

          4. Когда применять .unwrap()?
Я бы использовал его в следующих ситуациях:
- Отправка формы авторизации.
- Отправка комментария.
- Удаление или добавление предложения в избранное, когда дальнейшее действие зависит от успеха запроса.
- Любые операции, после которых нужно выполнить дополнительные действия только при успешном ответе сервера.
      */}
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleReviewText}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
