import React from "react";

//Import components
import NavigationBar from "../NavigationBar/NavigationBar.js";

import { NavigationBarHeader, DashboardHeaderContainer, DashboardHeader, 
        AddToHomeScreenButton, ToolTip, PortalHeaderText, Greeting, PositionGreeting, CoffeeAnimation, SchoolLogo } from "./Header_StyledComponents.js";

//Import 3rd-party APIs
import greeting from 'greeting';

const Header = ( { modifyLogInStatus, renderAsStudent, logOut, clearState, title, site, gradeLevel,...props }) => {
    console.log("Header props:\t" + JSON.stringify(props) );

    let parseSchoolName = (site) => {
        if (site) {
            return site.toString().split(" ", 1)[0];
        } else {
            return "";
        }
    };

    let getSchoolLogoSite = (schoolName) => {
        let schoolLogoSite = "https://www.centinela.k12.ca.us/";
        if (schoolName.toLowerCase() === "leuzinger") {
            schoolLogoSite = "https://www.leuzinger.org/";
        } 

        if (schoolName.toLowerCase() === "lawndale") {
            schoolLogoSite = "https://www.lawndalehs.org/";
        } 

        if (schoolName.toLowerCase() === "hawthorne") {
            schoolLogoSite = "https://www.hhscougars.org/";
        } 

        if (schoolName.toLowerCase() === "lloyde") {
            schoolLogoSite = "https://www.lloydehs.org/";
        } 

    }; //end getSchoolLogoSite

    let districtPosition = title;

    let schoolName = parseSchoolName(site);


    return ([
        <NavigationBarHeader 
            districtPosition={districtPosition}
            renderAsStudent={renderAsStudent} 
        >
            <NavigationBar
                districtPosition={districtPosition}
                modifyLogInStatus={modifyLogInStatus}
                renderAsStudent={renderAsStudent}  
                clearState={clearState}
                logOut={logOut}
            />
        </NavigationBarHeader>,

        <DashboardHeaderContainer id="back-to-top" districtPosition={districtPosition} renderAsStudent={renderAsStudent} >
            <DashboardHeader districtPosition={districtPosition} renderAsStudent={renderAsStudent} >
                <PortalHeaderText districtPosition={districtPosition} renderAsStudent={renderAsStudent} >
                    <strong>
                        {props.districtName || "District"}
                        <span>
                            <h2>
                                {props.headerTitle|| "Portal"}
                            </h2>
                        </span>
                    </strong>
                </PortalHeaderText>

                <section>

                </section>

                { districtPosition ? (
                        <section>
                            <Greeting   districtPosition={districtPosition} 
                                        renderAsStudent={renderAsStudent} 
                                        className="greeting"
                            >
                                { greeting.random() || "Hi"}
                             <span> {props.fullName || "CVUHSD User"}<span>&#9786;</span></span>
                            </Greeting>
                            <PositionGreeting 
                                districtPosition={districtPosition} 
                                renderAsStudent={renderAsStudent} 
                                className="position-greeting"
                            >
                                {
                                    ( (districtPosition === "Student") && gradeLevel ) ?
                                        (
                                            <span>
                                                { 
                                                    (gradeLevel &&  gradeLevel < 13 ) ? `${gradeLevel}th grade ` : null
                                                }
                                            </span>
                                        ) : null
                                    
                                }
                                <span>{districtPosition.toLowerCase() || "User"}</span> from 
                                <span>{" " + site || "CVUHSD"}</span>
                            </PositionGreeting>
                            {/*  //TODO: Add link the site of the school logo */}

                            { 
                                (districtPosition === "Student") && schoolName ? 
                                    (   <a href={() => getSchoolLogoSite("lawndale")}>
                                             <SchoolLogo 
                                                
                                                className="school-logo" 
                                                src={`./images/school-logo-${schoolName.toLowerCase()}.png`} 
                                            />  
                                        </a>
                                       
                                    )
                                    : null
                            }
                                         
                        </section>
                    ) : <Greeting className="loading-greeting">
                            Stay put, warming your cup of coffee! 
                            {/* <CoffeeAnimation/> */}
                        </Greeting>
                }
              
                <AddToHomeScreenButton  id="addToHomeScreenButton" districtPosition={districtPosition} renderAsStudent={renderAsStudent} >Add to Home Screen</AddToHomeScreenButton>
                <ToolTip districtPosition={districtPosition} renderAsStudent={renderAsStudent}  className="tooltip" id="addToHomeScreenTooltip">
                    <p>
                        Create a shortcut to the portal app on your desktop. 
                    </p>
                    <p>
                        Be notified when a service such as Destiny is down, and 
                        conversely when it comes back up.
                    </p> 
                </ToolTip>
            </DashboardHeader>
        </DashboardHeaderContainer>
    ]);   
}; //end Header

export default Header;
