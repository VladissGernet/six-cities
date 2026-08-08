import { useEffect, useState } from 'react';

import cn from 'classnames';
import { Offers } from '../../types/offers';
import { Map, TileLayer } from 'leaflet';

type MapProps = {
  rootClassName: string;
  offers: Offers;
};

export default function Map({ rootClassName, offers }: MapProps): JSX.Element {
  console.log(offers);

  return <section className={cn(rootClassName, 'map')} />;
}
