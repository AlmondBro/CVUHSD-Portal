import React from "react";

//Import 3rd-party APIs
import styled from 'styled-components';
import css from 'styled-components';

import { Container } from 'react-bootstrap';

let ModifiedContainer = ({className, children, fluid}) => (
    <Container className={className + " app-container"} fluid={fluid}>
      { children }
    </Container>
  );
  
let StyledContainer = styled(ModifiedContainer)`
    display: flex;
    flex-direction: column;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#4177a3+0,182c3d+100 */
    /* background: #4177a3;  Old browsers */
    /*  background: -moz-linear-gradient(top,  #4177a3 0%, #182c3d 100%); FF3.6-15 */
    /* background: -webkit-linear-gradient(top,  #4177a3 0%,#182c3d 100%);  Chrome10-25,Safari5.1-6 */
    /* background: linear-gradient(to bottom,  #4177a3 0%,#182c3d 100%);  W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    /* filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4177a3', endColorstr='#182c3d',GradientType=0 ); IE6-9 */
  
    height: 100%;
    && { /*Overrode class style */
      padding-left: 0px;
      padding-right: 0px;
      overflow-y: auto;
      overflow-x: auto;

      scrollbar-color: ${ props => 
                ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                    "#931E1D white": "#1E6C93 white;"
        };
      scrollbar-width: auto;
    }
  
    &&& {
      ${props => props.styledContainer && css`
        {props.styledContainer}
      `}
    }

    ::-webkit-scrollbar {
      width: 12px;
      box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
      border-radius: 10px;
      background-color: white;

    }
 
  /*  Whole Scrollbar */
  ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
      border-radius: 5px;
      background-color: white;
  }
  
  /*  Actual Scrollbar */
  ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
      background-color: ${ props => props.districtPosition ?
                                      ( (props.districtPosition === "Student") || props.renderAsStudent) ? 
                                          "#931E1D": "#1E6C93"
                                    : "#931E1D"
        };
    }

    ::after {
      position: absolute;
      z-index: -1;
      height: 100%;
      width: 100%;
      
      content: "";

      background-image: ${props => props.containerStyle["background-image"] || `url(./images/cvuhsd-allStudents-ready.jpg)` };
      background-repeat: ${props => props.containerStyle["background-repeat"] || `no-repeat` };
      background-size: ${props => props.containerStyle["background-size"] || `cover` };

      opacity:  ${props => props.containerStyle["opacity"] || 0.2 };
    }
  `; //end StyledContainer

export { StyledContainer }