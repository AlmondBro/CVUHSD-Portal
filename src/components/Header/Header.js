import React, { Fragment } from "react";

//Import components
import NavigationBar from "../NavigationBar/NavigationBar.js";

import { NavigationBarHeader, DashboardHeaderContainer, DashboardHeader, 
        AddToHomeScreenButton, ToolTip, Divider, PortalHeaderText, Greeting, PositionGreeting, 
        PositionSiteInfo,
        CoffeeAnimation, SchoolLogo } from "./Header_StyledComponents.js";

//Import 3rd-party APIs
import greeting from 'greeting';

import Skeleton from 'react-loading-skeleton';

const Header = ( { location, fullName, email, modifyLogInStatus, renderAsStudent, logOut, clearState, title, uid, site, gradeLevel, modifyRenderAsStudent, portalHeaderTextDisplay, districtName, headerTitle, notify }) => {
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

    let friendlyGreeting = greeting.random();

    let showHeader = false;

    return (
        <Fragment>
            <NavigationBarHeader 
                className           =   "app-header navigation-bar-header"
                districtPosition    =   { districtPosition }
                renderAsStudent     =   { renderAsStudent } 
            >
                <NavigationBar
                    className               =   "navigation-bar"
                    districtPosition        =   { title }
                    fullName                =   { fullName }
                    email                   =   { email }
                    site                    =   { site }
                    modifyLogInStatus       =   { modifyLogInStatus }
                    renderAsStudent         =   { renderAsStudent }  
                    modifyRenderAsStudent   =   { modifyRenderAsStudent }
                    notify                  =   { notify }
                    clearState              =   { clearState }
                    logOut                  =   { logOut }
                />
            </NavigationBarHeader>

            <DashboardHeaderContainer 
                districtPosition    =   {   districtPosition    } 
                renderAsStudent     =   {   renderAsStudent     } 
                className           =   "dashboard-header-container" 
                id                  =   "back-to-top" 
            >
                <DashboardHeader 
                    districtPosition    =   { districtPosition } 
                    renderAsStudent     =   { renderAsStudent } 
                    className           =   "dashboard-header" 
                 
                >
                    <PortalHeaderText 
                        className           =   "portal-header-text" 
                        districtPosition    =   { districtPosition } 
                        renderAsStudent     =   { renderAsStudent }    
                    >
                        {
                            districtPosition && districtName && headerTitle ? (
                                <strong>
                                { (districtName || "District") + " WayPoint"}
                                <span>
                                    <h2>
                                        { headerTitle|| "S.S.O. Portal"}
                                    </h2>
                                </span>
                            </strong>
                            ) : (
                                <Skeleton width="100px" height="40px"/>
                            )
                        }
                       
                    </PortalHeaderText>
                    <Divider
                        districtPosition={districtPosition} 
                        renderAsStudent={renderAsStudent}
                    />
                        <PositionSiteInfo 
                            className="position-site-info" 
                            display={portalHeaderTextDisplay}
                        >
                            <Greeting   districtPosition={districtPosition} 
                                        renderAsStudent={renderAsStudent} 
                                        className="greeting"
                            >
                                { friendlyGreeting || "Hi"}
                            <span> { fullName || "CVUHSD User" }<span>&#9786;</span></span>
                            </Greeting>
                            <PositionGreeting 
                                districtPosition    =   { districtPosition} 
                                renderAsStudent     =   { renderAsStudent } 
                                className           =   "position-greeting"
                            >
                                {/* TODO: Find a way to differentiate students such as student with
                                        id #46196, who is a special ed students. Special ed students are not always
                                        seniors.
                                */}
                                {
                                    ( (districtPosition.toLowerCase() === "student") && gradeLevel ) ?
                                        (
                                            <span>
                                            { 
                                                (gradeLevel &&  gradeLevel < 13 ) ? `${gradeLevel}th grade ` : null
                                            }
                                            </span>
                                        ) : null
                                    
                                }
                                { (districtPosition.toLowerCase() === "student") ? 
                                    (
                                        <Fragment>
                                            <span>{districtPosition.toLowerCase() + " " + `(${uid})` || "User"}</span> 
                                                {" from "}
                                            <span>{ site || "CVUHSD"}</span>
                                        </Fragment>
                                    ) : null 
                                }
                            
                                { 
                                    (districtPosition === "Student") && schoolName ? 
                                        (   <a href={() => getSchoolLogoSite(schoolName)}>
                                                <SchoolLogo  
                                                    className="school-logo" 
                                                    src={`/images/school-logo-${schoolName.toLowerCase()}.png`} 
                                                />  
                                            </a>
                                        
                                        )
                                        : null
                                }
                            </PositionGreeting>          
                        </PositionSiteInfo>
                </DashboardHeader>
            </DashboardHeaderContainer>
        </Fragment>
    );  //end return statement
}; //end Header

export default Header;
