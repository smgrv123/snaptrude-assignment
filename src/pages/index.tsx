import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';

import Map, { Marker, GeolocateControl, MapRef } from 'react-map-gl';
import { toPng } from 'html-to-image';

import { useAppDispatch } from '@/redux/store';
import { setImageString } from '@/redux/imageSlice';

import Geocoder from '../components/GeoCoderSearch';
import NavigationButton from '../components/NavigationButton';

function App() {
  const apiKey = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  const mapStyle = 'mapbox://styles/mapbox/navigation-night-v1';

  const mapRef = useRef<MapRef>(null);

  const dispatch = useAppDispatch();

  const [viewport, setviewport] = useState<{
    latitude: number;
    longitude: number;
    zoom: number;
  }>({ latitude: 0, longitude: 0, zoom: 3 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setviewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        zoom: 10,
      });
    });
  }, []);

  const handleSnapshot = async () => {
    // @ts-ignore
    const imageString = await toPng(mapRef.current.getCanvas());
    dispatch(setImageString(imageString));
  };

  return (
    <>
      <Map
        ref={mapRef}
        preserveDrawingBuffer={true}
        {...viewport}
        mapStyle={mapStyle}
        mapboxAccessToken={apiKey}
        style={{ height: '50rem', borderRadius: '5px' }}
      >
        <Marker
          draggable
          onDragEnd={(e) =>
            setviewport({
              ...viewport,
              longitude: e.lngLat.lng,
              latitude: e.lngLat.lat,
            })
          }
          {...viewport}
        />
        <Geocoder setviewport={setviewport} viewport={viewport} />
        <GeolocateControl
          position="top-left"
          onGeolocate={(e) =>
            setviewport({
              ...viewport,
              longitude: e.coords.longitude,
              latitude: e.coords.latitude,
            })
          }
          showUserLocation
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
        />
      </Map>
      <div className="flex justify-center items-center my-3">
        <NavigationButton
          onClick={handleSnapshot}
          buttonText="Capture Map"
          hrefPathname="/capturedImage"
        />
      </div>
    </>
  );
}

export default App;
