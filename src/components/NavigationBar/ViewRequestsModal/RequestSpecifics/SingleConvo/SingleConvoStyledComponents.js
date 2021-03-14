import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled("article")`
    position: relative;
    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: baseline;

    width: 90%;

    margin: 0 auto;
    margin-bottom: 15px;

    padding: 0%;
    padding-bottom: 15px;
    
    border-radius: 0px;
    border-bottom: 1px solid  ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "rgba(147,30, 29, 0.42)": "rgba(30,108, 147, 0.42)"
                                    : "rgba(147,30, 29, 0.42)"
                            };
    @media only screen and (max-width: 550px) {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        width: 100%;
    }
`;

const SubSection = styled("section")`
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: ${props => props.alignItems ? props.alignItems : "center"};

    width: ${props => props.width ? props.width : "33%"};

    margin-right: 2.5%;

    @media only screen and (max-width: 550px) {
       width: 85%;
       order: 2;
       margin-right: 0px;
    }
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

const RequestTitle = styled("h3")`
    font-size: 1.1em;
    color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
            };
`;


const RequestDescription = styled(RequestTitle)`
    font-size: 1.1em;
    font-weight: normal;

    /* max-height: 150px; */
    width: 100%;
    word-wrap: break-word;
    overflow-y: auto;

    padding-right: 20px; 
    /* Firefox properties to target the scrollbar color */
    scrollbar-color:  ${ props => props.districtPosition ?
                                      ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                                          "#931E1D white": "#1E6C93 white"
                                    : "#931E1D white"
        } !important;
    scrollbar-width: 1px !important;
   
    /* Chrome/webkit browsers to target the scrollbar color */
   &::-webkit-scrollbar {
      width: 12px;
      box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
      border-radius: 10px;
      background-color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                                          "#931E1D white": "#1E6C93 white"
                                    : "#931E1D white"
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
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
        };
    }

    @media only screen and (max-width: 550px) {
        width: 100%;
        text-align: center;

        padding: 0px;
    }
`;

const TicketMetaData = styled(SubSection)`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    height: 120px;
    border-left: 1px solid ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent) ? 
                                          "rgba(147,30, 29, 0.42)": "rgba(30,108, 147, 0.42)"
                                    : "rgba(147,30, 29, 0.42)"
            };
    margin: 0px 10px;

    @media only screen and (max-width: 550px) {
        order: 1;
        border-left: 0px;

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

    @media only screen and (max-width: 550px) {
        margin-bottom: 5px;
        padding-left: 0px;
    }
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

   @media only screen and (max-width: 550px) {
    margin-left: 0px;

   }
`;

const DateTime = styled("h5")`
    font-size: 1.1em;
    color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition.toLowerCase() === "student") || props.renderAsStudent || window.location.pathname === "/student") ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
            };

    margin: 0;

    @media only screen and (max-width: 550px) {
       margin-right: 0px;
    }
`;

export { Container, SubSection, ReqSkeletonContainer, RequestDescription, TicketMetaData, MetaDataContainer,  FAIconStyled, DateTime };