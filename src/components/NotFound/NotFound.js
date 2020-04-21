import React, { Fragment, useEffect } from "react";

//Import App components
import BlueSection from "./../BlueSection/BlueSection.js";
import Header from "./../Header/Header.js";

import undefsafe from "undefsafe";

//import styled components
import { NotFoundContainer } from "./NotFound_StyledComponents.js";

//TODO: Make this wayyy more decorative!
const NotFound_404 = (props) => {

    useEffect(() => {
        console.log("hello world");
        props.changeContainerStyle({
                                    "background-image": `url("./images/lost-trail.jpg")`
                                    }
        ); //end props.changeContainerStyle()
    }, []);

    return (
        <Fragment>
            <Header districtName="CVUHSD" 
                headerTitle="404 Not Found" 
                fullName={ props.fullName } 
                title={props.title}
                site={props.site}
                gradeLevel={props.gradeLevel}

                //modifyLogInStatus={ this.modifyLogInStatus }
                modifyTitle={props.modifyTitle}
                modifySite={props.modifySite}
                modifyRenderAsStudent={props.modifyRenderAsStudent}
                logOut={props.logOut}
                clearState={props.clearState}
                renderAsStudent={(window.location.pathname === "/student")}
            />
            <NotFoundContainer 
                className="notFound-container"
                title={props.title}
            >
                <h4>Oops!</h4>
                <p>It seems you may have gotten lost off the trail.</p>
                <p>Redirecting you back to the path in <span></span></p>
            </NotFoundContainer>
        
        </Fragment>
       
    ); //end return statement
}; 

export default NotFound_404;