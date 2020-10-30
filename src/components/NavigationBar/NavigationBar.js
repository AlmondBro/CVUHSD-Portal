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

const NavigationBar = ({ title, districtPosition, renderAsStudent, modifyLogInStatus, modifyRenderAsStudent, clearState, logOut, ...props }) => {
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

   //TODO: Look at image link. It should redirect to the student or staff portal.

    return ([
        <NavBar 
            className           =   "navigation-bar" 
            districtPosition    =   { districtPosition } 
            renderAsStudent     =   { renderAsStudent}>
            <NavBarImageWrapper 
                className           =   "navigation-bar-image-wrapper" 
                districtPosition    =   { districtPosition } 
                renderAsStudent     =   { renderAsStudent }
            >
                <Link   to          =   "/" 
                        className   =   "navbar-logo-link"
                >
                    <NavBarLogo 
                                className   =   "img-responsive" 
                                id          =   "navbar-logo" 
                                href        =   "#" 
                                src         =   {   districtPosition ? 
                                                        ( ( (districtPosition === "Student") || renderAsStudent ) ? "/images/CV-600x600-portal-red.png" : "/images/CV-600x600-portal.png")
                                                    : "/images/CV-600x600-portal-red.png"
                                                } 
                    />
                </Link>
            </NavBarImageWrapper>
            {   districtPosition ? 
                (
                    <NavBarUL 
                        className           =   "navigation-bar-ul" 
                        districtPosition    =   { districtPosition } 
                        renderAsStudent     =   { renderAsStudent }
                    >
                        <MenuToggle 
                            type            =   "checkbox" 
                            id              =   "menu-toggle" 
                            renderAsStudent =   { renderAsStudent }  
                        />
                        <label 
                                id      =   "nav-menu-icon-label" 
                                htmlFor =   "menu-toggle" 
                        >
                            <NavMenuIcon  
                                className           =   "nav-menu-icon" 
                                districtPosition    =   { districtPosition } 
                                renderAsStudent     =   { renderAsStudent }
                            >
                                <FirstBar  
                                    className           =   "bar1" 
                                    districtPosition    =   { districtPosition } 
                                    renderAsStudent     =   { renderAsStudent }
                                />
                                <FirstBar  
                                    className           =   "bar2" 
                                    districtPosition    =   { districtPosition } 
                                    renderAsStudent     =   { renderAsStudent }
                                />
                                <FirstBar  
                                    className           =   "bar3" 
                                    districtPosition    =   { districtPosition } 
                                    renderAsStudent     =   { renderAsStudent }
                                />
                            </NavMenuIcon>    
                        </label>
                    
                        {/* TODO: Open CVUHSD Home page in a new tab/window */}
                        {
                            (districtPosition !== "Student") ? ( 
                                <NavBarListItemLi 
                                    href                =   { "https://www.centinela.k12.ca.us" }
                                    bulletPointInMobile =   { true }
                                    renderAsStudent     =   { renderAsStudent }
                                >
                                    
                                    CVUHSD <FontAwesomeIcon icon={home} className="icon"/>
                                </NavBarListItemLi>
                                )  : null
                        }

                        {   
                            (districtPosition.toLowerCase() !== "student") ? ( 
                                <NavBarListItemLi 
                                    to={
                                        {
                                            pathname    : props.renderAsStudent ? "/staff" : "/student",
                                            state       : { renderAsStudent: (props.location.pathname === "/staff") ? "true" : false } 
                                        }
                                    }
                                    renderAsStudent     =   { props.renderAsStudent }
                                    bulletPointInMobile =   { true } 
                                    title               =   { (props.location.pathname === "/staff") ? "Student Portal" : "Staff Portal" }        
                                    onClick             =   { () => modifyRenderAsStudent(!props.renderAsStudent) }
                                >
                                
                                    <FontAwesomeIcon 
                                        icon        =   { (props.location.pathname === "/staff") ? student : user } 
                                        className   =   "icon"
                                    /> Portal 
                                </NavBarListItemLi>
                                ) : null
                        }
                        { generateNavBarListItems(staff_HeaderLinks) }
                        
                        { 
                            (districtPosition.toLowerCase() !== "student") ? 
                            ( 
                                <NavBarListItemLi 
                                    bulletPointInMobile =   { true}
                                    renderAsStudent     =   { renderAsStudent}
                                    onClick             =   { () => toggleModal(true) }
                                >
                                    <Tooltip
                                        placement               =   { "bottom" }
                                        mouseEnterDelay         =   { 0 }
                                        mouseLeaveDelay         =   { 0.03 }
                                        destroyTooltipOnHide    =   { true }
                                        trigger                 =   { ['hover','click','focus']}
                                        overlay                 =   {   <div 
                                                                            style   =   {
                                                                                            { 
                                                                                                height: "100%", 
                                                                                                width: "100%" 
                                                                                            }
                                                                                        }
                                                                        >
                                                                            Change Password
                                                                        </div>
                                                                    }
                                        transitionName          =   { "rc-tooltip-zoom" }
                                    >
                                        <NavBarButton   
                                                title               =   { "Change Password" } 
                                                districtPosition    =   {  districtPosition }
                                                renderAsStudent     =   {  renderAsStudent }
                                        >
                                            <object 
                                                type        =   "image/svg+xml" 
                                                data        =   "/images/icons/change-password.svg" 
                                                className   =   "change-password-icon svg-inline--fa fa-w-16 icon"
                                            >
                                                Change Password
                                            </object>
                                        </NavBarButton> 
                                    </Tooltip>
                                </NavBarListItemLi>
                            ) : null
                        }

                        <NavBarListItemLi 
                            bulletPointInMobile =   {   true    }
                            renderAsStudent     =   {   renderAsStudent }
                            onClick             =   {   signOutClearState   }
                        >
                            <Tooltip
                                placement               =   { "bottom" }
                                mouseEnterDelay         =   { 0 }
                                mouseLeaveDelay         =   { 0.03 }   
                                destroyTooltipOnHide    =   { true }
                                trigger                 =   { ['hover','click','focus'] }
                                overlay                 =   {
                                                                <div 
                                                                    style={
                                                                        { 
                                                                            height: "100%", 
                                                                            width: "100%" 
                                                                        }
                                                                    }
                                                                >
                                                                    Log Out
                                                                </div>
                                                            }
                                transitionName={"rc-tooltip-zoom"}
                            >
                                <NavBarButton   
                                        title               =   { "Log Out"}  
                                        districtPosition    =   { districtPosition }
                                        renderAsStudent     =   { props.renderAsStudent }
                                >
                                    <FontAwesomeIcon 
                                        icon        =   { signOut } 
                                        className   =   "icon"
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
                            type    =   { "cubes" }
                            height  =   { '30px' } 
                            width   =   { '30px' } 
                            color   =   { (title !== "Student") ? "#931E1D": "#1E6C93" }
                        /> 
                    </NavBarUL_Loading>
                  )
            }
            
        </NavBar>,
        <ChangePassword 
            modalIsOpen         =   {modalIsOpen}
            toggleModal         =   {toggleModal}

            districtPosition    =   { districtPosition }
            renderAsStudent     =   { renderAsStudent }
                                    {...props}
        />
    ]);
}; //end NavigationBar();

export default withRouter(NavigationBar);