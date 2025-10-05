import React from "react";
import{Link} from "react-router-dom";
import "./SignUp.css";
import NavigationBar from "./Navigation_Bar/NavigationBar";

function SignUp(){
    return(
        <>
        <NavigationBar/>
        <div className="d-flex justify-content-center align-items-center signup-container">
      <div className="d-flex flex-column justify-content-center align-items-center signup-box ">
        <h2 className="card-title text-center mb-3 mt-2 heading_style fw-bold">Sign Up</h2>
        <form>
          <div className="mb-3">
            <div className="px-3 text-center fs-6">
            <label className="form-label">Donor</label>
            <input type="radio" className="ms-1 me-5" name="userType" value="Donor"/>
            <label className="form-label">Food Bank</label>
            <input type="radio" className="ms-1" name="userType" vallue="Food Bank"/>
            </div>
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control input-styling me-2 mb-2" id="name" placeholder="Enter your name"/>
            <label htmlFor="phone" className="form-label">Phone No</label>
            <input type="number" className="form-control input-styling me-2 mb-2" id="phone" placeholder="Enter your phone no."/>
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control input-styling me-2 mb-2" id="address" placeholder="Enter your address" />
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control input-styling me-2 mb-2" id="email" placeholder="Enter your email" />
            
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control input-styling me-2" id="password" placeholder="Enter your password" />
          </div>

          <Link to="/displaylogin">
          <button type="submit" className="btn button-styling mt-3 fs-6 my-3">Sign Up</button>
         </Link>
          
        </form>
      </div>
    </div>
    </>
    )
}

export default SignUp;