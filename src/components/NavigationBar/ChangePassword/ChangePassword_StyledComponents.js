import styled from "styled-components";


import { Form, FormHeader, FormInput, FormButton, FormInputLabel, ResetButton, PortalLogo, 
    CVUHSDLogo, ResultButton, ErrorTextAlert, FormHeaderText, ResultMessage, IPAddress, 
    IPLoadingContainer, StyledLoadingContainer, LoadingSpinner } from "./../../LogIn/LogIn_StyledComponents.js";


let ChangePassword_Form = styled(Form)`
    background-color: rgba(24,44,61, 0.9);
    /* rgba(83,147,195, 0.7); */
    border-radius: 0.2em;
    border: 0;

    & fieldset > legend {
        width: 90%;
        margin: 0;
        padding: 0;
    }
`;

let ChangePassword_FormHeader = styled(FormHeader)`
    margin-bottom: 15px;
    padding-bottom: 7px;

    & > p {
        margin-bottom: 0px;
    }
`;

let ChangePassword_FormButton = styled(FormButton)`
   width: 90%;
`;

let ChangePassword_ResetButton = styled(ResetButton)`
   width: 90%;
`;

let ChangePassword_CloseButton = styled(FormButton)`
    position: absolute;
    left: 90%;
    bottom: 92%;

    display: block;
    border: 0;
    padding: 3%;
    width: 50px;
    height: 50px;
    font-size: 1em;
    margin: 0;
    background-color: #0b74a7;
    color: white;
    /* margin: 0 auto; */
    border-radius: 100%;
`;

let ChangePassword_Divider = styled("hr")`
    background-color: white;
    width: 90%;

    /* margin: 1.5rem 0rem; */
`;

let ChangePassword_SubmitResetButtonsContainer = styled("p")`
    margin-top: 10%;
`;

let ChangePassword_FormInput = styled(FormInput)`
    padding-left: 15%;
    font-size: 0.9em;

    border: 0;
    appearance: none;
    
    & ::placeholder {
        font-size: 0.9em;
    }

`;

export { Form, FormHeader, FormInput, FormButton, FormInputLabel, ResetButton, PortalLogo, 
    CVUHSDLogo, ResultButton, ErrorTextAlert, FormHeaderText, ResultMessage, IPAddress, 
    IPLoadingContainer, StyledLoadingContainer, LoadingSpinner, 

    ChangePassword_FormInput, ChangePassword_SubmitResetButtonsContainer, ChangePassword_FormButton, ChangePassword_ResetButton, ChangePassword_CloseButton, ChangePassword_Form, ChangePassword_FormHeader, ChangePassword_Divider};