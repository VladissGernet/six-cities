// Components.
import Container from '../../components/container/container';
import OffersMap from '../../components/offers-map/offers-map';

// Selectors.
import { useAppSelector } from '../../hooks/redux';
import {
  getExtraOffer,
  getNearOffers,
} from '../../store/extra-offer/extra-offer.selectors';

// Const.
import { MAX_EXTRA_OFFER_PLACES } from '../../const';

export default function OfferMap(): JSX.Element | null {
  const nearOffers = useAppSelector(getNearOffers);
  const extraOffer = useAppSelector(getExtraOffer);

  if (!extraOffer?.location) {
    return null;
  }

  if (!nearOffers) {
    return (
      <Container>
        <OffersMap
          rootClassName="offer__map"
          selectedMarkerLocation={extraOffer.location}
        />
      </Container>
    );
  }

  return (
    <Container>
      <OffersMap
        rootClassName="offer__map"
        offers={nearOffers.slice(0, MAX_EXTRA_OFFER_PLACES)}
        selectedMarkerLocation={extraOffer.location}
      />
    </Container>
  );
}
