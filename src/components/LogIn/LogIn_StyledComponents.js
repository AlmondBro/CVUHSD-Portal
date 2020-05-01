import React from "react";

import styled from "styled-components";

import ReactLoading from "react-loading";

let Form = styled("form")`
    /* font-family: "Montserrat", sans-serif; */
    max-width: 300px;
    margin: 10px auto;
    text-align: center;
    background-color: #182c3d;
    color: white;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    border-radius: 0.2em;
    border: 2px solid #1f6b92;
`;

let FormHeader = styled("h3")`
    font-family: "Montserrat", sans-serif;
    /* background-color: #213e56; */
    border-bottom: 2px solid white;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
`;

let FormInput = styled("input")`
    font-family: "Montserrat", sans-serif;
    width: 90%;
    padding: 8px; /*was 8px */
    padding-left: 60px;
    text-align: left;

    border: 0;
    appearance: none;

    &::placeholder,
    &::-webkit-input-placeholder,
    &:-ms-input-placeholder  {
        color: #a4becc;
        text-align: center;
        font-family: "Montserrat", sans-serif;
    }

`;

let FormInputLabel = styled("label")`
    cursor: pointer;
    background-color: #eeeeee;
    color: ${ props => 
                                ( (props.districtPosition === "Student") || props.renderAsStudent ) ? 
                                    "#6A1312": "#336186"
                        };
    font-size: 1.2em;
    position: absolute;
    padding: 4px;
    padding-right: 6px;
    margin-top: 0px;
    border-right: 1px solid #182c3d;
    box-shadow: none;
    z-index: 1;
    transition: 0.5s;

    &:hover {
        color: ${ props => 
                    ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                        "#BD2222": "#4785b7"
                };
        background-color: white;
    }
`

let FormButton = styled("button")`
    display: inline-block;
    margin: 5px 3px;
    font-family: "Montserrat", sans-serif;
    border-radius: 5px;
    width: 80px;
    border: 0px;
    padding: 0.5em;
    background-color: #336186;
    color: white;
    transition: background-color 0.5s;
    text-align: center;

    &:hover, &:active, &:focus  {
        background-color:  ${ props => 
                                ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                                "#BD2222": "#4785b7"
                            };
    }
`;

let ResetButton = styled(FormButton)`
    background-color: #757575;

    &:hover {
        background-color: #adadad;  
    }
`;

let PortalLogo = styled("img")`
    max-width: 150px;
    margin: 10px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

let CVUHSDLogo = styled("img")`
    max-width: 70px;
    display: inline-flex;
    margin-right: 37px;
`;

let ResultButton = styled("span")`
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;

    cursor: pointer;
    font-size: 1.5em;
    margin: 0 auto;
    margin-top: 0.3em;
    margin-bottom: 10px;
    background-color: ${props => props.loggedIn ? "white" : "red"};
    max-width: 35px;
    width: 35px;
    height: 35px;
    color: ${props => props.loggedIn ? "#336186" : "white"};
    font-weight: bolder;
    border-radius: 100px;
    text-align: center;
    max-width: 100%;
`;

let ErrorTextAlert = styled("span")`
    display: inline-block;
    color: red;
    font-size: 1.2em;
    font-weight: bold;
    margin-left: 10px;
    max-width: 100%;
`;

let FormHeaderText = styled("p")`
    display: flex;                                                                                                                                                                                                                                                                                                                      
    align-self: center;
`;

let ResultMessage = styled("span")`
    display: block;
    font-size: 0.8em;
    color: white;
    font-family: "Montserrat", sans-serif;

    max-width: 80%;
    margin: 0 auto;
`;


let IPAddress = styled("div")`
    position: relative;
    display: inline-block;
    color: white;
    text-align: center;

    & span {
        font-weight: bolder;
    }
`;

let IPLoadingContainer = styled("span")`
    display: inline-block;
    position: relative;
    margin-left: 5px;
`;

let StyledLoadingContainer = styled("span")`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 8px auto;
    z-index: 1;
`;

const LoadingSpinner = ({ type, color, height, width}) => (
    <StyledLoadingContainer>
        <ReactLoading type={type} color={color} height={height} width={width} />
    </StyledLoadingContainer>  
);

export {    Form, FormHeader, FormInput, FormButton, FormInputLabel, ResetButton, PortalLogo, 
            CVUHSDLogo, ResultButton, ErrorTextAlert, FormHeaderText, ResultMessage, IPAddress, 
            IPLoadingContainer, StyledLoadingContainer, LoadingSpinner 
        }