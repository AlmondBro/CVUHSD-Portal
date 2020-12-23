import React from 'react';

//import styled components
import { Container, Divider } from './RequestRectangleStyledComponents.js'
const RequestRectangle = ({districtPosition, ...props}) => {
    return (
        <Container>
          <Divider
            districtPosition = { districtPosition }
          />


      </Container>  
    ); //end return()
}; //end RequestRectangle()

export default RequestRectangle;