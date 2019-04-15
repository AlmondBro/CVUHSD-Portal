import React, { Component} from "react";

//Import componentas
import NavigationBar from "./NavigationBar.js"
const Header = (props) => {
    return ([
        <header class="navigation-bar-header">
            <NavigationBar />
        </header>,

       <div class="staff-dashboard-header-container" id="back-to-top">
            <header class="staff-dashboard-header">
                <h1><strong>CVUHSD</strong></h1>
                <h2>Staff Portal</h2>
                <button class="addToHomeScreenButton blueBG" id="addToHomeScreenButton">Add to Home Screen</button>
                <div class="tooltip" id="addToHomeScreenTooltip">
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