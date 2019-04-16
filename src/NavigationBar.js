import React from "react";

const NavigationBar = (props) => {
    return (
        <nav className="navigation-bar">
            <div className="navigation-bar-image-wrapper">
                <a className="navbar-logo-link" href="http://portal.centinela.k12.ca.us">
                    <img className="img-responsive" id="navbar-logo" href="#" src="images/CV-600x600-portal.png" />
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
                    <a href="#classNameRoomTools-blueSection">classNameroom Tools</a>
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
        </nav>
    );
}; //end NavigationBar();

export default NavigationBar;