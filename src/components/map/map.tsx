import { useEffect, useRef } from 'react';

import cn from 'classnames';
import { Offers } from '../../types/offers';
import { Map as LeafletMap, TileLayer } from 'leaflet';

import { MAP_CONFIG } from '../../const';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  rootClassName: string;
  offers: Offers;
};

export default function Map({ rootClassName, offers }: MapProps): JSX.Element {
  console.log(offers);
  const mapRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (mapRef.current === null) {
      return;
    }

    const map = new LeafletMap(mapRef.current, {
      center: [0, 0],
      zoom: 10,
    });

    const layer = new TileLayer(MAP_CONFIG.TILE, {
      attribution: MAP_CONFIG.ATTRIBUTION,
    });

    map.addLayer(layer);

    return () => {
      map.remove();
    };
  }, []);

  return <section className={cn(rootClassName, 'map')} ref={mapRef} />;
}
