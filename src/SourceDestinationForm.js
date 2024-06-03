import React, { useRef } from 'react';
import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ["places"];

const SourceDestinationForm = ({ onSubmit }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCWiXP0siw3gQQqwywc7qATi9ChuStiJwo',
    libraries,
  });

  const sourceRef = useRef(null);
  const destinationRef = useRef(null);

  const handlePlacesChanged = (ref, setter) => {
    const places = ref.current.getPlaces();
    console.log('places', places);
    if (!places || places.length === 0) {
      console.error('No places found or search box not initialized');
      return;
    }

    const place = places[0].formatted_address;
    setter(place);
  };

  const [source, setSource] = React.useState('');
  const [destination, setDestination] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (source && destination) {
      onSubmit({ source, destination });
    } else {
      //alert('Both source and destination are required.');
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <form onSubmit={handleSubmit}>
      <StandaloneSearchBox
        onLoad={(ref) => (sourceRef.current = ref)}
        onPlacesChanged={() => handlePlacesChanged(sourceRef, setSource)}
      >
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Source"
          style={{ width: '100%', height: '40px', marginBottom: '10px' }}
        />
      </StandaloneSearchBox>
      <StandaloneSearchBox
        onLoad={(ref) => (destinationRef.current = ref)}
        onPlacesChanged={() => handlePlacesChanged(destinationRef, setDestination)}
      >
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          style={{ width: '100%', height: '40px', marginBottom: '10px' }}
        />
      </StandaloneSearchBox>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SourceDestinationForm;
