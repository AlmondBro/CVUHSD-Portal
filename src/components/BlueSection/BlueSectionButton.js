import React from "react"; //Import React since JSX is being used

import styled from "styled-components";
let StyledButton = styled("button")`
    transition: transform .2s, margin .2s; 

    &:hover, &:active, &:focus {
        transform: scale(1.1);
        margin: 0.5em 0.2em;
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

export default BlueSectionButton;