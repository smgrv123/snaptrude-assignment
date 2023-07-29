import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';

import Map, { Marker, GeolocateControl, MapRef } from 'react-map-gl';
import { toPng } from 'html-to-image';

import { ViewPortTypes } from '@/types';
import Geocoder from '../components/Geocoder';
import NavigationButton from '../components/NavigationButton';
import Rendered from '@/components/rendered';

function App() {
  const apiKey = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
  const mapStyle = 'mapbox://styles/mapbox/navigation-night-v1';

  const mapRef = useRef<MapRef>(null);
  const scrollUpRef = useRef(null);
  const scrollDownRef = useRef(null);

  const [mapScreenShot, setmapScreenShot] = useState('');

  const [viewport, setviewport] = useState<ViewPortTypes>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setviewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);

  const handleSnapshot = async () => {
    // @ts-ignore
    const imageString = await toPng(mapRef.current.getCanvas());
    setmapScreenShot(imageString);
    setTimeout(
      // @ts-ignore
      () => scrollDownRef.current?.scrollIntoView({ behavior: 'smooth' }),
      50
    );
  };

  const MapComponent = ({ viewport }: { viewport: ViewPortTypes }) => {
    return (
      <Map
        ref={mapRef}
        preserveDrawingBuffer={true}
        {...viewport}
        mapStyle={mapStyle}
        mapboxAccessToken={apiKey}
        style={{ height: '50rem', borderRadius: '5px' }}
        maxZoom={20}
        minZoom={7}
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
    );
  };

  return (
    <>
      <div ref={scrollUpRef}>
        <MapComponent viewport={viewport} />
      </div>
      <div className="flex justify-center items-center my-3">
        <NavigationButton onClick={handleSnapshot} buttonText="Capture Map" />
      </div>
      <div ref={scrollDownRef}>
        {mapScreenShot && (
          <Rendered
            imageString={mapScreenShot}
            onButtonClick={() =>
              // @ts-ignore
              scrollUpRef.current.scrollIntoView({ behavior: 'smooth' })
            }
          />
        )}
      </div>
    </>
  );
}

export default App;
