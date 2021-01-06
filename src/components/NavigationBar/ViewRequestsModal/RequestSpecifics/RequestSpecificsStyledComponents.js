import styled from 'styled-components';

import Skeleton from 'react-loading-skeleton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SkeletonTheme } from 'react-loading-skeleton';

const Container = styled("div")`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;

    height: 100%;
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
    margin-top: 15px;

    border-radius: 10px;

    padding: 0% 5%;
/* 
    :hover, :active  {
        background-color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "rgba(30,108, 147, 0.07)": "rgba(147,30, 29, 0.07)"
                                    : "rgba(30,108, 147, 0.07)"
            };
    } */

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

const TicketMetaData = styled(SubSection)`
    height: 120px;
    border-left: 1px solid ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "rgba(30,108, 147, 0.42)": "rgba(147,30, 29, 0.42)"
                                    : "rgba(30,108, 147, 0.42)"
            };
    margin: 0px 10px;
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

const ReqSkeletonContainer = styled("div")`
    width: 100%;
    max-height: 120px;
    overflow-y: hidden;

    span {
        display: flex;
        flex-direction: column;
        width: 100%;

    }

    span span {
        width: 100%;

        margin: 5px 0px;
    }
`;

const RequestDescription = styled(RequestTitle)`
    font-size: 1.1em;
    font-weight: normal;

    max-height: 150px;
    overflow-y: auto;

    padding-right: 20px; 

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

const DateTime = styled("h5")`
    font-size: 1.1em;
    text-align: right;
    color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
            };

    margin: 0;

    @media only screen and (max-width: 453px) {
       margin-right: 0px;
    }
`;

let HeaderContainer = styled("header")`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding: 0% 2%;
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

const BackButton = styled("button")`
    border: 0px;
    background-color: transparent;
    margin-right: auto;
`;

const BackArrowIcon = styled(FAIconStyled)`
    margin-left: 0px;
    margin-right: 0px;
`;

const TicketTypeCircleSkeleton = styled(Skeleton)`
    margin-left: 20px;
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
`;

const SkeletonThemeStyled = styled(SkeletonTheme)`
    width: 100% !important;
`;

let ConversationsOuterContainer = styled("div")`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    width: 100%;
    height: 172px;
`;

const ConvoReplyButtonContainer = styled("div")`
    position: ${props => props.showConvos ? "relative" : "absolute"};
    /* bottom: 0; */
    top: ${props => props.showConvos ? "0%" : "75%"};

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    padding: 0% 5%;
    padding-top: 5px;

    transition: 250ms top ease-in-out;
`;


const ConversationsButton = styled("button")`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    background-color: ${ props => props.districtPosition ?
                                    ( (props.districtPosition === "student") || props.renderAsStudent === true || window.location.pathname === "/student") ? 
                                        "#931E1D": "#1E6C93"
                                    : "#931E1D" 
            };

    border: 0px;
    border-radius: 10px;
`;

const ConversationsButtonTitle = styled("h4")`
    font-size: 1.3em;
    font-weight: bold;

    color: white;

    margin: 0;
    padding: 0;
`;

const ReplyButton = styled(ConversationsButton)`
    background-color: transparent;
`;

const TechLink = styled("a")`
    text-decoration: none;
    color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                                          "#B41A1F": "#1E6C93"
                                    : "#B41A1F"
        };
    :hover, :focus {
        text-decoration: underline;
        color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                                          "#B41A1F": "#1E6C93"
                                    : "#B41A1F"
        };
    }
`;


const SingleConvosContainer = styled("div")`
    visibility: ${props => props.showConvos ? "visible" : "hidden"};

    margin-top: 5px; 
    width: 100%;

    max-height: ${props => props.showConvos ? "280px" : "0px"};

    overflow-y: auto;

    transition: 450ms max-height ease-in-out;
    transition-delay: 150ms;
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

const NoConvosMessage = styled("p")`
    display: flex;
    flex-direction: column;
    justify-content: center;

    font-size: 1.2em;

    color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                                          "#B41A1F": "#1E6C93"
                                    : "#B41A1F"
        };

    width: 85%;
    height: 120px;

    text-align: center;

    margin: auto;
`;

export { NoConvosMessage, TechLink, SingleConvosContainer, ReplyButton, ConvoReplyButtonContainer, ConversationsButton,ConversationsButtonTitle, ConversationsOuterContainer, BackButton, BackArrowIcon, SkeletonThemeStyled, MetaDataContainer, ReqSkeletonContainer, HeaderContainer, ModalTitle, TicketNumberTitle, Container, Divider, FAIconStyled, SubSection, IconSubSection, TicketMetaData, Content, RequestTitle, RequestDescription, DateTime, TicketTypeCircleSkeleton };