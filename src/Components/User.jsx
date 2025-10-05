import React from "react";
import {useState} from "react";
import {Link} from "react-router-dom"
import "./User.css";
import DisplayLogin from "./DisplayLogin";

function User(){
    
    const [isUserType, setUserType] = useState('receiver');

    

    return(
        <div className="bg-image d-flex justify-content-center align-items-center">
            <div className="type_user text-center">
            <h3 className="mt-4 fw-bold"><i>Who are you?</i></h3>
            <br/>
            <div className="text-center">
            <select className="select_styling" value={isUserType} onChange={(e) => setUserType(e.target.value)}>
            <option value="receiver">Receiver</option>
            <option value="donor">Donor</option>
            <option value="food_bank">Food Bank</option>
            </select>

            {isUserType === 'receiver' ? (
            <Link to="/receiver-dashboard">
            <button className="mx-3 btn btn_styling px-3"type="submit"> Next
            </button>
            </Link>
            ) : (
            <Link to="/displaylogin">
            <button className="mx-3 btn btn_styling px-3" type="submit"> Next
            </button>
            </Link>
      )}
      </div>
            </div>
            </div>
    )
}

export default User;