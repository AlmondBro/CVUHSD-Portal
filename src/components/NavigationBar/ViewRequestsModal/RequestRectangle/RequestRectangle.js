import React from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

//import styled components
import { Container, Divider, Content, Subsection, FAIconStyled, SubSection, RequestTitle, RequestDescription, DateTime } from './RequestRectangleStyledComponents.js'

import Skeleton from 'react-loading-skeleton';

const RequestRectangle = ({ districtPosition, isLoading, ...props}) => {
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
                    {
                        isLoading ? (
                            <Skeleton
                                circle  = { true }
                                width   =   { 20  }
                                height  =   { 20 }
                            />
                        ) : (
                            <FAIconStyled
                                districtPosition    =   { districtPosition.toLowerCase() }
                                color               =   "white"
                                icon                =   { faCircle }
                            />
                        )
                    }   
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
                        {
                            isLoading ? (
                                <Skeleton
                                    width={300}
                                />
                            ) : "Unable to Access HRS or PS"
                        }  
                    </RequestTitle>
                    <RequestDescription
                            className           =   "request-rectangle-description"
                            districtPosition    =   { districtPosition.toLowerCase() }
                    >
                        {
                            isLoading ? (
                                <Skeleton
                                    width={200}
                                />
                            ) : "I am working from home and do not have my contact info..."
                        }  
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
                        {
                            isLoading ? (
                                <Skeleton
                                    width={40}
                                />
                            ) : "12:51"
                        }  
                    </DateTime>
                    <DateTime
                        className           =   "request-rectangle-date-time"
                        districtPosition    =   { districtPosition.toLowerCase() }
                        as                  =   "date"
                    >
                        {
                            isLoading ? (
                                <Skeleton
                                    width={80}
                                />
                            ) : "12/22/2020"
                        }  
                    </DateTime>
                </SubSection>
            </Content>
      </Container>  
    ); //end return()
}; //end RequestRectangle()

export default RequestRectangle;