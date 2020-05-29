import React from "react";

//Import 3rd-party packages
import styled from "styled-components";

let FooterStyled = styled('footer')`
    display: flex;
    position: fixed;
    width: 100%;
    top: 95%;
    color: white;
    background-color: #182c3d;
    border-top: 1px solid white;
    flex-direction: row;
    justify-content: flex-start;
    padding: 5px;

    & ul {
        display: flex;
        flex-direction: row;
        justify-content: center;
        text-align: center;
        width: 100%;
    }

    & ul li a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        color: white;
        text-decoration: none;
        margin-left: 10px;
    }


    & ul li {
        color: white; 
    }

    & ul li a:hover {
        text-decoration: underline;
    }

    & ul li a::before {
        content: "•";
        margin: 0px;
        text-decoration: none !important;
    }
`;

let Footer = (props) => {
    return (
        <FooterStyled>  
            <ul>
                <li className="col-md-3">
                    <a href="https://www.centinela.k12.ca.us/" 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    CVUHSD Home
                    </a>
                </li>
                <li className="col-md-3">
                    <a href="http://portal.centinela.k12.ca.us/troubleshooting.html" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title="Troubleshooting"
                    >
                    Troubleshooting
                    </a>
                </li>
                <li className="col-md-3">
                    <a href="http://helpdesk.centinela.k12.ca.us/" 
                        target="_blank" 
                        rel="noopener noreferrer">
                    Helpdesk
                    </a>
                </li>
                <li className="col-md-3">
                    <a href="http://helpdesk.centinela.k12.ca.us/" 
                        target="_blank" 
                        rel="noopener noreferrer">
                    Centinela Security Certificate
                    </a>
                </li>
            </ul>
        </FooterStyled>
    );

}; //end Footer() functional component

export default Footer;