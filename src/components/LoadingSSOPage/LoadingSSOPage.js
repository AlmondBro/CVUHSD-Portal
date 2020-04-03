import React, { Fragment } from "react";

import ReactLoading from 'react-loading';

import { CoffeeAnimation }  from "./../Header/Header_StyledComponents.js"

import { LoadingSSOPageContainer, CoffeeAnimationContainer, LoadingMessage } from "./LoadingSSOPage_StyledComponents.js";
const LoadingSSOPage = ({message, error, ...props}) => {
    return (
        <LoadingSSOPageContainer className="loadingSSOPage-container">
            {/* <ReactLoading 
                type={"spinningBubbles"}
                height={'200px'} width={'200px'} 
                color={'#1E6C93'}
            />  */}
        
            <CoffeeAnimationContainer>
                <LoadingMessage>Sit tight CVUHSD user, filling your cup of coffee!
                    <span>{ message } </span>
                </LoadingMessage>
                <CoffeeAnimation/>
                { error && 
                    <div>
                      {<p><span>An error occured during authentication, please try again!</span></p>}
        
                    </div>}
                {/* <img src="./cvuhsd-allStudents-ready.jpg"/> */}
            </CoffeeAnimationContainer>
   
        </LoadingSSOPageContainer>

     
    )
};  

export default LoadingSSOPage;