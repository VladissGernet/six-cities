// Components.
import Loader from '../../components/loader/loader';
import Reviews from '../../components/reviews/reviews';

// Selectors.
import { useAppSelector } from '../../hooks/redux';
import {
  getComments,
  getCommentsErrorMessage,
  getIsCommentsLoading,
} from '../../store/selectors/offer';

export default function OfferReviews(): JSX.Element {
  const comments = useAppSelector(getComments);
  const isCommentsLoading = useAppSelector(getIsCommentsLoading);
  const commentsErrorMessage = useAppSelector(getCommentsErrorMessage);

  if (isCommentsLoading) {
    return (
      <section className="reviews">
        <h2 className="reviews__title">
          <Loader text="Loading reviews" />
        </h2>
      </section>
    );
  }

  if (commentsErrorMessage) {
    return (
      <section className="reviews">
        <h2 className="reviews__title">
          Failed to load comments. {commentsErrorMessage}
        </h2>
      </section>
    );
  }

  return <Reviews className={'offer__reviews'} comments={comments} />;
}
