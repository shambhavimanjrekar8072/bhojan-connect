import React from "react";
import axios from "axios";
import "./FoodCollected.css";

function FoodCollected({ recipientId, ngoId, quantity, onCollected }) {

  const handleFoodCollected = async () => {
    try {
      const res = await axios.post("http://localhost:8000/recipientTransaction/take", {
        recipientId,
        ngoId,
        quantity,
      });
      alert(res.data.message || "Food collection marked successfully!");
      if (onCollected) onCollected(); // Call callback to return to dashboard
    } catch (err) {
      console.error(err);
      alert("Failed to mark completion. Try again.");
    }
  };

  return (
    <div className="food-collected-page">
      <div className="food-collected">
        <h3>🎉 Food Booked Successfully!</h3>
        <p>Your booking details:</p>
        <div className="details">
          <p><b>Receiver ID:</b> {recipientId}</p>
          <p><b>FoodBank ID:</b> {ngoId}</p>
          <p><b>Plates Booked:</b> {quantity}</p>
        </div>

        <button className="collected-btn" onClick={handleFoodCollected}>
          Mark as Collected ✅
        </button>
      </div>
    </div>
  );
}

export default FoodCollected;
