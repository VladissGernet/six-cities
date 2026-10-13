import { Icon, layerGroup, Marker, type Map } from 'leaflet';
import { CustomIcon } from '../../const';
import type { offerId, Offers } from '../../types/offers';
import type { MapMarkers } from '../../types/general';

const defaultCustomIcon = new Icon(CustomIcon.Default);
const selectedCustomIcon = new Icon(CustomIcon.Active);

const renderMapMarkersLayer = (
  groupedPlaces: Offers,
  map: Map | null,
  mapMarkers: MapMarkers,
  activeMarkerId: offerId | null,
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

    markerLayer.addTo(map);
  }
};

export { renderMapMarkersLayer };
