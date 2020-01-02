import React from "react"; //Import React 

//Import 3rd-party APIS
import styled from "styled-components";

import { staff_HeaderLinks } from "./../objectFiles/headerListItems.js"; 

import isDev from 'isdev';

const NavigationBar = ({modifyLogInStatus, ...props}) => {
    let NavBar = styled.nav`
        display: inline-block;

        & ul li {
            display: inline-block;
            margin: 0 15px;
            font-size: 1.2em;
        }

        &>ul li.mobile-collapse-links {
            display: none;
        }

        @media only screen and (max-width: 833px) {
            display: inline;

            & ul {
                position: relative;
                bottom: 60px;
                left: 15%;
                margin-bottom: -52px;
                z-index: 1;
                max-height: 320px;
                overflow-y: auto;
                /*Used to be -25px, now it's -50px */
                /*margin-bottom Used to be -10px */
            }

            & ul li {
                display: none;
                margin: auto;
            }

            &&>nav>ul>li:nth-child(3) {
                margin-top: 55px;
            }
        }
    `; //end NavBar

    let NavBarImageWrapper = styled.div`
        margin-top: 5px;

        @media only screen and (max-width: 833px) {
            .navigation-bar-image-wrapper {
                display: inline;
            } 
        }

        @media only screen and (min-width: 1000px) { 
          &::after {
                content: 'Centinela Valley Union High School District';
                display: inline;
                color: ${ props => 
                            (props.districtPosition === ("student") ) ? 
                                "#931E1D": "#1E6C93"
                        };
                font-size: 1.3em;
                position: absolute;
                bottom: 52px;
                left: 220px;
    
                font-weight: bold;
            } 
        }
    `; //end navBarImageWrapper

    let NavBarLogo = styled.img`
        height: 100px;
        /* Was 50px */
        width: auto;

        margin-left: 50%;
        margin-top: 8px;

        @media only screen and (max-width: 833px) { 
            display: inline;
            vertical-align: middle;
            margin-left: 25%;
            position: relative;
            z-index: 2;
        }
    `; //end NavBar logo

    let NavBarUL = styled.ul`
        position: absolute;
        top: 50%;
        margin-top: -0.5em;
        /*-1/2 of line-height */
        right: 0px;
        padding-right: 2.5%;

        @media only screen and (max-width: 833px) { 
            &&>li~li::before {
            content: ${props.bulletPointInMobile ? "•" : null };
                margin-right: 8px;
                color: ${ props => (props.districtPosition === "student") ? 
                           "#931E1D" : "#154963"
                };
            }
        }
    `; //end NavBarUL

    let MenuToggle = styled.input`
        display: none;

        /* Rotate First Bar */
        &:checked~label .nav-menu-icon .bar1 {
            -webkit-transform: rotate(-45deg) translate(-9px, 6px);
            transform: rotate(-45deg) translate(-9px, 6px);
        }

        /* Fade out second bar */
        &:checked~label .nav-menu-icon .bar2 {
            opacity: 0;
        }

                
        /*Rotate last bar */
        &:checked~label .nav-menu-icon .bar3 {
            -webkit-transform: rotate(45deg) translate(-8px, -8px);
            transform: rotate(45deg) translate(-8px, -8px);
        }

        @media only screen and (max-width: 833px) {
            &:checked~li {
                /*margin: 0 60px; */
                display: block;
                border: 0;
                border-radius: 0;
                animation: fadeIn 0.8s ease-in-out;
                padding: 15px 0;
            }
        }
    `; //end CheckBoxHack

    let NavMenuIcon = styled.div`
        display: none;

        @media only screen and (max-width: 833px) {
            display: block;
            cursor: pointer
        }  
    `; //end NavMenuIcon

    let FirstBar = styled.div`
        width: 35px;
        height: 5px;
        margin: 6px auto;
        transition: 0.4s;

        background-color: ${ props => 
                                (props.districtPosition === ("student") ) ? 
                                    "#931E1D": "#1E6C93"
                            };
        color: ${ props => 
                                (props.districtPosition === ("student") ) ? 
                                    "#931E1D": "#1E6C93"
                            };
    `;

    let NavBarListItem = styled("a")`
        color: ${ props => 
                    (props.districtPosition === ("student") ) ? 
                        "#A01C1C": "#3B709A"
                };
        text-decoration: none;
    `; 

    let LogOutButton = styled("button")`
        font-size: 0.9em;
        color: white;
        background-color: ${ props => 
                                (props.districtPosition === ("student") ) ? 
                                    "#931E1D": "#1E6C93"
                            };
        padding: 0.5em 0.7em;
        border: 0px;
        border-radius: 3px;

        transition: background-color 0.5s;

        &:hover {
            background-color: ${ props => 
                                (props.districtPosition === ("student") ) ? 
                                    "#BD2222": "#2588b9"
                            };
        }
    `; //end LogOut Button

    let NavBarListItemLi = (props) => {
        return (
            <li>
                <NavBarListItem href={props.href || null} 
                                districtPosition={props.districtPosition}
                >
                    {props.linkName || props.children}
                </NavBarListItem>
            </li>
        );
    };

    let generateNavBarListItems = (listItemsArray) => {
        return listItemsArray.map(
            (listItemArrayObject, index) => {
                return ( listItemArrayObject.navShow === true ?
                    <NavBarListItemLi 
                        key={index} 
                        href={listItemArrayObject.href}
                        linkName={listItemArrayObject.title}
                        districtPosition={props.districtPosition}
                    />: null);
            }
        ); //end map()
    }; //end generateNavBarListItems()

    //TODO: Remove in final production build -- only here to mimic successful login.
    let nullFunction = () => {
        return null;
    }; //end nullFunction()

    let logOut = () => {
        let allowAuth = false;

        console.log("Logging out...button clicked\n\n\n");
        console.log(props);
        console.log("Props:\t" + JSON.stringify(props));
         // let corsProxy = 'https://cors-anywhere.herokuapp.com/';
         let logOut_URL = `${isDev ? "" : "/server" }/logout`
         //let fetchURL = isDev ? corsProxy + request_URL : request_URL;
 
         let ipHeaders = {
             'Content-Type': 'text'
         };
 
         fetch(logOut_URL, {
            method: 'POST',
            credentials: 'include',
            mode: 'no-cors'
             //headers: ipHeaders
         }).then((response) => { 
             console.log("GetIP Block 1");
             console.log("Response:\t" + JSON.stringify(response));
             return response.json();
         }).then( (response) => {
             console.log("GetIP Block 2");
             console.log("Response:\t" + JSON.stringify(response));
             console.log("Logging out");
             modifyLogInStatus(null);
             //this.setState({logInSuccess: `${!response.logOutSuccess}`});
         }).catch( (error) => {
             console.log("GetIP Block 3");
             console.log(`Error:\t ${error}`);
         });  

         return (isDev && allowAuth) ? modifyLogInStatus(null): nullFunction(); 

     }; //end getIPAddress()

   // <li><a href="https://www.centinela.k12.ca.us/">CVUHSD Home</a></li>

    return (
        <NavBar className="navigation-bar" districtPosition={props.districtPosition}>
            <NavBarImageWrapper  className="navigation-bar-image-wrapper" districtPosition={props.districtPosition}>
                <a href="http://portal.centinela.k12.ca.us" 
                   className="navbar-logo-link"
                >
                    <NavBarLogo 
                                className="img-responsive" 
                                id="navbar-logo" 
                                href="#" 
                                src={ ( props.districtPosition === "student" ) ? "/images/CV-600x600.png" : "/images/CV-600x600-portal.png"} />
                </a>
            </NavBarImageWrapper>
            <NavBarUL className="navigation-bar-ul" districtPosition={props.districtPosition}>
                <MenuToggle type="checkbox" id="menu-toggle" />
                <label id="nav-menu-icon-label" htmlFor="menu-toggle" >
                    <NavMenuIcon  className="nav-menu-icon" districtPosition={props.districtPosition}>
                        <FirstBar  className="bar1" districtPosition={props.districtPosition}></FirstBar>
                        <FirstBar className="bar2" districtPosition={props.districtPosition}></FirstBar>
                        <FirstBar className="bar3" districtPosition={props.districtPosition}></FirstBar>
                    </NavMenuIcon>    
                </label>

                { generateNavBarListItems(staff_HeaderLinks) }
                <NavBarListItemLi 
                    bulletPointInMobile={true}
                >
                      <LogOutButton   title={"Log Out"} 
                                onClick={logOut} 
                                districtPosition={props.districtPosition}
                    >
                        Logout
                    </LogOutButton>
                </NavBarListItemLi>
              
            </NavBarUL>
        </NavBar>
    );
}; //end NavigationBar();

export default NavigationBar;