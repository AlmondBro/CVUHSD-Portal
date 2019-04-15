import React from "react";

const NavigationBar = (props) => {
    return (
        <nav class="navigation-bar">
            <div class="navigation-bar-image-wrapper">
                <a class="navbar-logo-link" href="http://portal.centinela.k12.ca.us">
                    <img class="img-responsive" id="navbar-logo" href="#" src="images/CV-600x600-portal.png" />
                </a>
            </div>
            <ul class="navigation-bar-ul">
                <input type="checkbox" class="checkbox-hack" id="menu-toggle" />
                <label id="nav-menu-icon-label" for="menu-toggle">
                    <div class="nav-menu-icon">
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </div>    
                </label>
                <li><a href="https://www.centinela.k12.ca.us/">CVUHSD Home</a></li>
                {/* <li><a href="https://portal.centinela.k12.ca.us/staff.html">Staff Portal</a></li> */}
                <li class="mobile-collapse-links">
                    <a href="#quickLinks-blueSection">Quick Links</a>
                </li>
                <li class="mobile-collapse-links">
                    <a href="#standardStaffTools-blueSection">Standard Staff Tools</a>
                </li>
                <li class="mobile-collapse-links">
                    <a href="#administratorTools-blueSection">Administrative Tools</a>
                </li>
                <li class="mobile-collapse-links">
                    <a href="#teacherTools-blueSection">Teacher Tools</a>
                </li>
                <li class="mobile-collapse-links">
                    <a href="#classRoomTools-blueSection">Classroom Tools</a>
                </li>
                <li class="mobile-collapse-links">
                    <a href="#learningTools-blueSection">Learning Tools</a>
                </li>
                <li class="mobile-collapse-links">
                    <a href="#digitalTextbooks-blueSection">Digital Textbooks</a>
                </li>
                <li class="mobile-collapse-links">
                    <a href="#mediaResources-blueSection">Digital Library Resources</a>
                </li>
                <li class="mobile-collapse-links">
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