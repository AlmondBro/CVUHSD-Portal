import React, { useState, Fragment }  from "react"; //Import React 

import { withRouter, Link } from "react-router-dom";

//Import 3rd-party APIS
import ReactLoading from 'react-loading';

import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css"; //default tooltip styling

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome as home, faGraduationCap as student, faUser as user, faSignOutAlt as signOut, faLaptop } from '@fortawesome/free-solid-svg-icons';

import { staff_HeaderLinks } from "./../../objectFiles/headerListItems.js";

import ChangePassword from "./ChangePasswordModal/ChangePasswordModal.js";
import SupportRequestModal from './SupportRequestModal/SupportRequestModal.js';
//Import styled components
import  {    
            NavBar, NavBarImageWrapper, NavBarLogo, NavBarUL, NavBarUL_Loading,
            NavMenuIcon, FirstBar, NavBarButton, NavBarListItemLi, MenuToggle 
        }   from "./NavigationBar_StyledComponents.js";


//TODO: Figure out why bullet point is not rendering

const NavigationBar = ({ fullName, title, email, site, districtPosition, renderAsStudent, location, modifyLogInStatus, modifyRenderAsStudent, notify, clearState, logOut }) => {
    const  [ changePasswordModalIsOpen, setChangePasswordModalIsOpen ] = useState(false);
    const  [ supportRequestModalIsOpen, setSupportRequestModalIsOpen ] = useState(false);

    let signOutClearState = () => {
        clearState();
        logOut();
    }; //end signOut()

    let toggleChangePasswordModal = (toggleValue) => {
        setChangePasswordModalIsOpen(toggleValue);
    }; //end toggleModal

    
    let toggleSupportRequestModal = (toggleValue) => {
        setSupportRequestModalIsOpen(toggleValue);
    }; //end toggleModal

    let generateNavBarListItems = (listItemsArray) => {
        return listItemsArray.map(
            (listItemArrayObject, index) => {
                return ( listItemArrayObject.navShow === true ?
                    <NavBarListItemLi 
                        key                 =   { index} 
                        href                =   { listItemArrayObject.href}
                        to                  =   { listItemArrayObject.to}
                        linkName            =   { listItemArrayObject.title}
                        districtPosition    =   { districtPosition}
                        bulletPointInMobile =   { true}
                        renderAsStudent     =   { renderAsStudent}
                    />: null);
            }
        ); //end map()
    }; //end generateNavBarListItems()

    //TODO: Remove in final production build -- only here to mimic successful login.
    let nullFunction = () => {
        return null;
    }; //end nullFunction()

   //TODO: Look at image link. It should redirect to the student or staff portal.

    return (
        <Fragment>
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
                                        to                  =   {
                                                                    {
                                                                        pathname    : renderAsStudent ? "/staff" : "/student",
                                                                        state       : { renderAsStudent: (location.pathname === "/staff") ? "true" : false } 
                                                                    }
                                                                }
                                        renderAsStudent     =   { renderAsStudent }
                                        bulletPointInMobile =   { true } 
                                        title               =   { (location.pathname === "/staff") ? "Student Portal" : "Staff Portal" }        
                                        onClick             =   { () => modifyRenderAsStudent(renderAsStudent) }
                                    >
                                    
                                        <FontAwesomeIcon 
                                            icon        =   { (location.pathname === "/staff") ? student : user } 
                                            className   =   "icon"
                                        /> Portal 
                                    </NavBarListItemLi>
                                    ) : null
                            }

                            { generateNavBarListItems(staff_HeaderLinks) }

                            <NavBarListItemLi 
                                bulletPointInMobile =   {   true    }
                                renderAsStudent     =   {   renderAsStudent }
                                onClick             =   {   () => toggleSupportRequestModal(true) }
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
                                                                        Submit a helpdesk request for tech support 
                                                                        <div  style={
                                                                                {
                                                                                    display: "inline-block",
                                                                                    marginLeft: "5px"
                                                                                }
                                                                            }>
                                                                            <FontAwesomeIcon 
                                                                                icon        =   { faLaptop } 
                                                                                className   =   "icon"
                                                                            /> 
                                                                        </div>
                                                                        
                                                                    </div>
                                                                }
                                    transitionName={"rc-tooltip-zoom"}
                                >
                                    <NavBarButton   
                                            title               =   { "Support Request"}  
                                            districtPosition    =   { districtPosition }
                                            renderAsStudent     =   { renderAsStudent }

                                    >   Submit Support Request
                                        {/* <FontAwesomeIcon 
                                            icon        =   { faLaptop } 
                                            className   =   "icon"
                                        />  */}
                                    </NavBarButton>
                                </Tooltip>
                            </NavBarListItemLi>
                            { 
                                (districtPosition.toLowerCase() !== "student") ? 
                                ( 
                                    <NavBarListItemLi 
                                        bulletPointInMobile =   { true}
                                        renderAsStudent     =   { renderAsStudent }
                                        onClick             =   { () => toggleChangePasswordModal(true) }
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
                                            renderAsStudent     =   { renderAsStudent }
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
                
            </NavBar>
            
            <SupportRequestModal 
                modalIsOpen         =   { supportRequestModalIsOpen }
                toggleModal         =   { toggleSupportRequestModal }

                fullName            =   { fullName }
                email               =   { email }
                site                =   { site }
                districtPosition    =   { districtPosition }
                renderAsStudent     =   { renderAsStudent }  
                notify              =   { notify }                
            />
            {
                (districtPosition.toLowerCase() !== "student") ? (
                        <ChangePassword 
                            modalIsOpen         =   { changePasswordModalIsOpen }
                            toggleModal         =   { toggleChangePasswordModal }
            
                            districtPosition    =   { districtPosition }
                            email               =   { email }
                            renderAsStudent     =   { renderAsStudent }                 
                        />
                    ) : null
            }
        </Fragment>
    ); //end return statement
}; //end NavigationBar();

export default withRouter(NavigationBar);