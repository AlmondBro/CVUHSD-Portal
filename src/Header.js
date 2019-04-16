import React, { Component} from "react";

//Import componentas
import NavigationBar from "./NavigationBar.js"
const Header = (props) => {
    return ([
        <header className="navigation-bar-header">
            <NavigationBar />
        </header>,

       <div className="staff-dashboard-header-container" id="back-to-top">
            <header className="staff-dashboard-header">
                <h1><strong>CVUHSD</strong></h1>
                <h2>Staff Portal</h2>
                <button className="addToHomeScreenButton blueBG" id="addToHomeScreenButton">Add to Home Screen</button>
                <div className="tooltip" id="addToHomeScreenTooltip">
                    <p>
                        Create a shortcut to the portal app on your desktop. 
                    </p>
                    <p>
                        Be notified when a service such as Destiny is down, and 
                        conversely when it comes back up.
                    </p>  
                </div>
            </header>
        </div>
    ]);   
}; //Header

export default Header;