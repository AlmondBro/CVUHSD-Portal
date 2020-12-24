import React from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

//import styled components
import { Container, Divider, Content, Subsection, FAIconStyled, SubSection, RequestTitle, RequestDescription, DateTime } from './RequestRectangleStyledComponents.js'

const RequestRectangle = ({ districtPosition, ...props}) => {
    return (
        <Container className="request-rectangle-container">
            <Divider
                className="request-rectangle-divider"
                districtPosition = { districtPosition }
            />

            <Content>
                <SubSection 
                    width       =   "6%"
                    alignItems  =   "flex-start"
                >
                    <FAIconStyled
                            districtPosition    =   { districtPosition.toLowerCase() }
                            color               =   "white"
                            icon                =   { faCircle }
                    />
                </SubSection>

                <SubSection
                    width       =   "53%"
                    alignItems  =   "flex-start"

                >
                    <RequestTitle 
                            districtPosition    =   { districtPosition.toLowerCase() }
                    >
                        Unable to Access HRS or PS
                    </RequestTitle>
                    <RequestDescription
                            districtPosition    =   { districtPosition.toLowerCase() }
                    >
                        I am working from home and do not have my contact info...
                    </RequestDescription>

                </SubSection>

                <SubSection
                    width           =   "35%"
                    alignItems      =   "flex-end"
                >
                    <DateTime
                        districtPosition    =   { districtPosition.toLowerCase() }
                    >
                        12:51 PM
                    </DateTime>
                    <DateTime
                        districtPosition    =   { districtPosition.toLowerCase() }
                    >
                        12/22/2020
                    </DateTime>
                </SubSection>
              
            </Content>
      </Container>  
    ); //end return()
}; //end RequestRectangle()

export default RequestRectangle;