import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import { faTasks, faCircle, faCheck, faAngleDoubleRight, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

import undefsafe from 'undefsafe';

//import styled components
import { HeaderContainer, TicketNumberTitle, ModalTitle, Container, Divider, Content, FAIconStyled, SubSection, IconSubSection, TimeDateSubSection, RequestTitle, RequestDescription, DateTime, TicketTypeCircleSkeleton } from './RequestSpecificsStyledComponents.js';

const RequestSpecifics = ({districtPosition, renderAsStudent}) => {
    const { id } = useParams();

    const status = "Open";
    let subject, description, time, date = "test";

    const getFAIcon = () => {
        let faIcon;

        switch(status) {
            case "All":
                faIcon = faTasks;
            break;

            case "Open":
                faIcon = faCircle;
            break;

            case "In Progress":
                faIcon = faAngleDoubleRight;
            break;

            case "Closed":
                faIcon = faCheck;
            break;
        }

        return faIcon;
    };

    const isLoading = false;

    return (
        <Fragment>
            <HeaderContainer className={`request-#${id}-header-container`}>
                <FAIconStyled
                    districtPosition    =   { districtPosition.toLowerCase() }
                    renderAsStudent     =   { renderAsStudent }
                    icon                =   { faTicketAlt }
                    fontSize            =   "1.15em"
                />
                <TicketNumberTitle 
                    districtPosition    =   { districtPosition.toLowerCase() }
                    renderAsStudent     =   { renderAsStudent }
                    as                  =   "h4"
                >
                    #{id}:
                </TicketNumberTitle>

                <ModalTitle 
                    districtPosition    =   { districtPosition.toLowerCase() }
                    renderAsStudent     =   { renderAsStudent }
                >
                    PowerSchool Log-in Help
                </ModalTitle>
                
                
                
            </HeaderContainer>
            <Container 
                className   =   "request-rectangle-container" 
                // onClick     =   { onClick }
            >
                {/* <Divider
                    className           =   "request-rectangle-divider"
                    districtPosition    =   { districtPosition }
                /> */}

                <Content className="request-rectangle-content">
                    <IconSubSection 
                        className   =   "request-rectangle-subsection-icon"
                        width       =   "6%"
                        alignItems  =   "flex-start"
                    >
                        {
                            isLoading ? (
                                <TicketTypeCircleSkeleton
                                    circle  =   { true }
                                    width   =   { 20  }
                                    height  =   { 20 }
                                />
                            ) : (
                                <FAIconStyled
                                    className           =   "view-request-type-icon"
                                    districtPosition    =   { districtPosition.toLowerCase() }
                                    color               =   "white"
                                    icon                =   { getFAIcon() }
                                />
                            )
                        }   
                    </IconSubSection>

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
                                        width = {300}
                                    />
                                ) : undefsafe(subject, "") || "Request Subject"
                            }  
                        </RequestTitle>
                        <RequestDescription
                                className           =   "request-rectangle-description"
                                districtPosition    =   { districtPosition.toLowerCase() }
                        >
                            {
                                isLoading ? (
                                    <Skeleton
                                        width = {200}
                                    />
                                ) : undefsafe(description, "") || "I am working from home and do not have my contact info..."
                            }  
                        </RequestDescription>
                    </SubSection>

                    <TimeDateSubSection
                        className       =   "request-rectangle-subsection-time-date"
                        width           =   "35%"
                        alignItems      =   "flex-end"
                        as              =   "aside" 
                    >
                        <DateTime
                            className           =   "request-rectangle-date-time"
                            districtPosition    =   { districtPosition.toLowerCase() }
                            as                  =   "time"
                        >
                            {
                                isLoading ? (
                                    <Skeleton
                                        width = {40}
                                    />
                                ) : undefsafe(time, "") || "12:51"
                            }  
                        </DateTime>
                        <DateTime
                            className           =   "request-rectangle-date-time"
                            districtPosition    =   { districtPosition.toLowerCase() }
                        >
                            {
                                isLoading ? (
                                    <Skeleton
                                        width = {80}
                                    />
                                ) : undefsafe(date, "") || "12/22/2020"
                            }  
                        </DateTime>
                    </TimeDateSubSection>
                </Content>
        </Container>  
      </Fragment>
    ); //end return()
}; //end RequestSpecifics()

export default RequestSpecifics;