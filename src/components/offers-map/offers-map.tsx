// General.
import cn from 'classnames';
import { useRef } from 'react';

// Hooks.
import { useAppSelector } from '../../hooks/redux';
import { useOffersMap } from '../../hooks/offers-map/use-offers-map';
import { useMarkers } from '../../hooks/offers-map/use-markers';
import { useActiveMarker } from '../../hooks/offers-map/use-active-marker';

// Selectors.
import {
  getActiveMapMarkerId,
  getCity,
  getGroupedOffers,
} from '../../store/offers/offers.selectors';

// Leaflet.
import 'leaflet/dist/leaflet.css';

// Types.
import type { OfferId, OfferLocation, Offers } from '../../types/offers';
import type { ActiveMapMarkerId } from '../../types/general';

type OffersMapProps = {
  rootClassName: string;
  /** Только определенные предложения. */
  offers?: Offers;
  selectedMarkerLocation?: OfferLocation;
};

export default function OffersMap({
  rootClassName,
  offers,
  selectedMarkerLocation,
}: OffersMapProps): JSX.Element | null {
  const currentCity = useAppSelector(getCity);
  const groupedOffers = useAppSelector(getGroupedOffers);

  // Получаем сгруппированные предложения по одному городу.
  // У всех предложений будет одинаковый offers[n].city.location.
  const cityLocation =
    groupedOffers[currentCity] && groupedOffers[currentCity][0].city.location;

  const mapContainerRef = useRef<HTMLElement | null>(null);
  const offersMap = useOffersMap({
    mapContainerRef,
    latitude: cityLocation?.latitude,
    longitude: cityLocation?.longitude,
    zoom: cityLocation?.zoom,
  });

  // Добавление меток на карту и сохранение их в коллекцию.
  const markers = useMarkers({
    offersMap,
    offers,
    selectedMarkerLocation,
  });

  // Получение id для выделения точки на карте при наведении на offer.
  const activeMarkerId = useAppSelector<ActiveMapMarkerId>(
    getActiveMapMarkerId,
  ) as OfferId;

  // Обновление иконки маркера на карте при наведении на offer.
  useActiveMarker({
    markers,
    activeMarkerId,
  });

  if (!selectedMarkerLocation && !offers?.length) {
    return null;
  }

  return <section className={cn(rootClassName, 'map')} ref={mapContainerRef} />;
}
