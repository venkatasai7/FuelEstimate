import React, { useRef } from 'react';
import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ["places"];

const AutocompleteSearch = ({ onPlaceSelected }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCWiXP0siw3gQQqwywc7qATi9ChuStiJwo',
    libraries,
  });

  const searchBoxRef = useRef(null);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places === 0) return;

    const place = places[0];
    onPlaceSelected(place);
  };

  return (
    <div>
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          type="text"
          placeholder="Search for a location"
          style={{
            boxSizing: 'border-box',
            border: '1px solid transparent',
            width: '100%',
            height: '40px',
            padding: '0 12px',
            borderRadius: '3px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            fontSize: '14px',
            outline: 'none',
            textOverflow: 'ellipses',
          }}
        />
      </StandaloneSearchBox>
    </div>
  );
};

export default AutocompleteSearch;
