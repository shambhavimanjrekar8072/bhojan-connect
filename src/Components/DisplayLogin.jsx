import React from "react";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import "./DisplayLogin.css";

function DisplayLogin(){

    const[userType, setUserType] = useState(null);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
      const{name, value} = e.target;
      if (name === 'userType'){
        setUserType(value);
      }
      else{
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!userType) {
            setError("Please select a user type (Receiver, Donor, or Food Bank).");
            return;
        }

        let apiUrl = '';
        let dashboardPath = '';

        switch (userType) {
            case "recipient":
                apiUrl = 'http://localhost:8000/recipient/login';
                dashboardPath = '/receiver-dashboard';
                break;
            case "donor":
                apiUrl = 'http://localhost:8000/donor/login';
                dashboardPath = '/donor-dashboard';
                break;
            case "ngo":
                apiUrl = 'http://localhost:8000/ngo/login';
                dashboardPath = '/food-bank-dashboard';
                break;
            default:
                setError("Invalid user type selected.");
                return;
        }

        try{
          const response = await axios.post(apiUrl, formData);
          console.log("Login Success:", response.data);
          switch (userType) {
            case "recipient":
              localStorage.setItem("id" , response.data.recipient._id);
              break;
            case "donor":
              localStorage.setItem("id" , response.data.donor._id);
                break;
            case "ngo":
                localStorage.setItem("id" , response.data.ngo._id);
                break;
            default:
                setError("Invalid user type selected.");
                return;
        }

          navigate(dashboardPath);
        } catch(err){
          console.error("Login Error:", err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        }
        
    }


    return(
        <>
        <div className="d-flex justify-content-center align-items-center login-container">
      <div className="d-flex flex-column justify-content-center align-items-center login-box ">
        <h2 className="card-title text-center mb-4 heading_style fw-bold">Login</h2>
        {error && <div className="alert alert-danger w-100 text-center">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <div className="px-3 text-center fs-6 mb-1">
            <label className="form-label">Receiver</label>
            <input type="radio" className="ms-1 me-5" name="userType" value="recipient" onChange={handleChange} checked={userType === "recipient"}/>
            <label className="form-label">Donor</label>
            <input type="radio" className="ms-1 me-5" name="userType" value="donor" onChange={handleChange} checked={userType === "donor"}/>
            <label className="form-label">Food Bank</label>
            <input type="radio" className="ms-1" name="userType" value="ngo" onChange={handleChange} checked={userType === "ngo"}/>
            </div>
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control input-styling me-2" name="email" placeholder="Enter your email" onChange={handleChange} value={formData.email} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control input-styling me-2" name="password" placeholder="Enter your password" onChange={handleChange} value={formData.password} required/>
          </div>
          <button type="submit" className="btn button-styling mt-3 fs-6 my-3" name="action" value="login">Log In</button>
         
          
        </form>
        <Link to="/signup">Don't have an account? Sign Up</Link>
      </div>
    </div>
    </>

    )
}

export default DisplayLogin;