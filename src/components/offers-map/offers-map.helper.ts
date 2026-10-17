import { Icon, layerGroup, Marker, IconOptions, type Map } from 'leaflet';
import type { offerId, OfferLocation, Offers } from '../../types/offers';
import type { MapMarkers } from '../../types/general';

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

const renderMapMarkersLayer = (
  groupedPlaces: Offers,
  map: Map | null,
  mapMarkers: MapMarkers,
  activeMarkerId: offerId | null,
  selectedMarkerLocation?: OfferLocation | undefined,
): void => {
  if (map) {
    mapMarkers.clear();
    const markerLayer = layerGroup();

    groupedPlaces.forEach(({ location, id }) => {
      const marker = new Marker({
        lat: location.latitude,
        lng: location.longitude,
      });

      mapMarkers.set(id, marker);

      if (id === activeMarkerId) {
        marker.setIcon(selectedCustomIcon);
      } else {
        marker.setIcon(defaultCustomIcon);
      }
      marker.addTo(markerLayer);
    });

    if (selectedMarkerLocation) {
      const marker = new Marker({
        lat: selectedMarkerLocation.latitude,
        lng: selectedMarkerLocation.longitude,
      });

      if (activeMarkerId === null) {
        marker.setIcon(selectedCustomIcon);
      } else {
        marker.setIcon(defaultCustomIcon);
      }

      marker.addTo(markerLayer);
    }

    markerLayer.addTo(map);
  }
};

export { renderMapMarkersLayer };
