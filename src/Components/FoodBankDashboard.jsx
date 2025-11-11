import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarFoodbank from "./NavbarFoodbank";
import "./FoodBankDashboard.css";

function FoodBankDashboard() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        // Get NGO ID from localStorage
        const ngoId = localStorage.getItem("id");

        // Fetch recipients linked to this NGO
        const res = await axios.get(
          `http://localhost:8000/recipientTransaction/list/${ngoId}`
        );

        console.log("API Response:", res.data);
        setRecipients(res.data.recipients || []);
      } catch (err) {
        console.error("Error fetching recipients:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipients();
  }, []);

  // Handle checkbox click → mark food as collected
  const handleCollected = async (recipientId, quantity) => {
    try {
      const ngoId = localStorage.getItem("id");

  
      await axios.get(`http://localhost:8000/ngo/${ngoId}`, {
        recipientId,
        ngoId,
        quantity,
      });

      // Remove recipient from table
      setRecipients((prev) => prev.filter((r) => r.recipientId !== recipientId));

      // Show success message
      setMessage("✅ Food collected successfully!");

      // Hide after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error updating NGO:", err);
      setMessage("❌ Failed to update. Try again.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <>
      <NavbarFoodbank />
      <div className="d-flex flex-column justify-content-center align-items-center page_styling">
        {loading ? (
          <p className="fs-5 fw-semibold">Loading...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div className="table-container">
            <h2 className="dashboard-title">Food Bank Dashboard</h2>

            {/* ✅ Success / Error Message */}
            {message && <div className="success-message">{message}</div>}

            <table className="table_styling mt-3">
              <thead className="fs-4">
                <tr>
                  <th className="p-2">Order no.</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Plates</th>
                  <th className="p-2">Pickup-Complete</th>
                </tr>
              </thead>
              <tbody className="fs-6 mt-3 fst-italic">
                {recipients.map((recipient, index) => (
                  <tr key={recipient.recipientId}>
                    <td className="fw-bold">#{index + 101}</td>
                    <td>{recipient.name || "N/A"}</td>
                    <td>{recipient.totalBooked || recipient.quantity}</td>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleCollected(
                            recipient.recipientId,
                            recipient.totalBooked || recipient.quantity
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {recipients.length === 0 && (
              <p className="no-data mt-3 fst-italic">
                All food pickups have been completed 🎉
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default FoodBankDashboard;
