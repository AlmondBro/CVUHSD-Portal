import React from "react";

//Import components
import NavigationBar from "./NavigationBar.js";

//Import 3rd-party APIs
import styled from "styled-components";

import greeting from 'greeting';

let NavigationBarHeader = styled.header`
        position: relative;
        width: 100%;
        /* Bottom three BG-color and margin bottom rules, and border-bottom were not here before */
        /* background-color: #f4f7f9; */
        margin-bottom: 20px;
        /* border-bottom: 1px solid #1e6c93; */
        /* background-color: white; */
        line-height: 1.0em;
        padding: 6px 0;
        z-index: 2;
        /* Same as font size to vertically align an
        element with float to its parent */
        /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f4f7f9+0,2989d8+0,f4f7f9+0,ffffff+100 */
        background: #f4f7f9;
        /* Old browsers */
        background: -moz-linear-gradient(top, #f4f7f9 0%, #2989d8 0%, #f4f7f9 0%, #ffffff 100%);
        /* FF3.6-15 */
        background: -webkit-linear-gradient(top, #f4f7f9 0%, #2989d8 0%, #f4f7f9 0%, #ffffff 100%);
        /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, #f4f7f9 0%, #2989d8 0%, #f4f7f9 0%, #ffffff 100%);
        /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid: DXImageTransform.Microsoft.gradient( startColorstr='#f4f7f9', endColorstr='#ffffff', GradientType=0);
    /* IE6-9 */

    @media only screen and (max-width: 765px) {
        position: fixed;
        /* Bottom two BG-color and border-bottom were not here before */
        background: #f4f7f9;
        border-bottom: ${ props => 
                            (props.title === ("student") ) ? 
                                "5px solid #931E1D": "5px solid #1E6C93"
                        };
    }

    @media only screen and (max-width: 833px) {
        /* margin-top: -95px; */
        display: inline-block;
    }
`//end NavigationBarHeader

let DashboardHeaderContainer = styled.div`
    /* max-width: 500px; */
    margin: 0px auto;
`//end DashboardHeaderContainer

let DashboardHeader = styled.header`
    position: relative;
    z-index: -1;
    padding: 15px 0;
    border-radius: 5px;
    background-color: white;
    color:  ${ props => 
                (props.title === ("student") ) ? 
                    "#931E1D": "#1E6C93"
            };
    /* margin: 2.5% auto; */
    /* Was 3.5% */
    text-align: center;
    /* background-image: url('../images/Night-shot-w-lights_cropped.jpg');
    background-size: cover; */
    margin-top: -40px;

    @media only screen and (max-width: 765px) {
        margin-top: 95px;
        /*Used to be 150px*/
    }

    @media only screen and (max-width: 833px) {
        margin-top: 0px;
    }
`//end DashboardHeader

let AddToHomeScreenButton = styled.button`
    display: none;
    position: relative;
    /* display: inline-block; */

    background-color: ${ props => 
                            (props.title === ("student") ) ? 
                                "#931E1D": "#1E6C93"
                        };
    color: white;
    border: 0;
    font-size: 1.3em;
    padding: 0.4em 0.6em;
    margin: 0.4em;
    border-radius: 1em;

    &:hover + .tooltip {
    /* visibility: visible; */
    opacity: 1;
}
` //end addToHomeScreenButton

let ToolTip = styled.div`
    display: block;
    /* visibility: hidden; */
    width: 210px;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 6px;
    padding: 0.55em;
    position: absolute;
    z-index: 1;
    left: 47%;
    margin-left: -60px;
    opacity: 0;

    &::after {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent black transparent;
        -webkit-transition: opacity 1s ease-in-out;
        transition: opacity 1s ease-in-out;
    }
`; //end ToolTip

let PortalHeaderText = styled("h1")`
    display: inline-block;
    text-align: center;
    color: ${ props => 
                (props.title === ("student") ) ? 
                    "#931E1D": "#1E6C93"
        };
    
`;

let Greeting = styled("h3")`
    font-size: 1.5em;
    margin: 4px 10px;
    padding: 5px;

    color:  ${ props => 
                (props.title === ("student") ) ? 
                    "#931E1D": "#1E6C93"
            };

    & span {
        font-style: italic;
        font-weight: 800;
    }

    & span span {
        font-size: 1.75em;
    }
`; //end Greeting

let PositionGreeting = styled(Greeting)`
    font-size: 1.05em;
`; //end PositionGreeting

const Header = ( { modifyLogInStatus,...props }) => {
    console.log("Header props:\t" + JSON.stringify(props) );

    let title = props.title;

    return ([
        <NavigationBarHeader>
            <NavigationBar
                modifyLogInStatus={modifyLogInStatus} 
            />
        </NavigationBarHeader>,

        <DashboardHeaderContainer id="back-to-top">
            <DashboardHeader>
                <PortalHeaderText>
                    <strong>
                        {props.districtName || "District"}
                        <span>
                            <h2>
                                {props.headerTitle|| "Portal"}
                            </h2>
                        </span>
                    </strong>
                </PortalHeaderText>
                <Greeting>{ greeting.random() || "Hi"} <span> {props.fullName || "CVUHSD User"}<span>&#9786;</span></span></Greeting>
                <PositionGreeting ><span>{props.title || "User"}</span> from <span>{props.site || "CVUHSD"}</span></PositionGreeting>
                <AddToHomeScreenButton id="addToHomeScreenButton" title={title}>Add to Home Screen</AddToHomeScreenButton>
                <ToolTip className="tooltip" id="addToHomeScreenTooltip">
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
