import React from "react";
import {Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import DisplayLogin from "./Components/DisplayLogin";
import SignUp from "./Components/SignUp";
import ReceiverDashboard from "./Components/ReceiverDashboard";



function App() {
  return (
    <div className="App"> 
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/displaylogin" element={<DisplayLogin />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/receiver-dashboard" element={<ReceiverDashboard />}/>
        
      </Routes>
    </div>
  );
}

export default App;
