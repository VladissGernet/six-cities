import { layerGroup, Marker, Icon, Map } from 'leaflet';
import { useEffect } from 'react';

import { CustomIcon } from '../../const';
import { Offers, Location } from '../../types/offers';

const defaultCustomIcon = new Icon(CustomIcon.Default);
const currentCustomIcon = new Icon(CustomIcon.Active);

export default function useMapMarkerLayer(
  map: Map | null,
  offers: Offers,
  selectedOfferLocation: Location | null,
) {
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup();
      offers.forEach(({ location }) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker.setIcon(defaultCustomIcon).addTo(markerLayer);
      });

      if (selectedOfferLocation) {
        const marker = new Marker({
          lat: selectedOfferLocation.latitude,
          lng: selectedOfferLocation.longitude,
        });
        marker.setIcon(currentCustomIcon).addTo(markerLayer);
      }
      markerLayer.addTo(map);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOfferLocation]);
}
