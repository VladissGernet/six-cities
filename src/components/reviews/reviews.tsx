import cn from 'classnames';
import type { Comments } from '../../types/offers';

// Components.
import ReviewsForm from './reviews-form';
import ReviewsList from './reviews-list';

type ReviewsProps = {
  className?: string;
  comments: Comments | null;
};

export default function Reviews({
  className,
  comments,
}: ReviewsProps): JSX.Element {
  const sectionClassName = className ? cn(className, 'reviews') : 'reviews';

  if (!comments || comments.length <= 0) {
    return (
      <section className={sectionClassName}>
        <h2 className="reviews__title">There are no reviews yet.</h2>
        <ReviewsForm />
      </section>
    );
  }

  return (
    <section className={sectionClassName}>
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ReviewsList comments={comments} />
      <ReviewsForm />
    </section>
  );
}
