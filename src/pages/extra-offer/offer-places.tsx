import cn from 'classnames';

// Components.
import Container from '../../components/container/container';
import Places from '../../components/places/places';
import Loader from '../../components/loader/loader';

// Selectors.
import { useAppSelector } from '../../hooks/redux';
import {
  getIsNearbyLoading,
  getNearbyErrorMessage,
  getNearOffers,
} from '../../store/extra-offer/extra-offer.selectors';

// Const.
import { MAX_EXTRA_OFFER_PLACES } from '../../const';

// Styles.
import styles from './offer.module.css';

export default function OfferPlaces(): JSX.Element | null {
  const nearOffers = useAppSelector(getNearOffers);
  const isNearbyLoading = useAppSelector(getIsNearbyLoading);
  const nearbyErrorMessage = useAppSelector(getNearbyErrorMessage);

  if (isNearbyLoading) {
    return (
      <Container>
        <Loader text="Loading nearby offers" />
      </Container>
    );
  }

  if (nearbyErrorMessage) {
    return (
      <Container>
        <p className="offer__text">
          Failed to load nearby offers. {nearbyErrorMessage}
        </p>
      </Container>
    );
  }

  if (!nearOffers) {
    return (
      <Container>
        <p className="offer__text">There are no nearby offers.</p>
      </Container>
    );
  }

  return (
    <Container className={cn('container', styles['offer__places-container'])}>
      <Places
        rootClassName={cn('near-places', styles['offer__places-content'])}
        title="Other places in the neighborhood"
        titleClassName="near-places__title"
        groupedOffersByCity={nearOffers.slice(0, MAX_EXTRA_OFFER_PLACES)}
      />
    </Container>
  );
}
