// Components.
import Container from '../../components/container/container';
import OffersMap from '../../components/offers-map/offers-map';

// Selectors.
import { useAppSelector } from '../../hooks/redux';
import {
  getSelectedOffer,
  getNearOffers,
} from '../../store/selected-offer/selected-offer.selectors';

// Const.
import { MAX_SELECTED_OFFER_PLACES } from '../../const';

export default function OfferMap(): JSX.Element | null {
  const nearOffers = useAppSelector(getNearOffers);
  const selectedOffer = useAppSelector(getSelectedOffer);

  if (!selectedOffer?.location) {
    return null;
  }

  if (!nearOffers) {
    return (
      <Container>
        <OffersMap
          rootClassName="offer__map"
          selectedMarkerLocation={selectedOffer.location}
        />
      </Container>
    );
  }

  return (
    <Container>
      <OffersMap
        rootClassName="offer__map"
        offers={nearOffers.slice(0, MAX_SELECTED_OFFER_PLACES)}
        selectedMarkerLocation={selectedOffer.location}
      />
    </Container>
  );
}
