import styled from 'styled-components';

import Skeleton from 'react-loading-skeleton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled("div")`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
`;

const Divider = styled("hr")`
    width: 85%;
    margin: 0 auto;
    margin-top: 25px;
    margin-bottom: 5px;
    background-color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
            };

    opacity: 0.5;
`;

const Content = styled("article")`
    position: relative;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    width: 100%;

    margin: 0;
    margin-top: 10px;

    border-radius: 10px;

    :hover, :active  {
        background-color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "rgba(30,108, 147, 0.07)": "rgba(147,30, 29, 0.07)"
                                    : "rgba(30,108, 147, 0.07)"
            };
        
        
        /*  */
        padding: 0;
    }

    @media only screen and (max-width: 453px) {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
`;

const SubSection = styled("article")`
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: ${props => props.alignItems ? props.alignItems : "center"};

    width: ${props => props.width ? props.width : "33%"};

    margin-right: 2.5%;

    @media only screen and (max-width: 453px) {
       width: 85%;
       order: 2;
       margin-right: 0px;
    }
`;

const TimeDateSubSection = styled(SubSection)`
     @media only screen and (max-width: 453px) {
       order: 1;
       margin-right: 0px;
    }
`;

const IconSubSection = styled(SubSection)`
    @media only screen and (min-width: 636px) and (max-width: 814px) {
        margin-right: 5%;
    }

    @media only screen and (min-width: 500px) and (max-width: 635px) {
        margin-right: 8%;
    }

    @media only screen and (min-width: 454px) and (max-width: 499px) {
        margin-right: 12%;
    }

    @media only screen and (max-width: 453px) {
        position: absolute;
        left: 26px;
        top: 13px;
        
        width: auto;

        margin-right: 0px;

        order: 3;
    }
`;

const RequestTitle = styled("h3")`
    font-size: 1.1em;
    color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
            };
`;

const RequestDescription = styled(RequestTitle)`
    font-size: 0.9em;

    /* padding-left: 10px; */

    opacity: 0.42;
`;

const DateTime = styled("h4")`
    font-size: 1.1em;
    color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
            };

    margin-right: 14%;

    @media only screen and (max-width: 453px) {
       margin-right: 0px;
    }
`;

const FAIconStyled = styled(FontAwesomeIcon)`
    display: inline-block;
   color: ${ props => props.color ? props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
                        : "#931E1D"
            };
   margin-left: 26px;
   /* 20px; */

   font-size: ${props => props.fontSize ? props.fontSize : "1.0em"};

   @media only screen and (max-width: 453px) {
    margin-left: 0px;

   }
`;

const TicketTypeCircleSkeleton = styled(Skeleton)`
    margin-left: 20px;
`;

export { Container, Divider, FAIconStyled, SubSection, IconSubSection, TimeDateSubSection, Content, RequestTitle, RequestDescription, DateTime, TicketTypeCircleSkeleton };