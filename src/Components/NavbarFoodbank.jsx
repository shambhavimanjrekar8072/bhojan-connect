import React from 'react';
import logo from '../assets/images/Logo.png';
import { Link } from 'react-router-dom';
import './NavbarFoodbank.css';

function NavbarFoodbank(){
    return(
        <navbar className="navbar navbar-expand-lg navstyle">
        <nav className="navbar navbar-expand-lg navstyle me-auto">
            <div className="container-fluid d-flex">
                <Link className="navbar-brand" to="/">
                    <img src={logo} className="logo_styling img-fluid d-inline-block" alt="Logo"/>
                </Link>
            <div className="collapse navbar-collapse navstyle">
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
        <nav className="me-2 logout_button">
            <div>
            
            <button className="btn btn-lg button_styling fs-5 me-3 align-text-center px-3 py-1" type="button">
                    <Link to="/" className="nav-link">
                    Logout
                    </Link>
                </button>
                
            </div>
        </nav>
        </navbar>
    )
}

export default NavbarFoodbank;