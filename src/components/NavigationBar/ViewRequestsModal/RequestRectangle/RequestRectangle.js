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
                    className   =   "request-rectangle-subsection"
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
                    className   =   "request-rectangle-subsection"
                    width       =   "53%"
                    alignItems  =   "flex-start"

                >
                    <RequestTitle 
                            className   =   "request-rectangle-req-title"
                            districtPosition    =   { districtPosition.toLowerCase() }
                    >
                        Unable to Access HRS or PS
                    </RequestTitle>
                    <RequestDescription
                            className           =   "request-rectangle-description"
                            districtPosition    =   { districtPosition.toLowerCase() }
                    >
                        I am working from home and do not have my contact info...
                    </RequestDescription>

                </SubSection>

                <SubSection
                    className       =   "request-rectangle-subsection"
                    width           =   "35%"
                    alignItems      =   "flex-end"
                    as              =   "aside" //Make this be a <aside/> 
                >
                    <DateTime
                        className           =   "request-rectangle-date-time"
                        districtPosition    =   { districtPosition.toLowerCase() }
                        as                  =   "time"
                    >
                        12:51 PM
                    </DateTime>
                    <DateTime
                        className           =   "request-rectangle-date-time"
                        districtPosition    =   { districtPosition.toLowerCase() }
                        as                  =   "date"
                    >
                        12/22/2020
                    </DateTime>
                </SubSection>
            </Content>
      </Container>  
    ); //end return()
}; //end RequestRectangle()

export default RequestRectangle;