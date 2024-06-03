import React, { useState } from 'react';
import SourceDestinationForm from './SourceDestinationForm';
import MapDisplay from './MapDisplay';
import NavBar from './NavBar';
import Mileage from './Mileage';

const App = () => {
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [directionsInfo, setDirectionsInfo] = useState({ distance: '', duration: '' });
  const [error, setError] = useState(null);

  const handleSubmit = ({ source, destination }) => {
    setError(null);  // Clear previous error
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: source,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          const path = result.routes[0].overview_path.map((p) => ({
            lat: p.lat(),
            lng: p.lng(),
          }));
          setPathCoordinates(path);

          const distance = result.routes[0].legs[0].distance.text;
          const duration = result.routes[0].legs[0].duration.text;
          setDirectionsInfo({ distance, duration });
        } else {
          console.error(`Error fetching directions: ${status}`);
          if (status === window.google.maps.DirectionsStatus.ZERO_RESULTS) {
            setError("No route could be found between the source and destination.");
          } else if (status === window.google.maps.DirectionsStatus.NOT_FOUND) {
            setError("Click submit (or)  locaiton(s) not found!");
          } else {
            setError(`Error fetching directions: ${status}`);
          }
        }
      }
    );
  };

  return (
    <>
     <NavBar/>
    <div className='container-fluid' style={{height:'100vh', width:'100%'}}>  
   
      <div style={{padding:"1%"}}>
      <SourceDestinationForm onSubmit={handleSubmit} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div style={{padding:"1%"}}>
      <MapDisplay pathCoordinates={pathCoordinates} />
      </div>
      <div className='container' style ={ {textAlign : 'center'}}>
        <p><b>Distance: </b>{directionsInfo.distance ? directionsInfo.distance : "- - " }</p>
        <p><b>Duration:</b> {directionsInfo.duration ? directionsInfo.duration : "- -"}</p>
        <Mileage distance = {directionsInfo.distance.split(" ")[0].replace(",","" )} />
      
      </div>
    </div>
    </>

  );
};

export default App;
