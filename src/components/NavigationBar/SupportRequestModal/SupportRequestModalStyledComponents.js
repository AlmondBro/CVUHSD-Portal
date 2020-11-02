import styled from 'styled-components';
import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { isSafari, isChromeBrowser as isChrome } from  './../../../utilityFunctions.js';

Modal.setAppElement('#cvuhsd-sso-portal');

// let isSafari, isChrome = false;

const TransferToITModalContainer = styled(Modal).attrs(props => ({
    // title: (props) => props.title,
    // onAfterOpen: (props) => props.onAfterOpen,
    // onRequestClose: (props) => props.onRequestClose,
    contentLabel: props.contentLabel,

    portalClassName: props.portalClassName,
    overlayClassName: props.overlayClassName,

    className: props.className,
    bodyOpenClassName: props.bodyOpenClassName,
    htmlOpenClassName: props.htmlOpenClassName,
    parentSelector: props.parentSelector,

    style:{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 10,
            }

    }
  }))
`
    position            : absolute;
    top                 : 50%;
    left                : 50%; 
    transform           : translate(-50%, -50%);  

    display             : flex;
    flex-direction      : column;
    justify-content     : center;
    align-content       : center;

   
  
    width               : 80%;

    border              : 0px;
    border-radius       : 10px;

    background-color: white;

    box-shadow: 5px 5px 30px -11px rgba(0,0,0,0.75);

    outline: none;

    -webkit-overflow-scrolling: touch;

    :focus {
        border: 0px;
        outline: none;
    }
`; //end TransferToITModalContainer

const CloseButton = styled('button')`
    position: absolute;
    top: 0;
    left: 97%;

    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    color: #B41A1F;
    background-color: transparent;

    font-size: 1.4em;

    margin: 0;
    margin-left: auto;

    padding: 0;
    padding-right: 15px;
    padding-top: 7px;

    border: 0px;
    outline: 0px;

    :hover {
        cursor: pointer;
    }
`;

const Form = styled('form')`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
`; 

const ModalTitle = styled('h3')`
    display: inline-block;
    color: #B41A1F;

    font-size: 1.5em;

    margin: 0px;
    margin-bottom: 10px;

    padding: 0px;
`; 

const SelectDropDownArrow = styled('div')`
    position: relative;
  /*Don't really need this just for demo styling*/

    &:after {
        position: absolute;
        top: ${ (isSafari || isChrome) ? `0%;` : `0%;`};
        left: 80%;

        color: #B41A1F;
    
        ${ (isSafari || isChrome) ? null : `font-family: "Font Awesome 5 Free"`};
        ${ (isSafari || isChrome) ? `font-weight: bold;` : null};
        ${ (isSafari || isChrome) ? `content: "\u2193"` : `content: '\f107';`};

        pointer-events: none;
    }
`;

const Select = styled('select')`
    appearance: none;
    color: #B41A1F;
    font-style: italic;

    max-width: 100%;

    border-width: 0px;
    border-color: rgba(147,30,29,0.21);
    border-radius: 10px;

    outline: 0px;

    margin-top: 0px;

    padding: 0px 15px;
    padding-left: 5px;
    /* 10px 15px 10px 4px; */

    /* box-shadow: 5px 5px 30px -11px rgba(0,0,0,0.75); */

    &:after {
        content: '\f078';
        font: normal normal normal 17px/1 FontAwesome;
        color: #0ebeff;
        right: 11px;
        top: 6px;
        height: 34px;
        padding: 15px 0px 0px 8px;
        border-left: 1px solid #0ebeff;
        position: absolute;
        pointer-events: none;
    }

    /* IE11 hide native button (thanks Matt!) */
    &::-ms-expand {
        display: none;
    }
`;

const SubmitButton = styled('button')`
    max-width: 150px;
    color: white;
    background-color: #B41A1F;

    padding: 8px;
    border-radius: 10px;

    outline: 0px;
    border: 0px;
    margin-top: 15px;


    transition: 350ms ease-in-out background-color;

    :hover {
        cursor: pointer;
        background-color: rgba(180, 26, 31, 0.9);
    }
`;


const FAIconStyled = styled(FontAwesomeIcon)`
   color: #B41A1F;
   margin-left: 10px;

   font-size: ${props => props.fontSize ? props.fontSize : "1.0em"};
`;

const TransferResultMessage = styled('p')`
    margin: 0px;
    margin-bottom: 8px;

    padding: 0px; 
    color: #B41A1F;

    font-weight: bold;

    text-align: center;
`;

const NoCVTechsMessage = styled('p')`
    margin: 0px;
    margin-top: 8px;

    padding: 0px; 
    color: #B41A1F;

    font-style: italic;

    text-align: center;
`;

const InputSection = styled('p')`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    
    width: 100%;
    padding: 0% 5%;

`;

const StyledLabel = styled('label')`
    width: 30%;
`;

const StyledHeader = styled('h3')`
    font-size: 1em;
    font-weight: bold;
    margin-right: 10px;
    color:      ${ props => props.title ?
                                    ( (props.title === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
                        }; 
`;

const StyledInput = styled('input')`
    width: 70%;

    border: 1px;
    border-style: solid;
    border-color: rgba(147, 30, 29, 0.21);
    /* #d8d8d8 */
    border-radius: 10px;

    outline: 0px; 

    padding: 5px 5px 5px 10px;
   
    /* #EFEFEF; */
    
    /* ${ props => props.title ?
                                    ( (props.title === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
                        }; */

    color: black;
`;

const StyledTextArea = styled('textarea')`
    width: 70%;

    border: 1px;
    border-style: solid;
    border-color: rgba(147, 30, 29, 0.21);
    /* #d8d8d8 */
    border-radius: 10px;

    outline: 0px; 

    padding: 5px 5px 5px 10px;
   
    /* #EFEFEF; */
    
    /* ${ props => props.title ?
                                    ( (props.title === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
                        }; */

    color: black;
`;


const ModalTextInputField = ({ title, inputType, placeholder, textArea, description, rows, cols, name, value, onChange }) => {
    return (
        <InputSection>
            <StyledLabel>
                <StyledHeader> { title } </StyledHeader>
            </StyledLabel>
            {
                textArea ? (
                    <StyledTextArea
                        name        =   { name }
                        placeholder =   { placeholder }
                        rows        =   { rows || "4"}
                        cols        =   { cols || "30"}

                        value       =   { value }
                        onChange    =   { onChange }
                    >
                        { description }
                    </StyledTextArea>
                ) : ( 
                    <StyledInput 
                        name        =   { name }
                        type        =   { inputType || "text" } 
                        placeholder =   { placeholder } 
                        
                        value       =   { value }
                        onChange    =   { onChange }
                    />
                )
            }
        </InputSection>
    ); //end return statement
}; //end ModalInputField

const SelectInputField = ({ title, inputType, placeholder, textArea, description, rows, cols, name, value, onChange }) => {
    return (
        <InputSection>
            <StyledLabel>
                <StyledHeader> { title } </StyledHeader>
            </StyledLabel>

            <SelectDropDownArrow className="select-drop-down-arrow">
                <Select 
                    name        =   { name } 
                    id          =   "it-transfer-select"

                    value       =   { value }
                    onChange    =   { onChange }
                >
                <option>hello</option>
                </Select> 
            </SelectDropDownArrow>
            {/* <select style={{width: "70%"}}>
                <option>test</option>
            </select> */}
        </InputSection>
    ); //end return statement
};


export { 
    ModalTextInputField,
    TransferToITModalContainer, SelectInputField, CloseButton, Form, ModalTitle, SelectDropDownArrow, Select, SubmitButton, FAIconStyled, TransferResultMessage, NoCVTechsMessage };