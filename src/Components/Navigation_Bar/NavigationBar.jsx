import React from "react";
import logo from '../../assets/images/Logo.png';
import './NavigationBar.css';
import AboutUs from "./AboutUs";
import { Link } from "react-router-dom";

function NavigationBar(){
    return(
        <nav className="navbar navbar-expand-lg navstyle">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} className="logo_styling img-fluid d-inline-block" alt="Logo"/>
                </Link>
            <div className="collaps navbar-collapse navstyle">
            <ul className="navbar-nav me-auto">
                <li className="nav-item nav_item_styling fs-5 px-2">
                    <Link className="nav-link" to="/about">About Us</Link>
                </li>
                <li className="nav-item nav_item_styling fs-5 px-2">
                    <Link className="nav-link" to="/support">Support</Link>
                </li>
            </ul>
            </div>
            </div>
        </nav>
    )
}

export default NavigationBar;