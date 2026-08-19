import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';
import { OffersMapConfig } from '../../const';
import { Offers } from '../../types/offers';

type UseOffersMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  groupedPlaces: Offers;
};

export default function useOffersMap({
  mapRef,
  latitude = OffersMapConfig.DefaultPosition.Latitude,
  longitude = OffersMapConfig.DefaultPosition.Longitude,
  zoom = OffersMapConfig.DefaultPosition.Zoom,
  groupedPlaces,
}: UseOffersMapProps): Map | null {
  const [mapInstance, setMapInstance] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  // Добавление карты.
  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom,
      });

      const layer = new TileLayer(OffersMapConfig.Tile, {
        attribution: OffersMapConfig.Attribution,
      });

      instance.addLayer(layer);
      setMapInstance(instance);
      isRenderedRef.current = true;

      return () => {
        instance.remove();
        setMapInstance(null);
        isRenderedRef.current = false;
      };
    }
  }, [mapRef, latitude, longitude, zoom, groupedPlaces]);

  return mapInstance;
}
