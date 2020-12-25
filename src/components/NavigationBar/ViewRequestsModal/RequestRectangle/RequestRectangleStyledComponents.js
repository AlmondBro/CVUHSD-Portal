import styled from 'styled-components';

import Skeleton from 'react-loading-skeleton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled("div")`
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
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    width: 100%;

    margin: 0;
    margin-top: 10px;
`;

const SubSection = styled("article")`
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: ${props => props.alignItems ? props.alignItems : "center"};

    width: ${props => props.width ? props.width : "33%"};

    margin-right: 2.5%;
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
`;

const TicketTypeCircleSkeleton = styled(Skeleton)`
    margin-left: 20px;
`;

export { Container, Divider, FAIconStyled, SubSection, Content, RequestTitle, RequestDescription, DateTime, TicketTypeCircleSkeleton };