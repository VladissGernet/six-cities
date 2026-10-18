import { Icon, IconOptions, type LayerGroup, Marker } from 'leaflet';
import type { OfferId, OfferLocation, Offers } from '../../types/offers';

import pin from '/img/pin.svg';
import pinActive from '/img/pin-active.svg';

const CustomIcon: Record<'Default' | 'Active', IconOptions> = {
  Default: {
    iconUrl: pin,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
  },
  Active: {
    iconUrl: pinActive,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
  },
};

const defaultCustomIcon = new Icon(CustomIcon.Default);
const selectedCustomIcon = new Icon(CustomIcon.Active);

type MapMarkersLayerProps = {
  offers: Offers;
  layerGroup: LayerGroup;
  activeMarkerId: OfferId | null;
  selectedMarkerLocation?: OfferLocation;
};

const renderMapMarkersLayer = ({
  offers,
  layerGroup,
  activeMarkerId,
  selectedMarkerLocation,
}: MapMarkersLayerProps): void => {
  // Добавление меток на слой карты.
  offers.forEach(({ location, id }) => {
    const marker = new Marker(
      {
        lat: location.latitude,
        lng: location.longitude,
      },
      {
        icon: id === activeMarkerId ? selectedCustomIcon : defaultCustomIcon,
      },
    );
    marker.addTo(layerGroup);
  });

  // Добавление опционной точки на слой карты.
  // Используется для отображения выбранного оффера
  // страницы offer/:id.
  if (selectedMarkerLocation) {
    const marker = new Marker(
      {
        lat: selectedMarkerLocation.latitude,
        lng: selectedMarkerLocation.longitude,
      },
      {
        icon: activeMarkerId === null ? selectedCustomIcon : defaultCustomIcon,
      },
    );

    marker.addTo(layerGroup);
  }
};

export { renderMapMarkersLayer };
