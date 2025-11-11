import React, { useState, useEffect, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import BookPlates from "./BookPlates";
import FoodCollected from "./FoodCollected";
import "./MapComponent.css";

const mapContainerStyle = {
  width: "100%",
  height: "65vh",
};

function MapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAkUyYQPfzufRUrg3BUHlgpS4G_EL0qNXY",
  });

  const [userLocation, setUserLocation] = useState(null);
  const [foodBanks, setFoodBanks] = useState([]);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ latitude, longitude });
        },
        (err) => console.error("Error getting location:", err)
      );
    }
  }, []);

  // Fetch nearby NGOs only *after* userLocation is available
  useEffect(() => {
    const fetchFoodBanks = async () => {
      if (!userLocation) return;

      try {
        const res = await axios.get(
          `http://localhost:8000/ngo/nearby/search?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`
        );

        if (Array.isArray(res.data.nearbyNGOs)) {
          // Convert API response to have lat/lng for each NGO
          const formatted = res.data.nearbyNGOs.map((ngo) => ({
            ...ngo,
            lat: ngo.location.coordinates[1], // latitude
            lng: ngo.location.coordinates[0], // longitude
          }));
          setFoodBanks(formatted);
        } else {
          setFoodBanks([]);
        }
      } catch (error) {
        console.error("Error fetching food banks:", error);
      }
    };

    fetchFoodBanks();
  }, [userLocation]);

  const center = useMemo(() => {
    return userLocation
      ? { lat: userLocation.latitude, lng: userLocation.longitude }
      : { lat: 22.7196, lng: 75.8577 }; // fallback center (Indore)
  }, [userLocation]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  const handleBookingComplete = (data) => {
    setBookingData(data.transaction);
    setShowBookingDialog(false);
  };

  const handleCollectionComplete = () => {
    setBookingData(null); // Go back to map after marking food collected
  };

  return (
    <div style={{ background: "linear-gradient(135deg, #f9f9f9, #d6e6f2)", minHeight: "100vh" }}>
      {!userLocation && <p>Getting your location...</p>}

      {/* If booking is completed, show confirmation */}
      {bookingData ? (
        <FoodCollected
          recipientId={bookingData.recipientId}
          ngoId={bookingData.ngoId}
          quantity={bookingData.quantity}
          onCollected={handleCollectionComplete}
        />
      ) : (
        <>
          {/* Map Section */}
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={center}
            mapTypeId="roadmap"
          >
            {userLocation && (
              <Marker
                position={{
                  lat: userLocation.latitude,
                  lng: userLocation.longitude,
                }}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
              />
            )}

            {foodBanks.map((bank) => (
              <Marker key={bank._id} position={{ lat: bank.lat, lng: bank.lng }} />
            ))}
          </GoogleMap>

          {/* Food Bank List */}
          <div className="d-flex flex-column justify-content-center align-items-center mt-1 list-container pt-2 py-3">
            <h2 className="fw-bold py-3">Available Food Banks</h2>
            <ul>
              {foodBanks.map((bank) => (
                <li key={bank._id} className="list-item-styling pt-2 pb-0 px-2 my-3">
                  <div>
                    <h4 className="fw-bold">
                      <i>{bank.username}</i>
                    </h4>
                    <p>{bank.address}</p>
                    <h6>
                      <i>
                        <b>Available Plates:</b> {bank.platesAvailable}
                      </i>
                    </h6>
                  </div>
                  <div className="text-center d-flex justify-content-end">
                    <button
                      className="p-2 mb-2 book-styling"
                      onClick={() => {
                        setSelectedNGO(bank);
                        setShowBookingDialog(true);
                      }}
                    >
                      Book Portion
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking Dialog */}
          {showBookingDialog && selectedNGO && (
            <div className="dialog-overlay">
              <BookPlates
                recipientId={localStorage.getItem("id")}
                ngoId={selectedNGO._id}
                onBookingComplete={handleBookingComplete}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MapComponent;
