import { Icon, layerGroup, Marker } from 'leaflet';
import cn from 'classnames';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/use-map';
import { Offers, Location } from '../../types/offers';
import { CustomIcon } from '../../const';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  rootClassName: string;
  offers: Offers;
  selectedOfferLocation?: Location | null;
};

const defaultCustomIcon = new Icon(CustomIcon.Default);
const currentCustomIcon = new Icon(CustomIcon.Active);

export default function Map({
  rootClassName,
  offers,
  selectedOfferLocation = null,
}: MapProps): JSX.Element | null {
  // Получаем сгруппированные предложения по одному городу.
  // У всех предложений будет одинаковый offers[n].city.location.
  const { latitude, longitude, zoom } = offers[0].city.location;

  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap({ mapRef, latitude, longitude, zoom });

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

  return offers.length ? (
    <section className={cn(rootClassName, 'map')} ref={mapRef} />
  ) : null;
}
