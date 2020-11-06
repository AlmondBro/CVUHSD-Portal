import React, { forwardRef } from 'react';
import { useState, useEffect } from 'react';
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
    shouldCloseOnEsc: props.shouldCloseOnEsc,

    style:{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 2,
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

    color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
            };
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
    color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
            };

    font-size: 1.5em;
    font-weight: bold;

    margin: 0px;
    margin-bottom: 10px;

    padding: 0px;
`; 

const SelectDropDownArrow = styled('div')`
    position: relative;
  /*Don't really need this just for demo styling*/

  ${props => props.optionsDropdowns.length > 1 ? (
      `
      &:after {
        position: absolute;
        top: ${ (isSafari || isChrome) ? `0%;` : `0%;`};
        left: 95%;

        color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
            };
    
        ${ (isSafari || isChrome) ? null : `font-family: "Font Awesome 5 Free"`};
        ${ (isSafari || isChrome) ? `font-weight: bold;` : null};
        ${ (isSafari || isChrome) ? `content: "\u2193"` : `content: '\f107';`};

        pointer-events: none;
    }
    `
  ): null };
    
    
`;

const Select = styled('select')`
    appearance: none;
    color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#B41A1F": "#1E6C93"
                                    :  "#B41A1F" 
            };
    font-style: italic;

    max-width: 100%;

    border-width: 0px;
    border-color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        " rgba(147, 30, 29, 0.21)": "rgba(30, 108, 147, 0.21);"
                                    : " rgba(147, 30, 29, 0.21)" 
                     };
    border-radius: 10px;

    outline: 0px;

    margin-top: 0px;

    padding: 0px 15px;
    padding-left: 5px;
    /* 10px 15px 10px 4px; */

    /* box-shadow: 5px 5px 30px -11px rgba(0,0,0,0.75); */

    transition: border-width 300ms ease-in-out, margin-right 300ms ease-in-out,
    padding-top 300ms ease-in-out,  padding-bottom 300ms ease-in-out;

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

    &:focus {
        border-width: 1px;
        margin-right: 10px;

        padding-top: 2px;
        padding-bottom: 2px;

        box-shadow: 5px 5px 30px -15px rgba(0,0,0,0.75);
       
    }
`;

const SubmitButton = styled('button')`
    max-width: 150px;
    color: white;
    background-color: ${ props => props.submitEnabled ? props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#B41A1F": "#1E6C93"
                                    :  "#B41A1F" 
                                :   "grey"
                        };

    padding: 8px;
    border-radius: 10px;

    outline: 0px;
    border: 0px;
    margin-top: 15px;


    transition: 350ms ease-in-out background-color;

    :hover {
        cursor: pointer;
        background-color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "rgba(147, 30, 29, 0.67)": "rgba(30, 108, 147, 0.67)"
                                    :   "rgba(147, 30, 29, 0.67)" 
                     };
    }

    :focus {
        box-shadow: 0px 0px 11px 2px    ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#B41A1F": "#1E6C93"
                                    :  "#B41A1F" 
            };          
    }
`;


const FAIconStyled = styled(FontAwesomeIcon)`
   color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
            };
   margin-left: 10px;

   font-size: ${props => props.fontSize ? props.fontSize : "1.0em"};
`;

const TransferResultMessage = styled('p')`
    margin: 0px;
    margin-bottom: 8px;

    padding: 0px; 
    color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
            };

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
    color:      ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
                        }; 
`;

const StyledInput = styled('input')`
    width: ${props => props.width};

    border: 1px;
    border-style: solid;
    border-color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        " rgba(147, 30, 29, 0.21)": "rgba(30, 108, 147, 0.21);"
                                    : " rgba(147, 30, 29, 0.21)" 
                     };
    
   
    /* #d8d8d8 */
    border-radius: 10px;

    outline: 0px; 

    padding: 5px 5px 5px 10px;
   
    /* #EFEFEF; */
    color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
            };
    transition: box-shadow 300ms ease-in-out;

    /* Hide increment arrow spinners on number text fields */
     /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        /* margin: 0; */
    }

    /* Firefox */
    input[type=number] {
        appearance: textfield;
        -moz-appearance: textfield;
    }       

    &:focus {
        box-shadow: 5px 5px 30px -15px rgba(0,0,0,0.75);
    }
`;

const StyledTextArea = styled('textarea')`
    max-height: 100%;
    width: 70%;

    border: 1px;
    border-style: solid;
    border-color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        " rgba(147, 30, 29, 0.21)": "rgba(30, 108, 147, 0.21);"
                                    : " rgba(147, 30, 29, 0.21)" 
                     };
    /* #d8d8d8 */
    border-radius: 10px;

    outline: 0px; 

    padding: 5px 5px 5px 10px;

    resize: none;

    color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
        };

    &:focus {
        box-shadow: 5px 5px 20px -15px rgba(0,0,0,0.75);
    }
`;


const ModalTextInputField = forwardRef(({ districtPosition, title, pathname, inputType, placeholder, textArea, description, rows, cols, name, value, width, required, onChange }, ref) => {
    return (
        <InputSection>
            <StyledLabel>
                <StyledHeader 
                    districtPosition    =   { districtPosition.toLowerCase() }

                > 
                    { title } 
                </StyledHeader>
            </StyledLabel>
            {
                textArea ? (
                    <StyledTextArea
                        name                =   { name }
                        placeholder         =   { placeholder }
                        rows                =   { rows || "3"}
                        cols                =   { cols || "30"}

                        value               =   { value }
                        onChange            =   { onChange }
                        required            =   { required }

                        districtPosition    =   { districtPosition.toLowerCase() }
                        ref                 =   { ref }
                    >
                        { description }
                    </StyledTextArea>
                ) : ( 
                    <StyledInput 
                        districtPosition    =   { districtPosition.toLowerCase() }
                        name                =   { name }
                        type                =   { inputType || "text" } 
                        placeholder         =   { placeholder }
                        width               =   { width || "70%"} 
                        pathname            =   { pathname }
                        
                        value               =   { value }
                        onChange            =   { onChange }
                        required            =   { required }
                        ref                 =   { ref }
                    />
                )
            }
        </InputSection>
    ); //end return statement
}); //end ModalInputField

const SelectInputField = ({ districtPosition, title, inputType, placeholder, textArea, description, rows, cols, name, value, onChange, options }) => {
    
    const [ optionsDropdowns, setOptions] = useState([]);

    const createDropdownOptions = (options) => {
        let createdOptionsArray = [];
    
        options.forEach((option, index) => {
            let createdOption = (
                <option
                    value   =   { option}
                    key     =   { index }
                >
                    { option }
                </option>
            ); //end createdOption
    
            createdOptionsArray.push(createdOption);
        }); //end forEach()
    
        return createdOptionsArray;
    }; //end createDropdownOptions()

    useEffect(() => {
        const createdOptions = createDropdownOptions(options);

        setOptions(createdOptions);
    }, []); //end useEffect()

    return (
        <InputSection>
            <StyledLabel>
                <StyledHeader districtPosition = { districtPosition }>{ title }</StyledHeader>
            </StyledLabel>

            <SelectDropDownArrow 
                districtPosition    =   { districtPosition.toLowerCase() }
                optionsDropdowns    =   { optionsDropdowns} 
                className           =   "select-drop-down-arrow"
            >
                <Select 
                    name                =   { name } 
                    id                  =   { `support-request-${name}`}
                    districtPosition    =   { districtPosition }
                    value               =   { value }
                    onChange            =   { onChange }
                >
                    { optionsDropdowns }
                </Select> 
            </SelectDropDownArrow>
            {/* <select style={{width: "70%"}}>
                <option>test</option>
            </select> */}
        </InputSection>
    ); //end return statement
};

const HelpdeskSubmitMessageContainer = styled('p')`
    display: flex;
    flex-direction: row;
    align-items: center;

    margin: 0px;
    padding: 0px;

    color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
            };
`;

const HelpdeskSubmitMessage = ({ districtPosition, message, icon }) => {
    return (
        <HelpdeskSubmitMessageContainer 
            className           =   "helpdesk-submit-message"
            districtPosition    =   { districtPosition }
        >
            { message } 
            {icon ? ( 
                        <FAIconStyled 
                            icon                =   { icon }
                            districtPosition    =   { districtPosition }
                        /> 
                        ) : null 
            }
        </HelpdeskSubmitMessageContainer>
    )
};

export { 
    ModalTextInputField, HelpdeskSubmitMessage,
    TransferToITModalContainer, SelectInputField, CloseButton, Form, ModalTitle, SelectDropDownArrow, Select, SubmitButton, FAIconStyled, TransferResultMessage, NoCVTechsMessage };