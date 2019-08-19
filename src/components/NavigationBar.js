import React from "react";

//Import 3rd-party APIS
import styled from "styled-components";

const NavigationBar = (props) => {
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

        @media only screen and (min-width: 1268px) { 
            &::after {
                content: 'Centinela Valley Union High School District';
                display: inline;
                color: #1e6c93;
                font-size: 1.3em;
                position: absolute;
                bottom: 52px;
                left: 220px;
                /*180px is for Chrome, 220px for Firefox*/
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
                content: "•";
                margin-right: 8px;
                color: rgb(21, 73, 99);
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
        background-color: #1e6c93;
        margin: 6px auto;
        transition: 0.4s;
        color: #1e6c93;
    `;

    return (
        <NavBar className="navigation-bar">
            <NavBarImageWrapper className="navigation-bar-image-wrapper">
                <a className="navbar-logo-link" href="http://portal.centinela.k12.ca.us">
                    <NavBarLogo className="img-responsive" id="navbar-logo" href="#" src="/images/CV-600x600-portal.png" />
                </a>
            </NavBarImageWrapper>
            <NavBarUL className="navigation-bar-ul">
                <MenuToggle type="checkbox" id="menu-toggle" />
                <label id="nav-menu-icon-label" htmlFor="menu-toggle">
                    <NavMenuIcon className="nav-menu-icon">
                        <FirstBar className="bar1"></FirstBar>
                        <FirstBar className="bar2"></FirstBar>
                        <FirstBar className="bar3"></FirstBar>
                    </NavMenuIcon>    
                </label>
                <li><a href="https://www.centinela.k12.ca.us/">CVUHSD Home</a></li>
                {/* <li><a href="https://portal.centinela.k12.ca.us/staff.html">Staff Portal</a></li> */}
                <li className="mobile-collapse-links">
                    <a href="#quickLinks-blueSection">Quick Links</a>
                </li>
                <li className="mobile-collapse-links">
                    <a href="#standardStaffTools-blueSection">Standard Staff Tools</a>
                </li>
                <li className="mobile-collapse-links">
                    <a href="#administratorTools-blueSection">Administrative Tools</a>
                </li>
                <li className="mobile-collapse-links">
                    <a href="#teacherTools-blueSection">Teacher Tools</a>
                </li>
                <li className="mobile-collapse-links">
                    <a href="#classRoomTools-blueSection">Classroom Tools</a>
                </li>
                <li className="mobile-collapse-links">
                    <a href="#learningTools-blueSection">Learning Tools</a>
                </li>
                <li className="mobile-collapse-links">
                    <a href="#digitalTextbooks-blueSection">Digital Textbooks</a>
                </li>
                <li className="mobile-collapse-links">
                    <a href="#mediaResources-blueSection">Digital Library Resources</a>
                </li>
                <li className="mobile-collapse-links">
                    <a href="#schoolWebsites-blueSection">School Websites</a>
                </li>
                <li>
                    <a href="student.html" target="_blank">Student Portal</a>
                </li>
                <li>
                    <a href="troubleshooting.html" target="_blank">Troubleshooting</a>
                </li>
                <li>
                    <a href="#allTools-blueSection">All Links</a>
                </li>
            </NavBarUL>
        </NavBar>
    );
}; //end NavigationBar();

export default NavigationBar;