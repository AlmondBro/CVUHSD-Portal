import styled from 'styled-components';

import Skeleton from 'react-loading-skeleton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SkeletonTheme } from 'react-loading-skeleton';

let HeaderContainer = styled("header")`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding: 0% 2%;
`;

const BackButton = styled("button")`
    border: 0px;
    background-color: transparent;
    margin-right: auto;
`;

const FAIconStyled = styled(FontAwesomeIcon)`
    display: inline-block;
    color: ${ props => props.color ? props.color :
                        props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
            };
   /* margin-left: 26px; */
   margin-left: 0px;
   margin-right: 2px;

   /* 20px; */

   font-size: ${props => props.fontSize ? props.fontSize : "1.0em"};

   @media only screen and (max-width: 453px) {
    margin-left: 0px;

   }
`;

const BackArrowIcon = styled(FAIconStyled)`
    margin-left: 0px;
    margin-right: 0px;
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
    margin-left: 8px;
    padding: 0px;
`; 

const TicketNumberTitle = styled(ModalTitle)`
    font-size: 1.35em;

    margin-left: 8px; 
    margin-right: auto;
`;

const Container = styled("div")`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;

    height: 100%;
`;

const Form = styled("form")`
    width: 100%;
    height: 80%;

    padding: 2% 6%;
`;

const FormInputContainer = styled("section")`
    width: 100%;
    height: 100%;
`;

const TextArea = styled("textarea")`
    width: 100%;
    height: 100%;

    padding: 2% 2%;

    font-size: 1.2em;

    color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "rgba(30,108, 147, 1.0)": "rgba(147,30, 29, 1.0)"
                                    : "rgba(30,108, 147, 1.0)"
            };

    border: 1px solid ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "rgba(30,108, 147, 0.47)": "rgba(147,30, 29, 0.47)"
                                    : "rgba(30,108, 147, 0.47)"
            };

    border-radius: 10px;

    outline: 0px;

    resize: none;

    &:hover, &:focus {
        border: 1px solid ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "rgba(30,108, 147, 0.47)": "rgba(147,30, 29, 0.47)"
                                    : "rgba(30,108, 147, 0.47)"
            };

        border-radius: 10px;
        outline: 0px;
    }

    ::placeholder {
        color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "rgba(30,108, 147, 0.47)": "rgba(147,30, 29, 0.47)"
                                    : "rgba(30,108, 147, 0.47)"
            };
    }
`;

const ReplyButton = styled("button")`
    position: relative;
    z-index: 1;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-size: 1.4em;

    color: white;
    background-color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
            };

    border: 0px;
    border-radius: 10px;

    padding: 5px 10px;

    margin: 0 auto;
    margin-top: 8px;
`;


export { HeaderContainer, BackButton, BackArrowIcon, FAIconStyled, TicketNumberTitle, ModalTitle, Container, Form, FormInputContainer, TextArea, ReplyButton };