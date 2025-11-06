import React, {useState} from "react";
import './DonorDashboard.css';
import NavbarFoodbank from "./NavbarFoodbank";

function DonorDashboard(){

    const [donationMessage, setDonationMessage] = useState(null);
    const handleDonate = (e) =>{
        e.preventDefault();
        setDonationMessage('Donation Made Successfully ✅');
        e.target.reset();
    };


    return(
        <>
        {donationMessage && (
            <div className="donation-message-display">
                {donationMessage}
            </div>
        )}

       <NavbarFoodbank/>

        <div className="d-flex justify-content-center align-items-center donation-container">
      <div className="d-flex flex-column justify-content-center align-items-center donation-box py-4">
        <h2 className="card-title text-center mb-4 mt-2 heading_style fw-bold">Donation Form</h2>
        <form onSubmit={handleDonate}>
          <div className="mb-3">
            <label className="form-label">Number of plates to be donated :-</label>
            <input type="number" className="form-control input-styling me-2 mb-2" name="plates" placeholder="Enter number of plates"/>
             <label className="form-label">Address of the Food Bank</label>
            <input type="text" className="form-control input-styling me-2 mb-2" name="foodbank" placeholder="Enter Food Bank Address"/>
          </div>

         
          <button type="submit" className="btn button-styling mt-3 fs-6 my-3" name="action" value="donate">Donate</button>
          
        </form>

      </div>
    </div>
        </>
    )
}

export default DonorDashboard;