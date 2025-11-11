import React, { useState } from "react";
import axios from "axios";
import "./BookPlates.css";

function BookPlates({ recipientId, ngoId, onBookingComplete }) {
  const [plates, setPlates] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBook = async () => {
    if (!plates) {
      setError("Please enter number of plates");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("http://localhost:8000/recipientTransaction/book", {
        recipientId,
        ngoId,
        quantity: Number(plates),
      });

      onBookingComplete(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to book food. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dialog">
      <h3 className="dialog-title">Book Food Plates 🍱</h3>

      <input
        type="number"
        placeholder="Enter number of plates"
        className="dialog-input"
        value={plates}
        onChange={(e) => setPlates(e.target.value)}
      />

      {error && <p className="error-text">{error}</p>}

      <button className="dialog-button" onClick={handleBook} disabled={loading}>
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
}

export default BookPlates;
