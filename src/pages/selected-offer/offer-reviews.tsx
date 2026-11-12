import type { PropsWithChildren } from 'react';

// Components.
import Loader from '../../components/loader/loader';
import Reviews from '../../components/reviews/reviews';

// Selectors.
import { useAppSelector } from '../../hooks/redux';
import {
  getComments,
  getCommentsErrorMessage,
  getIsCommentsLoading,
} from '../../store/selected-offer/selected-offer.selectors';

function OfferReviewsTemplate({ children }: PropsWithChildren): JSX.Element {
  return (
    <section className="reviews">
      <h2 className="reviews__title">{children}</h2>
    </section>
  );
}

export default function OfferReviews(): JSX.Element {
  const comments = useAppSelector(getComments);
  const isCommentsLoading = useAppSelector(getIsCommentsLoading);
  const commentsErrorMessage = useAppSelector(getCommentsErrorMessage);

  if (isCommentsLoading) {
    return (
      <OfferReviewsTemplate>
        <Loader text="Loading reviews" />
      </OfferReviewsTemplate>
    );
  }

  if (commentsErrorMessage) {
    return (
      <OfferReviewsTemplate>
        Failed to load comments. {commentsErrorMessage}
      </OfferReviewsTemplate>
    );
  }

  return <Reviews className={'offer__reviews'} comments={comments} />;
}
