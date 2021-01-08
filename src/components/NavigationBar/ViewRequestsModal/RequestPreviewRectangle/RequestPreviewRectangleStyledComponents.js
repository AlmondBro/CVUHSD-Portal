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
                                          "rgba(147,30, 29, 0.07)": "rgba(30,108, 147, 0.07)"
                                    : "rgba(147,30, 29, 0.07)"
            };
        
        
        /*  */
        padding: 0;
    }

    @media only screen and (max-width: 471px) {
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

    @media only screen and (max-width: 471px) {
       width: 100% !important;
       order: 2;
       margin-right: 0;
       margin-left: 2.5%;

       align-items: center;
    }
`;

const TimeDateSubSection = styled(SubSection)`
   @media only screen and (max-width: 500px) {
        width: 100%;
    }

     @media only screen and (max-width: 472px) {
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

    @media only screen and (max-width: 471px) {
        width: 100% !important;

        margin-right: 0px;

        margin-top: 10px;
        margin-bottom: 5px;

        padding-left: 2.5%;

        order: 2;

        align-items: flex-start;
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

    @media only screen and (max-width: 471px) {
       padding: 0% 5%; 
    }
`;

const MetaDataContainer = styled("section")`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    margin-bottom: 15px;
    padding-left: 15px;

    :last-child {
        margin-bottom: 0px;
    }

    @media only screen and (max-width: 471px) {
        justify-content: center;
    }
`;

const MetaDataIcon = styled(FontAwesomeIcon)`
    display: inline-block;

    width: 50% !important;
    color: ${ props => props.color ? props.color :
                        props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
            };

   margin: 0px;


   font-size: ${props => props.fontSize ? props.fontSize : "1.0em"};

   @media only screen and (max-width: 765px) {
       width: auto !important;
   }

   @media only screen and (max-width: 595px) {
       margin-right: 5px;
   }
`;

const DateTime = styled("h4")`
    font-size: 1.1em;
    text-align: right;
    color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
            };

    margin-right: 14%;

    @media only screen and (max-width: 471px) {
        margin-right: 0;
       text-align: center;
        width: 100%;
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

   @media only screen and (max-width: 471px) {
    margin-left: 2.5%;
   }
`;

const TicketTypeCircleSkeleton = styled(Skeleton)`
    margin-left: 20px;
`;

export { Container, Divider, FAIconStyled, MetaDataContainer, MetaDataIcon, SubSection, IconSubSection, TimeDateSubSection, Content, RequestTitle, RequestDescription, DateTime, TicketTypeCircleSkeleton };