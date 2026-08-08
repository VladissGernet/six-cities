import { useEffect, useRef } from 'react';

import cn from 'classnames';
import { Offers } from '../../types/offers';
import { Map as LeafletMap, TileLayer, Icon } from 'leaflet';

import { MAP_CONFIG, CUSTOM_ICON } from '../../const';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  rootClassName: string;
  offers: Offers;
};

const defaultCustomIcon = new Icon(CUSTOM_ICON.DEFAULT);

const currentCustomIcon = new Icon(CUSTOM_ICON.ACTIVE);

export default function Map({ rootClassName, offers }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  console.log(defaultCustomIcon);

  // Добавление карты.
  useEffect(() => {
    if (mapRef.current === null) {
      return;
    }

    /* Координаты и zoom текущего города. */
    const { latitude, longitude, zoom } = offers[0].city.location;

    const map = new LeafletMap(mapRef.current, {
      center: [latitude, longitude],
      zoom: zoom,
    });

    const layer = new TileLayer(MAP_CONFIG.TILE, {
      attribution: MAP_CONFIG.ATTRIBUTION,
    });

    map.addLayer(layer);

    return () => {
      map.remove();
    };
  }, [offers]);

  return <section className={cn(rootClassName, 'map')} ref={mapRef} />;
}
