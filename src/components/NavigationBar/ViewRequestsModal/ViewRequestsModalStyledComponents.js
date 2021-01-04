import React from 'react';
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
    justify-content     : flex-start;
    align-content       : center;


    width               : 80%;
    height              : 400px;
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

const ReqRectContainer = styled("main")`
    width: 100%;
    height: 316px;

    overflow-y: auto;

    /* Firefox properties to target the scrollbar color */
    scrollbar-color:  ${ props => props.districtPosition ?
                                      ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                                          "#B41A1F white": "#1E6C93 white"
                                    : "#B41A1F white"
        } !important;
    scrollbar-width: 1px !important;
   
    /* Chrome/webkit browsers to target the scrollbar color */
   &::-webkit-scrollbar {
      width: 12px;
      box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
      border-radius: 10px;
      background-color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                                          "#B41A1F white": "#1E6C93 white"
                                    : "#B41A1F white"
        };

    }
 
  /*  Whole Scrollbar */
  &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
      border-radius: 5px;
      background-color: white;
  }
  
  /*  Actual Scrollbar */
  &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
      background-color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                                          "#B41A1F": "#1E6C93"
                                    : "#B41A1F"
        };
    }
`;

const CloseButton = styled('button')`
    cursor: pointer;
    position: absolute;
    z-index: 3;
    
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

    @media only screen and (min-width: 538px) and (max-width: 780px) {
        left: 94%;
    }

    @media only screen and (min-width: 400px) and (max-width: 537px) {
        left: 92%;
    }

    @media only screen and (max-width: 399px) {
        left: 90%;
    }
`;

const InnerContainer = styled('div')`
    position: relative;
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

    font-size: 1.2em;
    font-weight: normal;
    font-style: italic;

    margin: 0px;
    padding: 0px;
`; 

const FilterText = styled('h5')`
    display: inline-block;
    color: white;

    font-size: 1.05em;
    font-weight: normal;

    padding: 0px;
    padding-left: 5px;
    margin: 0px;
    margin-right: 5px;

`; 


const FilterButton = styled('button')`
    /* position: absolute;
    left: 81.5%; */
    font-size: 0.9em;
    margin-left: auto;
    max-width: 150px;

    color: white;
    background-color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#B41A1F": "#1E6C93"
                                    :  "#B41A1F" 
                            
                        };

    padding: 4px;
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

    overflow-y: hidden;

    width: 85%;
`;

const FAIconStyled = styled(FontAwesomeIcon)`
    display: inline-block;
    color: ${ props => props.color ? props.color :
                        props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
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

const NoRequestsMessage = styled("p")`
    position: relative;
    top: 50%;
    left: 50%;

    transform: translate(-50%, 50%);

    height: 100%;
    
    text-align: center;
   

    color:  ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
            };
`;
export { HelpdeskSubmitMessage, RequestTypeTitle, FilterButton, FilterText, Container, CloseButton, InnerContainer, ModalTitle, ReqRectContainer, FAIconStyled, NoCVTechsMessage, TitleFilterContainer, NoRequestsMessage };