import React, { useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

const libraries = ["places"];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const MapDisplay = ({ pathCoordinates }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCWiXP0siw3gQQqwywc7qATi9ChuStiJwo', // Replace with your API key
    libraries,
  });

  const mapRef = useRef(null);
  const polylineRef = useRef(null);

  useEffect(() => {
    const drawPolyline = () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null); // Remove the previous polyline
      }
      polylineRef.current = new window.google.maps.Polyline({
        path: pathCoordinates,
        geodesic: true,
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });
      polylineRef.current.setMap(mapRef.current); // Draw the new polyline
    };

    if (isLoaded && mapRef.current && pathCoordinates.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      pathCoordinates.forEach((coord) => bounds.extend(coord));
      mapRef.current.fitBounds(bounds);
      drawPolyline();
    }
  }, [isLoaded, pathCoordinates]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={pathCoordinates.length ? pathCoordinates[0] : { lat: 0, lng: 0 }}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    />
  );
};

export default MapDisplay;
