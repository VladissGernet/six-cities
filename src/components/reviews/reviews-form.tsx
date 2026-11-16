// Components.
import ReviewsContent from './reviews-content';

// Store.
import { getSelectedOffer } from '../../store/selected-offer/selected-offer.selectors';
import { getAuthenticationStatus } from '../../store/user/user.selectors';

// Hooks.
import { useAppSelector } from '../../hooks/redux';
import { useReviewsForm } from '../../hooks/reviews/use-reviews-form';

// Const.
import { AuthenticationStatus } from '../../const';

export default function ReviewsForm(): JSX.Element | null {
  const authenticationStatus = useAppSelector(getAuthenticationStatus);
  const selectedOffer = useAppSelector(getSelectedOffer);

  const formProps = useReviewsForm(selectedOffer);

  if (!selectedOffer) {
    return null;
  }

  if (authenticationStatus !== AuthenticationStatus.Auth) {
    return <span>Sign in to leave a review.</span>;
  }

  return <ReviewsContent {...formProps} />;
}
