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
   margin-right: 8px;

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
    margin-right: auto;
    margin-bottom: 0px;

    padding: 0px;
`; 

const TicketNumberTitle = styled(ModalTitle)`
    font-size: 1.35em;

    margin-left: 0px;
    margin-right: 10px;
`;

const Container = styled("div")`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;

    height: 100%;
`;


export { HeaderContainer, BackButton, BackArrowIcon, FAIconStyled, TicketNumberTitle, ModalTitle, Container };