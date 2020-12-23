import React, { forwardRef, Fragment } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

Modal.setAppElement('#cvuhsd-sso-portal');

// let isSafari, isChrome = false;

const Container = styled(Modal).attrs(props => ({
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

const InnerContainer = styled('div')`
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

const RequestTypeTitle = styled('h4')`
    display: inline-block;
    color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
            };

    font-size: 1.4em;
    font-weight: bold;
    font-style: italic;

    margin: 0px;
    padding: 0px;
`; 

const FilterText = styled('h5')`
    display: inline-block;
    color: white;

    font-size: 1.1em;
    font-weight: bold;

    padding: 0px;
    padding-left: 5px;
    margin: 0px;
    margin-right: 5px;

`; 


const FilterButton = styled('button')`
    position: absolute;
    left: 81.5%;

    max-width: 150px;

    color: white;
    background-color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#B41A1F": "#1E6C93"
                                    :  "#B41A1F" 
                            
                        };

    padding: 8px;
    border-radius: 10px;

    outline: 0px;
    border: 0px;

    transition: 350ms ease-in-out background-color;

    :hover, :focus {
        cursor: pointer;
        background-color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "rgba(147, 30, 29, 0.67)": "rgba(30, 108, 147, 0.67)"
                                    :   "rgba(147, 30, 29, 0.67)" 
                     };
    }
`;

const TitleFilterContainer = styled("div")`
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
`;

const FAIconStyled = styled(FontAwesomeIcon)`
    display: inline-block;
    color: ${ props => props.color ? props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
                        : "#931E1D"
            };
   margin-left: 5px;

   font-size: ${props => props.fontSize ? props.fontSize : "1.0em"};
`;

const NoCVTechsMessage = styled('p')`
    margin: 0px;
    margin-top: 8px;

    padding: 0px; 
    color: #B41A1F;

    font-style: italic;

    text-align: center;
`;


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
            {
                icon ? ( 
                        <FAIconStyled 
                            icon                =   { icon }
                            districtPosition    =   { districtPosition }
                        /> 
                        ) : null 
            }
        </HelpdeskSubmitMessageContainer>
    );
};

export { HelpdeskSubmitMessage, RequestTypeTitle, FilterButton, FilterText, Container, CloseButton, InnerContainer, ModalTitle, FAIconStyled, NoCVTechsMessage, TitleFilterContainer };