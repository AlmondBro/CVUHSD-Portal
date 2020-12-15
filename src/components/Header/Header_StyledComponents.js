import React from "react";
import styled, { keyframes } from "styled-components";
//TODO: Add little picture on position that reflects the school/site the user is from

let NavigationBarHeader = styled("header")`
        position: relative;
        width: 100%;
        /* Bottom three BG-color and margin bottom rules, and border-bottom were not here before */
        /* background-color: #f4f7f9; */
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
        border-bottom: ${ props => props.districtPosition ?
                                   ( ( (props.districtPosition === "Student") || props.renderAsStudent ) ? 
                                        "5px solid #931E1D": "5px solid #1E6C93")
                                    : "5px solid #931E1D"
                        };
        transition: border-color 0.5s;
    }

    @media only screen and (max-width: 833px) {
        /* margin-top: -95px; */
        display: inline-block;
        padding: 0px;
    }
`//end NavigationBarHeader

let DashboardHeaderContainer = styled("div")`
    margin: 0;
    width: 100%;
    
`//end DashboardHeaderContainer

let DashboardHeader = styled("header")`
    position: relative;
    z-index: 0;
    padding: 15px 0;
    border-radius: 5px;
    background-color: white;
    color:  ${ props => 
                ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                    "#931E1D": "#1E6C93"
            };
    /* margin: 2.5% auto; */
    /* Was 3.5% */
    text-align: center;
    /* background-image: url('../images/Night-shot-w-lights_cropped.jpg');
    background-size: cover; */

    @media only screen and (max-width: 765px) {
        margin-top: 115px;
        /*Used to be 150px*/
    }

    ::after {
        content: "";

        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0;
        right: 0;
        z-index: -1;
  
        background-image: url("./images/cvuhsd-allStudents-ready.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        opacity: ${props => props.districtPosition ? 0.1 : 0};
        max-width: 100%;
        width: 100%;

        margin: 0 auto;
      
    }
`;//end DashboardHeader

let AddToHomeScreenButton = styled("button")`
    display: none;
    position: relative;
    /* display: inline-block; */

    background-color: ${ props => 
                            ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                                "#931E1D": "#1E6C93"
                        };
    transition: background-color 0.5s;
    
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

let ToolTip = styled("div")`
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
    position: relative;
    z-index: 1;
    display:  ${props => props.display || "block" } ;
    text-align: center;
    color: ${ props => props.districtPosition ? 
                        ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                            "#931E1D": "#1E6C93" 
                        : "#931E1D"
        };
    transition: color 0.5s;

    font-size: 2em;
    h2 {
        margin-top: 3px;
        font-size: 1.7rem;
    }
`;

let Greeting = styled("h3")`
    display: inline-block;
    font-size: 1.5em;
    margin: 4px 10px;
    padding: 5px;

    color:  ${ props => props.districtPosition ?
                            (props.districtPosition === ("Student") || props.renderAsStudent) ? 
                                "#931E1D": "#1E6C93"
                            : "#931E1D" 
                        };
    transition: color 0.5s;

    & span {
        font-style: italic;
        font-weight: 800;
    }

    & span span {
        font-size: 1.75em;
    }
`; //end Greeting

let PositionGreeting = styled(Greeting)`
    display: ${props => props.districtPosition ? "block" : "inline-block"};
    font-size: 1.05em;
    transition: color 0.5s;
`; //end PositionGreeting

let SchoolLogo = styled("img")`
    cursor: pointer;
    max-width: 60px;
    margin-left: 10px;
    vertical-align: bottom;
`;

/* Cofee Animation */
const fillAnimation = keyframes`
      0% {
    border-bottom: 0px solid #8B4C39;
  }
  50% {
    border-bottom: 80px solid #8B4C39;
  }
  60% {
    border-bottom: 80px solid #8B4C39;
  }
  90% {
    border-bottom: 0px solid #8B4C39;
  }
  100% {
    border-bottom: 0px solid #8B4C39;
  }
`; //end fillAnimation

const rotateAnimation = keyframes`
         0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(0deg);
  }
  65% {
    transform: translate(0px, 120px) rotate(180deg);
  }
  90% {
    transform: translate(0px, 120px) rotate(180deg);
  }
  100% {
    transform: translate(0px, 0px) rotate(0deg);
  }
`; //end rotateAnimation


const dropAnimation = keyframes`
              0% {
    transform: translate(0px, -70px) rotate(45deg);
  }
  100% {
    transform: translate(0px, 130px) rotate(45deg);
  }
`; //end dropAnimation


const dropAnimation2 = keyframes`
  0% {
    transform: translate(0px, -70px);
  }
  100% {
    transform: translate(0px, 130px);
  }
`; //end dropAnimation2

let CofeeBeans = styled("div")`
    margin: 20px auto;
    width: 35px;
    height: 50px;
    background: #8B4C39;
    border-radius: 50%;
    animation: ${dropAnimation2} 1s ease-in infinite;

    :before {
        left: 18px;
        width: 3px;
        border-radius: 50%;
        height: 98%;
        background: #5E2605;
        transform: rotate(-5deg);
    }
    
`; //end CofeeBeans

let Grinder = styled("div")`
    height: 120px;
    width: 200px;
    border-radius: 5px 5px 80px 80px;
    background: #931E1D;

    :before {
        left: 40px;
        top: 110px;
        width: 120px;
        height: 15px;
        border-radius: 30px;
        background: #1D1D1D;
    }


    :after {
        z-index: 99;
        left: 40px;
        top: 125px;
        width: 120px;
        height: 15px;
        border-radius: 30px;
        background: #1D1D1D;
    }

`; //end Grinder

let GrinderBottom = styled("div")`
    margin: 15px auto 80px;
    height: 120px;
    width: 200px;
    border-radius: 80px 80px 5px 5px;
    background: rgba(255, 255, 255, 0.7);
    /* animation: ${rotateAnimation} 10s ease-out infinite; */

    :before {
        bottom: -50px;
        width: 200px;
        height: 60px;
        border-radius: 0px 0px 50px 50px;
        background: #1d1d1d;
    }

    :after {
        top: 10px;
        left: 10px;
        width: 180px;
        height: 100px;
        border-radius: 85px 85px 0px 0px;
        background: rgba(0, 0, 0, 0);
        animation: ${fillAnimation} 10s ease-in-out infinite;   
    }
`;

let V60 = styled("div")`
    z-index: 99;
    width: 250px;
    height: 170px;
    border-top: 140px solid white;
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;
    border-radius: 5px;

    :before {
        top: -135px;
        right: -90px;
        width: 80px;
        height: 115px;
        border: 15px solid white;
        border-radius: 50%;
        transform: rotate(45deg);
    }

    :after {
        position: absolute;
        z-index: 99;
        content: '';
        width: 220px;
        height: 15px;
        background: white;
        left: -45px;
        border-radius: 60px;
    }
`; //end V60

let Drip = styled("div")`
    margin: 0 auto 10px;
    width: 20px;
    height: 20px;
    background: #8B4C39;
    border-radius: 0 50% 50% 50%;
    animation: ${dropAnimation} 1s ease-in infinite;
`;


let CoffeeCup = styled("div")`
    margin: 40px auto;
    width: 190px;
    height: 150px;
    background: #B7C3D0;
    border-radius: 5px 5px 80px 80px;  

    :after {
        top: 10px;
        right: -45px;
        width: 60px;
        height: 80px;
        border: 15px solid #B7C3D0;
        border-radius: 70px;
    }
    
`;

let CoffeeAnimationContainer = styled("section")`
    width: 100%;

    > *.coffee-row {
        position: relative;
        margin: 0 auto;
    }

    > *:before,
    > *:after {
        position: absolute;
        content: '';
    }
`;

// This animation is courtesy of Laura Robertson. All work accredited to the author.
//Source: https://codepen.io/LauraRobertson/pen/OpOjxB
let CoffeeAnimation = () => {
    return (
        <CoffeeAnimationContainer className="cofeeAnimation-container">
            <CofeeBeans className="coffee-row coffee-beans"/>
            <Grinder className="coffee-row grinder"/>
            {/* <GrinderBottom className="coffee grinder-bottom"/> */}
            {/* <V60 className="coffee-row v60"/>
            <Drip className="coffee-row drip"/>
            <CoffeeCup className="coffee-row cup"/> */}
        </CoffeeAnimationContainer>  
    ); //end return statement
};


const PositionSiteInfo = styled("section")`
    position: relative;
    display:  ${props => props.display || "inline-block" } ;
`;

const Divider = styled("hr")`
    width: 25%;
    margin: 0 auto;
    margin-top: 25px;

    background-color:  ${ props => 
                ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                    "#931E1D": "#1E6C93"
            };

    opacity: 0.5;
`;


export { NavigationBarHeader, DashboardHeaderContainer, DashboardHeader, AddToHomeScreenButton, ToolTip, PortalHeaderText, Greeting, PositionGreeting, SchoolLogo, PositionSiteInfo, Divider, CoffeeAnimation }