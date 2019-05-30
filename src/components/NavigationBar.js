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

    return (
        <NavBar className="navigation-bar">
            <div className="navigation-bar-image-wrapper">
                <a className="navbar-logo-link" href="http://portal.centinela.k12.ca.us">
                    <img className="img-responsive" id="navbar-logo" href="#" src="./images/CV-600x600-portal.png" />
                </a>
            </div>
            <ul className="navigation-bar-ul">
                <input type="checkbox" className="checkbox-hack" id="menu-toggle" />
                <label id="nav-menu-icon-label" htmlFor="menu-toggle">
                    <div className="nav-menu-icon">
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>    
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
            </ul>
        </NavBar>
    );
}; //end NavigationBar();

export default NavigationBar;