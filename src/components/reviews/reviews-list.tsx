import cn from 'classnames';
import Rating from '../rating/rating';

import type { Comments } from '../../types/offers';

import styles from './reviews.module.css';
import { useState, type MouseEventHandler } from 'react';

type ReviewsListProps = {
  comments: Comments;
};

const monthYearFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const MAX_SHOWING_COMMENTS = 10;

export default function ReviewsList({
  comments,
}: ReviewsListProps): JSX.Element {
  const [showingCommentsValue, setShowingCommentsValue] =
    useState<number>(MAX_SHOWING_COMMENTS);

  const isInitialShowMoreVisible = comments.length > MAX_SHOWING_COMMENTS;
  const [isShowMoreVisible, setIsShowMoreVisible] = useState<boolean>(
    isInitialShowMoreVisible,
  );

  const showingComments = comments.slice(0, showingCommentsValue);

  const handleShowMore: MouseEventHandler = (evt) => {
    evt.preventDefault();

    setShowingCommentsValue((prevValue) => {
      const newShowingCommentsValue = prevValue + MAX_SHOWING_COMMENTS;
      if (newShowingCommentsValue >= comments.length) {
        setIsShowMoreVisible(false);
      }
      return newShowingCommentsValue;
    });
  };

  return (
    <>
      <ul className="reviews__list">
        {showingComments.map((item) => {
          const { id, date, user, comment, rating } = item;
          const { avatarUrl, isPro, name } = user;

          const formattedDate = monthYearFormatter.format(new Date(date));
          const avatarClassName = cn(
            'reviews__avatar-wrapper',
            isPro && styles['reviews__avatar-wrapper--pro'],
            'user__avatar-wrapper',
          );

          return (
            <li key={id} className="reviews__item">
              <div className="reviews__user user">
                <div className={avatarClassName}>
                  <img
                    className="reviews__avatar user__avatar"
                    src={avatarUrl}
                    width="54"
                    height="54"
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">{name}</span>
                {isPro && <span className="reviews__user-status">Pro</span>}
              </div>
              <div className="reviews__info">
                <Rating
                  rating={rating}
                  rootClassName="reviews__rating"
                  starsWrapperClassName="reviews__stars"
                  showValue={false}
                />
                <p className="reviews__text">{comment}</p>
                <time className="reviews__time" dateTime={date}>
                  {formattedDate}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
      {isShowMoreVisible && (
        <button
          className={cn('button', styles['reviews__show-more'])}
          onClick={handleShowMore}
          type="button"
        >
          Show more
        </button>
      )}
    </>
  );
}
