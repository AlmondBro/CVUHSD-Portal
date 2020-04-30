import React from "react"; //Import React since JSX is being used

import styled from "styled-components";
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

export default BlueSectionButton;