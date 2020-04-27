import React, { Fragment } from "react";

import ReactLoading from 'react-loading';

import { CoffeeAnimation }  from "./../Header/Header_StyledComponents.js"

import { LoadingSSOPageContainer, CoffeeAnimationContainer, LoadingMessage } from "./LoadingSSOPage_StyledComponents.js";
const LoadingSSOPage = ({message, error, title,...props}) => {
    // title={this.state.title}
    // site={this.state.site}
    // gradeLevel={this.state.gradeLevel}
    // renderAsStudent={this.state.renderAsStudent}
    
    return (
        <LoadingSSOPageContainer 
            className="loadingSSOPage-container"
        > 
            <CoffeeAnimationContainer className="coffee-animation-container">
                <LoadingMessage className="loading-message">Sit tight CVUHSD user, filling your cup of coffee!
                    <span>{ message } </span>
                </LoadingMessage>
                <CoffeeAnimation className="coffee-animation-outerContainer"/>
                { error && 
                    <div>
                      {
                          <p>
                            <span>An error occured during authentication, please try again!</span>
                        </p>
                    }
                    </div>
                }
                {/* <img src="./cvuhsd-allStudents-ready.jpg"/> */}
            </CoffeeAnimationContainer>
        </LoadingSSOPageContainer>
    )
}; //end LoadinSSOPage  

export default LoadingSSOPage;