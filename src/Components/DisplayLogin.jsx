import React from "react";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router-dom"
import "./DisplayLogin.css";
import NavigationBar from "./Navigation_Bar/NavigationBar";

function DisplayLogin(){

    const[userType, setUserType] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (userType === "Donor"){
            navigate('./donor-dashboard');
        }
        else if(userType === "Food Bank"){
            navigate('./food-bank-dashboard');
        }
    }


    return(
        <>
        <NavigationBar/>
        <div className="d-flex justify-content-center align-items-center login-container">
      <div className="d-flex flex-column justify-content-center align-items-center login-box ">
        <h2 className="card-title text-center mb-4 heading_style fw-bold">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <div className="px-3 text-center fs-6">
            <label className="form-label">Donor</label>
            <input type="radio" className="ms-1 me-5" name="userType" value="Donor"/>
            <label className="form-label">Food Bank</label>
            <input type="radio" className="ms-1" name="userType" vallue="Food Bank"/>
            </div>
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control input-styling me-2" id="email" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control input-styling me-2" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn button-styling mt-3 fs-6 my-3">Log In</button>
         
          
        </form>
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </div>
    </div>
    </>

    )
}

export default DisplayLogin;