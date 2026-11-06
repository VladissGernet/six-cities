// General.
import { useState, Fragment } from 'react';
import { toast } from 'react-toastify';

// Types.
import type { RatingValue } from '../../types/general';
import type { FormEventHandler, ChangeEventHandler } from 'react';

// Store.
import { sendCommentAction } from '../../store/api-actions';
import { getExtraOffer } from '../../store/selectors/offer';
import { getAuthenticationStatus } from '../../store/selectors/authentication';

// Hooks.
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Const.
import { AuthenticationStatus, RATING_VALUES } from '../../const';

// Helper.
import { isRatingValue } from './reviews-form.helper';

const MIN_TEXTAREA_CHARACTERS = 50;
const MAX_TEXTAREA_CHARACTERS = 300;

export default function ReviewsForm(): JSX.Element | null {
  const authenticationStatus = useAppSelector(getAuthenticationStatus);
  const extraOffer = useAppSelector(getExtraOffer);

  const [userRating, setUserRating] = useState<RatingValue | null>(null);
  const [userReviewText, setUserReviewText] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  if (!extraOffer) {
    return null;
  }

  if (authenticationStatus !== AuthenticationStatus.Auth) {
    return <span>Sign in to leave a review.</span>;
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

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
    /* TODO к реализации.
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
                */
    dispatch(
      sendCommentAction({
        comment: userReviewText,
        rating: userRating,
        id: extraOffer.id,
      }),
    );
  };

  const handleReviewText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const value = e.currentTarget.value;
    setIsSubmitDisabled(false);
    setUserReviewText(value);
  };

  const handleRatingChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = Number(e.currentTarget.value);

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
