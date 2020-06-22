import React from "react"; //Import React since JSX is being used

//Import 3rd-party APIs
import styled from "styled-components";

let AllLinksGoogleSheet = styled("iframe")`
    width: 50%;
    height: 90vh;
`; //end AllLinksGoogleSheet

let SystemStatuses = styled("iframe")`
    align: "center";
    height: 400px;
    width: 1200px;
    border: 0;
`; //end SystemStatuses


let BlueSectionContainer = styled("section")`
    position: relative;
    text-align: center;
    overflow: hidden;

    & a button,
    & a button img {
        border: 0;
        background-color: transparent;
    }
`; //end BlueSection

let InputCheckBoxHack = styled("input")`
    display: none;

    &:checked+div.blue-section-innerContainer>div.section-content {
        display: table;
    }

    &:checked+div.section-header label>div.open-column-button::after {
            content: '-';
    }

    &+div.section-header label>div.open-column-button::after {
            content: '+';
    }

    &:checked~div#${props => props.buttonRow} {
        margin: 2.5% auto;
        height: 100%;
    }
`; //end CheckboxHack

let StyledButton = styled("button")`
    max-width: 300px;
    
    transition: transform .2s, margin .2s; 
    margin: 0.8% 0%;

    &:hover, &:active, &:focus {
        transform: scale(1.1);
    } 
`; //end StyledButton

const BlueSectionButton = (props) => {
    return (
        <a  href={props.buttonLink} 
            target="_blank" 
            rel="noopener noreferrer"
        >
            <StyledButton>
                <img className="img-fluid" 
                     href={props.buttonLink} 
                     src={"./images/buttons/"+ props.buttonImg} 
                     alt={props.description} 
                     title={props.description}
                />
            </StyledButton>
        </a>
    );
}; //BlueSection()

let SectionHeader = styled("div")`
    background-color: ${ props => 
        (props.title === ("Student") || props.renderAsStudent ) ? 
            "rgb(147, 30, 30)": "rgb(30, 108, 147)"
    };

    /* A nice green: rgb(30, 147, 44) */

    color: white;
    text-align: center;
    padding: 15px 0;
    vertical-align: middle;

    & h3 {
        font-size: 1.7em;
        display: inline;
        font-family: 'Source Sans Pro', 'Lato', sans-serif;
    }
`; //end sectionHeader

let OpenColumnButton = styled("div")`
    cursor: pointer;
    border: 0;
    background: transparent;
    font-size: 2.2em;
    padding: 0px 9px 3px 9px;
    display: inline;
    margin-left: 20px;
    border-radius: 100%;
    background-color: white;
    color: ${ props => 
        ( (props.title === "Student") || props.renderAsStudent ) ? 
            "rgb(147, 30, 30)": "rgb(30, 108, 147)"
    };
`; //end openColumnButton

let ButtonRow = styled("div")`
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    height: 0;
    margin: 0 auto;
    transition: margin 0.5s;
`;

export { BlueSectionContainer, InputCheckBoxHack, BlueSectionButton, SectionHeader, OpenColumnButton, ButtonRow, AllLinksGoogleSheet, SystemStatuses };