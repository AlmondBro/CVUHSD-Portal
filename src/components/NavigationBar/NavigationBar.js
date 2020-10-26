import React, { useState, useEffect }  from "react"; //Import React 

import { withRouter, Link } from "react-router-dom";

//Import 3rd-party APIS
import ReactLoading from 'react-loading';

import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css"; //default tooltip styling

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome as home, faLock as lock, faGraduationCap as student, faUser as user, faSignOutAlt as signOut, faUndo as undo } from '@fortawesome/free-solid-svg-icons';

import { staff_HeaderLinks } from "./../../objectFiles/headerListItems.js";

import ChangePassword from "./ChangePassword/ChangePassword.js";

//Import styled components
import { NavBar, NavBarImageWrapper, NavBarLogo, NavBarUL, NavBarUL_Loading, MenuToggle, 
    NavMenuIcon, FirstBar, NavBarListItem, NavBarButton, NavBarListItem_Link, 
    NavBarListItem_StyledLink, NavBarListItem_Li, NavBarListItemLi 
   } from "./NavigationBar_StyledComponents.js";

import isDev from 'isdev';

//TODO: Figure out why bullet point is not rendering

const NavigationBar = ({modifyLogInStatus, modifyRenderAsStudent, clearState, logOut, ...props}) => {
    const  [modalIsOpen, setIsOpen] = useState(false);

    let signOutClearState = () => {
        clearState();
        logOut();
    }; //end signOut()

    let toggleModal = (toggleValue) => {
        setIsOpen(toggleValue);
    }; //end toggleModal

    let generateNavBarListItems = (listItemsArray) => {
        return listItemsArray.map(
            (listItemArrayObject, index) => {
                return ( listItemArrayObject.navShow === true ?
                    <NavBarListItemLi 
                        key={index} 
                        href={listItemArrayObject.href}
                        to={listItemArrayObject.to}
                        linkName={listItemArrayObject.title}
                        districtPosition={props.districtPosition}
                        bulletPointInMobile={true}
                        renderAsStudent={props.renderAsStudent}
                    />: null);
            }
        ); //end map()
    }; //end generateNavBarListItems()

    //TODO: Remove in final production build -- only here to mimic successful login.
    let nullFunction = () => {
        return null;
    }; //end nullFunction()

    let logOutTwo = () => {
        let allowAuth = false;

        console.log("Logging out...button clicked\n\n\n");
        console.log(props);
        console.log("Props:\t" + JSON.stringify(props));
         // let corsProxy = 'https://cors-anywhere.herokuapp.com/';
         let logOut_URL = `${isDev ? "" : "/server" }/logout`
         //let fetchURL = isDev ? corsProxy + request_URL : request_URL;
 
         /*
         let ipHeaders = {
             'Content-Type': 'text'
         }; */
 
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

   //TODO: Look at image link. It should redirect to the student or staff portal.

    return ([
        <NavBar className="navigation-bar" districtPosition={props.districtPosition} renderAsStudent={props.renderAsStudent}>
            <NavBarImageWrapper 
                className="navigation-bar-image-wrapper" 
                districtPosition={props.districtPosition} 
                renderAsStudent={props.renderAsStudent}
            >
                <Link   to="/" 
                        className="navbar-logo-link"
                >
                    <NavBarLogo 
                                className="img-responsive" 
                                id="navbar-logo" 
                                href="#" 
                                src={  props.districtPosition ? 
                                       ( ( (props.districtPosition === "Student") || props.renderAsStudent ) ? "/images/CV-600x600-portal-red.png" : "/images/CV-600x600-portal.png")
                                        : "/images/CV-600x600-portal-red.png"
                                    } 
                    />
                </Link>
            </NavBarImageWrapper>
            { props.districtPosition ? 
                (
                    <NavBarUL className="navigation-bar-ul" districtPosition={props.districtPosition} renderAsStudent={props.renderAsStudent}>
                        <MenuToggle type="checkbox" id="menu-toggle" renderAsStudent={props.renderAsStudent} />
                        <label id="nav-menu-icon-label" htmlFor="menu-toggle" >
                            <NavMenuIcon  className="nav-menu-icon" districtPosition={props.districtPosition} renderAsStudent={props.renderAsStudent}>
                                <FirstBar  className="bar1" districtPosition={props.districtPosition} renderAsStudent={props.renderAsStudent}></FirstBar>
                                <FirstBar className="bar2" districtPosition={props.districtPosition} renderAsStudent={props.renderAsStudent}></FirstBar>
                                <FirstBar className="bar3" districtPosition={props.districtPosition} renderAsStudent={props.renderAsStudent}></FirstBar>
                            </NavMenuIcon>    
                        </label>
                    
                        {/* TODO: Open CVUHSD Home page in a new tab/window */}
                        {(props.districtPosition !== "Student") ? ( 
                            <NavBarListItemLi 
                                href={"https://www.centinela.k12.ca.us"}
                                bulletPointInMobile={true}
                                renderAsStudent={props.renderAsStudent}
                            >
                                
                                CVUHSD <FontAwesomeIcon icon={home} className="icon"/>
                            </NavBarListItemLi>)  
                            : null
                        }

                        {(props.districtPosition.toLowerCase() !== "student") ? ( 
                            <NavBarListItemLi 
                                to={
                                    {
                                        pathname: props.renderAsStudent ? "/staff" : "/student",
                                        state: { renderAsStudent: (props.location.pathname === "/staff") ? "true" : false } 
                                    }
                                }
                                renderAsStudent={props.renderAsStudent}
                                bulletPointInMobile={true} 
                                title={(props.location.pathname === "/staff") ? "Student Portal" : "Staff Portal"}        
                                onClick={ () => {
                                        console.log("NavBarListItemLi onClick -- change renderAsStudent");
                                        modifyRenderAsStudent(!props.renderAsStudent);
                                    }
                                }
                            >
                            
                                <FontAwesomeIcon icon={(props.location.pathname === "/staff") ? student : user} className="icon"/> Portal 
                            </NavBarListItemLi>)  
                            : null
                        }

                        { generateNavBarListItems(staff_HeaderLinks) }

                        
                        {(props.districtPosition.toLowerCase() !== "student") ? ( 
                            <NavBarListItemLi 
                                bulletPointInMobile={true}
                                renderAsStudent={props.renderAsStudent}
                                onClick={() => toggleModal(true) }
                            >
                                <Tooltip
                                    placement={"bottom"}
                                    mouseEnterDelay={0}
                                    mouseLeaveDelay={0.03}
                                    destroyTooltipOnHide={true}
                                    trigger={['hover','click','focus']}
                                    overlay={<div style={{ height: "100%", width: "100%" }}>Change Password</div>}
                                    transitionName={"rc-tooltip-zoom"}
                                >
                                    <NavBarButton   
                                            title={"Change Password"} 
                                            districtPosition={props.districtPosition}
                                            renderAsStudent={props.renderAsStudent}
                                    >
                                        <object 
                                            type="image/svg+xml" 
                                            data="/images/icons/change-password.svg" 
                                            className="change-password-icon svg-inline--fa fa-w-16 icon"
                                        >
                                            Change Password
                                        </object>
                                    </NavBarButton> 
                                </Tooltip>
                            </NavBarListItemLi>)  
                            : null
                        }

                        <NavBarListItemLi 
                            bulletPointInMobile={true}
                            renderAsStudent={props.renderAsStudent}
                            onClick={signOutClearState}
                        >
                            <Tooltip
                                placement={"bottom"}
                                mouseEnterDelay={0}
                                mouseLeaveDelay={0.03}
                                destroyTooltipOnHide={true}
                                trigger={['hover','click','focus']}
                                overlay={<div style={{ height: "100%", width: "100%" }}>Log Out</div>}
                                transitionName={"rc-tooltip-zoom"}
                            >
                                <NavBarButton   
                                        title={"Log Out"}  
                                        districtPosition={props.districtPosition}
                                        renderAsStudent={props.renderAsStudent}
                                >
                                    <FontAwesomeIcon 
                                        icon={signOut} 
                                        className="icon"
                                    /> 
                                </NavBarButton>
                        </Tooltip>
                        
                        </NavBarListItemLi>
                    </NavBarUL>
                ) 
                : (
                    <NavBarUL_Loading>
                        {/* hello */}
                        <ReactLoading 
                            type={"cubes"}
                            height={'30px'} width={'30px'} 
                            color={(props.title !== "Student") ? "#931E1D": "#1E6C93"}
                        /> 
                    </NavBarUL_Loading>
                  )
            }
            
        </NavBar>,
        <ChangePassword 
            modalIsOpen={modalIsOpen}
            toggleModal={toggleModal}

            districtPosition={props.districtPosition}
            renderAsStudent={props.renderAsStudent}
            {...props}
        />
    ]);
}; //end NavigationBar();

export default withRouter(NavigationBar);