import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DonorDashboard.css";
import NavbarFoodbank from "./NavbarFoodbank";

function DonorDashboard() {
  const [plates, setPlates] = useState("");
  const [donorId, setDonorId] = useState("");
  const [ngoId, setNgoId] = useState("");
  const [ngos, setNgos] = useState([]);
  const [message, setMessage] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLocating, setIsLocating] = useState(true);

  // Fetch donor ID from localStorage
  useEffect(() => {
    const storedDonorId = localStorage.getItem("id");
    if (storedDonorId) setDonorId(storedDonorId);
  }, []);

  // Use Geolocation API to get donor’s location
  useEffect(() => {
    const getLocation = async () => {
      if (!navigator.geolocation) {
        setMessage("Geolocation is not supported by your browser ❌");
        setIsLocating(false);
        return;
      }

      setIsLocating(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setMessage("Location access denied ❌");
              break;
            case error.POSITION_UNAVAILABLE:
              setMessage("Location unavailable ❌");
              break;
            case error.TIMEOUT:
              setMessage("Location request timed out ⏳");
              break;
            default:
              setMessage("Unable to retrieve your location ❌");
          }
          setIsLocating(false);
          setTimeout(() => setMessage(null), 4000);
        }
      );
    };

    getLocation();
  }, []);

  // Fetch nearby NGOs using the coordinates
  useEffect(() => {
    const fetchNgos = async () => {
      if (!latitude || !longitude) return;

      try {
        const response = await axios.get(
          `http://localhost:8000/ngo/nearby/search?latitude=${latitude}&longitude=${longitude}`
        );
        setNgos(response.data.nearbyNGOs || response.data.foodbanks || []);
      } catch (error) {
        console.error("Error fetching NGOs:", error);
        setMessage("Failed to load nearby NGOs ❌");
        setTimeout(() => setMessage(null), 4000);
      }
    };

    fetchNgos();
  }, [latitude, longitude]);

  const handleDonate = async (e) => {
    e.preventDefault();
    setMessage("Sending donation...");

    try {
      await axios.post("http://localhost:8000/donorTransaction/donate", {
        donorId,
        ngoId,
        quantity: parseInt(plates),
      });

      setMessage("Donation Made Successfully ✅");
      setPlates("");
      setNgoId("");
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong ❌");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <>
      {message && <div className="donation-message-display">{message}</div>}

      <NavbarFoodbank />

      <div className="d-flex justify-content-center align-items-center donation-container">
        <div className="d-flex flex-column justify-content-center align-items-center donation-box py-4">
          <h2 className="card-title text-center mb-4 mt-2 heading_style fw-bold">
            Donation Form
          </h2>

          {isLocating ? (
            <p>Fetching your current location 📍...</p>
          ) : (
            <>
              {latitude && longitude ? (
                <form onSubmit={handleDonate}>
                  <div className="mb-3">
                    <label className="form-label">Select Food Bank</label>
                    <select
                      className="form-control input-styling me-2 mb-2"
                      value={ngoId}
                      onChange={(e) => setNgoId(e.target.value)}
                      required
                    >
                      <option value="">-- Select Food Bank --</option>
                      {ngos.length > 0 ? (
                        ngos.map((ngo) => (
                          <option key={ngo._id} value={ngo._id}>
                            {ngo.username}
                          </option>
                        ))
                      ) : (
                        <option disabled>No nearby NGOs found</option>
                      )}
                    </select>

                    <label className="form-label">Number of Plates</label>
                    <input
                      type="number"
                      className="form-control input-styling me-2 mb-2"
                      name="plates"
                      placeholder="Enter number of plates"
                      value={plates}
                      onChange={(e) => setPlates(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn button-styling mt-3 fs-6 my-3"
                    name="action"
                    value="donate"
                  >
                    Donate
                  </button>
                </form>
              ) : (
                <p>Unable to fetch your location. Please allow location access 🔒</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DonorDashboard;
