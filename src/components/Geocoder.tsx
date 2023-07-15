import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { FC } from 'react';
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';

import { GeocoderType } from '@/types';

const Geocoder: FC<GeocoderType> = ({ setviewport, viewport }) => {
  const ctrl = new MapBoxGeocoder({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_KEY!,
    marker: false,
    collapsed: false,
  });

  useControl(() => ctrl);
  ctrl.on('result', (e) => {
    const coords = e.result.geometry.coordinates;
    setviewport({
      ...viewport,
      longitude: coords[0],
      latitude: coords[1],
      zoom: 10,
    });
  });

  return null;
};

export default Geocoder;
