import React, { Fragment, useState, useEffect } from "react";

//Import App components
import BlueSection from "./../BlueSection/BlueSection.js";
import Header from "./../Header/Header.js";

import undefsafe from "undefsafe";

import { withRouter } from "react-router-dom";

//import styled components
import { NotFoundContainer } from "./NotFound_StyledComponents.js";

//TODO: Make this wayyy more decorative!
const NotFound_404 = ({defaultURL, ...props}) => {

    //Initialize hooks:
    const countDownTime = 7;
    const [seconds, setSeconds] = useState(countDownTime);


    useEffect(() => {
        let interval = null;

        let intervalFunction = () => {
            setSeconds(seconds => seconds - 1);
        }; //end intervalFunction

        interval = setInterval(intervalFunction, 1000); // end setInterval. Run every second to update the countdownTime

        if (seconds === 0) {
            console.log("Pushing history");
            clearInterval(interval);
            props.history.push(`/${defaultURL}`);
            return;
        }

        props.changeContainerStyle({
                                    "background-image": `url("./images/lw-high.jpg")`,
                                    "opacity": "0.2"
                                    }
        ); //end props.changeContainerStyle()


    }, [seconds]);

    return (
        <Fragment>
            <Header districtName="CVUHSD" 
                headerTitle="404 Not Found" 
                fullName={ props.fullName } 
                title={props.title}
                site={props.site}
                gradeLevel={props.gradeLevel}
                portalHeaderTextDisplay={"none"}
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
                <p>Redirecting you back to the path in <span>{seconds} second(s)</span></p>
            </NotFoundContainer>
        
        </Fragment>
       
    ); //end return statement
}; 

export default withRouter(NotFound_404);