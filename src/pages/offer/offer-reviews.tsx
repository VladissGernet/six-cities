import Reviews from '../../components/reviews/reviews';
import { useAppSelector } from '../../hooks/redux';
import { getComments } from '../../store/selectors/offer';

export default function OfferReviews(): JSX.Element {
  const comments = useAppSelector(getComments);

  return <Reviews className={'offer__reviews'} comments={comments} />;
}
