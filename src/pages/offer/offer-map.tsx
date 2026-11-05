// Components.
import Container from '../../components/container/container';
import OffersMap from '../../components/offers-map/offers-map';

// Selectors.
import { useAppSelector } from '../../hooks/redux';
import { getExtraOffer, getNearOffers } from '../../store/selectors/offer';

// Const.
import { MAX_EXTRA_OFFER_PLACES } from '../../const';

export default function OfferMap(): JSX.Element | null {
  const nearOffers = useAppSelector(getNearOffers);
  const extraOffer = useAppSelector(getExtraOffer);

  if (!nearOffers || !extraOffer?.location) {
    return null;
  }
  // TODO, если предложения поблизости отсутсвуют, то рендер карты
  // без них с location. Если грузятся, то подождать с рендером карты
  // и отобразить лоадер.
  // Остановился на решение проблемы в offerS-map.tsx с offers[n].city.location.
  // Надо придумать другйо способ получения базового location для map.

  // if (!nearOffers) {
  //   return (
  //     <Container>
  //       <OffersMap
  //         rootClassName="offer__map"
  //         offers={[]}
  //         selectedMarkerLocation={extraOffer.location}
  //       />
  //     </Container>
  //   );
  // }

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
