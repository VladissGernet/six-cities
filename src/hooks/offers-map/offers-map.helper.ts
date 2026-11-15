import { Icon, IconOptions, Marker } from 'leaflet';

// Types.
import type { LayerGroup } from 'leaflet';
import type { OfferId, OfferLocation, Offers } from '../../types/offers';

// Custom map pins.
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
  offers?: Offers;
  layerGroup: LayerGroup;
  selectedMarkerLocation?: OfferLocation;
};

const renderMapMarkersLayer = ({
  offers,
  layerGroup,
  selectedMarkerLocation,
}: MapMarkersLayerProps) => {
  const markersMap = new Map<OfferId, Marker>();
  // Добавление меток на слой карты.
  if (offers && offers.length) {
    offers.forEach(({ location, id }) => {
      const marker = new Marker(
        {
          lat: location.latitude,
          lng: location.longitude,
        },
        {
          icon: defaultCustomIcon,
        },
      );

      marker.addTo(layerGroup);
      markersMap.set(id, marker);
    });
  }

  // Добавление опционной точки на слой карты.
  // Используется для отображения выбранного офера
  // страницы offer/:id.
  if (selectedMarkerLocation) {
    const marker = new Marker(
      {
        lat: selectedMarkerLocation.latitude,
        lng: selectedMarkerLocation.longitude,
      },
      {
        icon: selectedCustomIcon,
      },
    );

    marker.addTo(layerGroup);
  }

  return markersMap;
};

export { renderMapMarkersLayer, defaultCustomIcon, selectedCustomIcon };
