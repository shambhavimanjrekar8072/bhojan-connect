import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import NavigationBar from "./Navigation_Bar/NavigationBar";

function SignUp() {
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    latitude: "",
    longitude: "",
  });
  const [message, setMessage] = useState("");
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const navigate = useNavigate();

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // fetch latitude & longitude when userType = ngo
  useEffect(() => {
    if (userType === "ngo") {
      setIsFetchingLocation(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setFormData((prevData) => ({
              ...prevData,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }));
            setIsFetchingLocation(false);
          },
          (error) => {
            console.error("Geolocation error:", error);
            setMessage("Unable to fetch location. Please allow location access.");
            setIsFetchingLocation(false);
          }
        );
      } else {
        setMessage("Geolocation is not supported by your browser.");
        setIsFetchingLocation(false);
      }
    }
  }, [userType]);

  // handle signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userType) {
      setMessage("Please select a user type");
      return;
    }

    try {
      let apiUrl = "";

      // choose correct API endpoint
      if (userType === "recipient") {
        apiUrl = "http://localhost:8000/recipient/register";
      } else if (userType === "donor") {
        apiUrl = "http://localhost:8000/donor/register";
      } else if (userType === "ngo") {
        apiUrl = "http://localhost:8000/ngo/register";
      }

      const response = await axios.post(apiUrl, formData);

      if (response.status === 201 || response.status === 200) {
        setMessage("Signup successful!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="d-flex justify-content-center align-items-center signup-container">
        <div className="d-flex flex-column justify-content-center align-items-center signup-box py-4">
          <h2 className="card-title text-center mb-3 mt-2 heading_style fw-bold">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="px-3 text-center fs-6 my-1">
                <label className="form-label">Receiver</label>
                <input
                  type="radio"
                  className="ms-1 me-5"
                  name="userType"
                  value="recipient"
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label className="form-label">Donor</label>
                <input
                  type="radio"
                  className="ms-1 me-5"
                  name="userType"
                  value="donor"
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label className="form-label">Food Bank</label>
                <input
                  type="radio"
                  className="ms-1"
                  name="userType"
                  value="ngo"
                  onChange={(e) => setUserType(e.target.value)}
                />
              </div>

              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control input-styling me-2 mb-2"
                name="username"
                placeholder="Enter your name"
                value={formData.username}
                onChange={handleChange}
              />

              <label htmlFor="phone" className="form-label">
                Phone No
              </label>
              <input
                type="number"
                className="form-control input-styling me-2 mb-2"
                name="phone"
                placeholder="Enter your phone no."
                value={formData.phone}
                onChange={handleChange}
              />

              {/* Address only for Food Bank */}
              {userType === "ngo" && (
                <>
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control input-styling me-2 mb-2"
                    name="address"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                  />

                  {isFetchingLocation ? (
                    <p className="text-muted mt-2">Fetching location...</p>
                  ) : (
                    formData.latitude &&
                    formData.longitude && (
                      <p className="text-success mt-2">
                        Location captured ✅
                      </p>
                    )
                  )}
                </>
              )}

              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control input-styling me-2 mb-2"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control input-styling me-2"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn button-styling mt-3 fs-6 my-3"
              disabled={isFetchingLocation && userType === "ngo"}
            >
              {isFetchingLocation && userType === "ngo"
                ? "Getting Location..."
                : "Sign Up"}
            </button>
          </form>

          {message && <p className="text-center mt-2">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default SignUp;
