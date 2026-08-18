import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Map, TileLayer, layerGroup, Marker, Icon } from 'leaflet';
import { MapConfig, CustomIcon } from '../../const';
import { Offers, Location } from '../../types/offers';

type UseMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  groupedPlaces: Offers;
  selectedOfferLocation: Location | null;
};

const defaultCustomIcon = new Icon(CustomIcon.Default);
const currentCustomIcon = new Icon(CustomIcon.Active);

export default function useMap({
  mapRef,
  latitude = MapConfig.DefaultPosition.Latitude,
  longitude = MapConfig.DefaultPosition.Longitude,
  zoom = MapConfig.DefaultPosition.Zoom,
  groupedPlaces,
  selectedOfferLocation,
}: UseMapProps): Map | null {
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

      const layer = new TileLayer(MapConfig.Tile, {
        attribution: MapConfig.Attribution,
      });

      instance.addLayer(layer);
      setMapInstance(instance);
      isRenderedRef.current = true;

      const markerLayer = layerGroup();
      groupedPlaces.forEach(({ location }) => {
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
      markerLayer.addTo(instance);

      return () => {
        markerLayer.remove();
        instance.remove();
        setMapInstance(null);
        isRenderedRef.current = false;
      };
    }
  }, [mapRef, latitude, longitude, zoom, groupedPlaces, selectedOfferLocation]);

  return mapInstance;
}
