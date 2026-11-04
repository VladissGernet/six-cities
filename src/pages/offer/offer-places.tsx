import cn from 'classnames';

// Components.
import Container from '../../components/container/container';
import Places from '../../components/places/places';

// Selectors.
import { useAppSelector } from '../../hooks/redux';
import { getNearOffers } from '../../store/selectors/offer';

// Const.
import { MAX_EXTRA_OFFER_PLACES } from '../../const';

// Styles.
import styles from './offer.module.css';

export default function OfferPlaces(): JSX.Element | null {
  const nearOffers = useAppSelector(getNearOffers);

  /*
    TODO, добавить обработку ошибки и лоадер.
      state.isNearbyLoading = true;
      state.nearbyOffers = null;
      state.nearbyErrorMessage = null;
  */

  if (!nearOffers) {
    return null;
  }

  return (
    <Container className={cn('container', styles['offer__places-container'])}>
      <Places
        rootClassName={cn('near-places', styles['offer__places-content'])}
        title="Other places in the neighbourhood"
        titleClassName="near-places__title"
        groupedOffersByCity={nearOffers.slice(0, MAX_EXTRA_OFFER_PLACES)}
      />
    </Container>
  );
}
