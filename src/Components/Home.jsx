import React from "react";
import User from "./User";
import NavigationBar from "./Navigation_Bar/NavigationBar";
import DisplayLogin from "./DisplayLogin";

function Home(){
    return(
        <>
        <NavigationBar/>
        <DisplayLogin/>
        </>
    )
}

export default Home;