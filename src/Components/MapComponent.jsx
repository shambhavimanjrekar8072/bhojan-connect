import React,{useState, useEffect, useMemo} from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import NavigationBar from "./Navigation_Bar/NavigationBar";
import "./MapComponent.css";

const mapContainerStyle = {
    width: '100%',
    height: '65vh',
};

const foodBankLocations = [
    {
        name: 'Community Kitchen Sudama Nagar', 
        lat:22.696427645417984, 
        lng:75.8348732669297,
        address:'610, Opp. Sudama Dwar, Usha Nagar, Indore, Madhya Pradesh 452009',
        portions: 20
    },
    {
        name: 'Food Bank Bada Ganpati', 
        lat:22.72078498604519, 
        lng:75.84138496797306,
        address:'Malharganj',
        portions: 15
    },
    {
        name: 'Food Bank Old Palasia', 
        lat:22.721687138861796, 
        lng: 75.87852087504457,
        address:'11, Mahatma Gandhi Rd, South Tukoganj, Indore, Madhya Pradesh 452001',
        portions:25
    },
    {
        name: 'Food Bank Collector Office', 
        lat:22.700262332122293, 
        lng: 75.84705128095499,
        address:'PR2W+2RH, Nai Duniya, Revenue Colony, Indira Gandhi Nagar, Indore, Madhya Pradesh 452009',
        portions:12
    },
    {
        name:'Food Bank Vijay Nagar', 
        lat:22.745313963659342, 
        lng:75.89225916746516,
        address:'10th Floor, Airen Heights, AB Rd, opp. c21 mall, Behind Pakiza Mall, LIG Colony, Indore, Madhya Pradesh 452010',
        portions:10
    }
];

function MapComponent(){
    const{isLoaded, loadError} = useLoadScript({
        googleMapsApiKey : "AIzaSyAkUyYQPfzufRUrg3BUHlgpS4G_EL0qNXY",
    });

    const[userLocation, setUserLocation] = useState(null);

    const center = useMemo(() => {
    if (userLocation) {
      return { lat: userLocation.latitude, lng: userLocation.longitude };
    }

    return {lat:22.7196, lng:75.8577};
},[userLocation]);

    useEffect(() => {
        if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    },[]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;

    return(
        <div>
      {/* Display a message if location is not yet available */}
      {!userLocation && <p>Getting your location...</p>}
      
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        mapTypeId="roadmap" 
      >
        {userLocation && (
          <Marker position={{ lat: userLocation.latitude, lng: userLocation.longitude }} 
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }}
          />
        )}

        {foodBankLocations.map((location, index) => (
        <Marker key={index} position={location} />
      ))}
      </GoogleMap>
        <div className="d-flex flex-column justify-content-center align-items-center mt-1 list-container pt-2">
        <h2 className="fw-bold py-3">Food Banks Near You</h2>
        <ul>
          {foodBankLocations.map((bank, index) => (
            <li key={index} className="list-item-styling pt-2 pb-0 px-2 my-3">
             <div>
              <h4 className="fw-bold"><i>{bank.name}</i></h4>
              <p>{bank.address}</p>
              <h6>
                <i><b>Available Portions :</b> {bank.portions}</i>
                </h6>
                </div>
            <div className="text-center d-flex justify-content-end">
            <button className="p-2 mb-2 book-styling">Book Portion</button>
            </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
    )
}


export default MapComponent;