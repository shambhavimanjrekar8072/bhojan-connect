import React from "react";
import {Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import DisplayLogin from "./Components/DisplayLogin";
import SignUp from "./Components/SignUp";
import ReceiverDashboard from "./Components/ReceiverDashboard";
import DonorDashboard from "./Components/DonorDashboard";
import FoodBankDashboard from "./Components/FoodBankDashboard";




function App() {
  return (
    <div className="App"> 
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/displaylogin" element={<DisplayLogin />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/receiver-dashboard" element={<ReceiverDashboard />}/>
        <Route path="/donor-dashboard" element={<DonorDashboard />}/>
        <Route path="/food-bank-dashboard" element={<FoodBankDashboard />}/>
        
      </Routes>
    </div>
  );
}

export default App;
