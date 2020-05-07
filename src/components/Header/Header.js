import React, { Fragment } from "react";

//Import components
import NavigationBar from "../NavigationBar/NavigationBar.js";

import { NavigationBarHeader, DashboardHeaderContainer, DashboardHeader, 
        AddToHomeScreenButton, ToolTip, PortalHeaderText, Greeting, PositionGreeting, 
        PositionSiteInfo,
        CoffeeAnimation, SchoolLogo } from "./Header_StyledComponents.js";

//Import 3rd-party APIs
import greeting from 'greeting';

const Header = ( { modifyLogInStatus, renderAsStudent, logOut, clearState, title, site, gradeLevel, modifyRenderAsStudent, portalHeaderTextDisplay,...props }) => {
    console.log("Header props:\t" + JSON.stringify(props) );

    let parseSchoolName = (site) => {
        if (site && (site !== "Centinela Valley Independent Study School" )) {
            console.log("Site:\t" + site);
            return site.toString().split(" ", 1)[0];
        } 

        if (site === "Centinela Valley Independent Study School" ) {
            return "cviss";
        } 

        return ""; 
    }; //end parseSchoolName

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

        if (schoolName.toLowerCase() === "Centinela Valley Independent Study School") {
            schoolLogoSite = "https://www.cvalternatives.org/";
        }
        
        return schoolLogoSite;
    }; //end getSchoolLogoSite

    let districtPosition = title;

    let schoolName = parseSchoolName(site);


    return (<Fragment>
        <NavigationBarHeader 
            className="app-header navigation-bar-header"
            districtPosition={districtPosition}
            renderAsStudent={renderAsStudent} 
        >
            <NavigationBar
                className="navigation-bar"
                districtPosition={districtPosition}
                modifyLogInStatus={modifyLogInStatus}
                renderAsStudent={renderAsStudent}  
                modifyRenderAsStudent={modifyRenderAsStudent}
                clearState={clearState}
                logOut={logOut}
            />
        </NavigationBarHeader>

        <DashboardHeaderContainer className="dashboard-header-container" id="back-to-top" districtPosition={districtPosition} renderAsStudent={renderAsStudent} >
            <DashboardHeader className="dashboard-header" districtPosition={districtPosition} renderAsStudent={renderAsStudent} >
                <PortalHeaderText 
                    className="portal-header-text" 
                    districtPosition={districtPosition} 
                    renderAsStudent={renderAsStudent}    
                >
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
                        <PositionSiteInfo 
                            className="position-site-info" 
                            display={portalHeaderTextDisplay}
                        >
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
                                {/* TODO: Find a way to differentiate students such as student with
                                        id #46196, who is a special ed students. Special ed students are not always
                                        seniors.
                                */}
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
                                <span>{districtPosition.toLowerCase() || "User"}</span> 
                                { " from " } 
                                <span>{ site || "CVUHSD"}</span>
                            </PositionGreeting>
                            {/*  //TODO: Add link the site of the school logo */}

                            { 
                                (districtPosition === "Student") && schoolName ? 
                                    (   <a href={() => getSchoolLogoSite(schoolName)}>
                                             <SchoolLogo  
                                                className="school-logo" 
                                                src={`./images/school-logo-${schoolName.toLowerCase()}.png`} 
                                            />  
                                        </a>
                                       
                                    )
                                    : null
                            }
                                         
                        </PositionSiteInfo>
                    ) : <Greeting 
                            className="loading-greeting"
                            districtPosition={districtPosition} 
                            renderAsStudent={renderAsStudent} 
                        >
                            Stay put, warming your cup of coffee! 
                        </Greeting>
                }
            </DashboardHeader>
        </DashboardHeaderContainer>
    </Fragment>);   
}; //end Header

export default Header;
