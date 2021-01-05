import React, { Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import { faTasks, faCircle, faCheck, faAngleDoubleRight, faTicketAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import undefsafe from 'undefsafe';

//import styled components
import { BackButton, BackArrowIcon, HeaderContainer, TicketNumberTitle, ModalTitle, Container, Divider, Content, FAIconStyled, SubSection, IconSubSection, TicketMetaData, RequestTitle, RequestDescription, DateTime, TicketTypeCircleSkeleton } from './RequestSpecificsStyledComponents.js';

const RequestSpecifics = ({districtPosition, renderAsStudent}) => {
    const { id } = useParams();
    const history = useHistory();

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
                <BackButton
                    className   =   {`request-#${id}-back-button`}
                    onClick     = { () => history.goBack() }
                >
                    <BackArrowIcon
                        districtPosition    =   { districtPosition.toLowerCase() }
                        renderAsStudent     =   { renderAsStudent }
                        icon                =   { faArrowLeft }
                        fontSize            =   "1.15em"
                    />
                </BackButton>
              
                <FAIconStyled
                    className           =   {`request-#${id}-ticket-icon`}
                    districtPosition    =   { districtPosition.toLowerCase() }
                    renderAsStudent     =   { renderAsStudent }
                    icon                =   { faTicketAlt }
                    fontSize            =   "1.15em"
                />
                <TicketNumberTitle 
                    className={`request-#${id}-ticket-number-title`}
                    districtPosition    =   { districtPosition.toLowerCase() }
                    renderAsStudent     =   { renderAsStudent }
                    as                  =   "h4"
                >
                    #{id}:
                </TicketNumberTitle>

                <ModalTitle 
                    className={`request-#${id}-ticket-title`}
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
                    {/* <IconSubSection 
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
                    </IconSubSection> */}

                    <SubSection
                        className   =   "request-rectangle-subsection"
                        width       =   { `${((13/19)*100).toString()}%`}
                        alignItems  =   "flex-start"

                    >
                        <RequestDescription
                                className           =   "request-rectangle-description"
                                districtPosition    =   { districtPosition.toLowerCase() }
                                as                  =   "p"
                        >
                            {
                                isLoading ? (
                                    <Skeleton
                                        width = "85%"
                                    />
                                ) : `
                                    Hello! I need to log into my PowerSchool account to see my grades, but whenever I try, it either 
                                    says that the password or username is incorrect, or that I need to contact my district administrator. 
                                    I am using the same exact credentials that I use to log into all of my other school-related things 
                                    (Canvas, DeltaMath, etc.) but it still won’t let me log in. I’ve been having this issue since the 
                                    second semester of 9th grade. Help would be greatly appreciated. Thank you :)
                                `
                            }  
                        </RequestDescription>
                    </SubSection>

                    <TicketMetaData
                        className       =   "request-rectangle-subsection-time-date"
                        width       =   { `${((6/19)*100).toString()}%`}
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
                                ) : "Open"
                            }  
                        </DateTime>
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
                                ) : "12/15/2020 — 12:51 PM"
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
                                ) : "12/22/2020"
                            }  
                        </DateTime>
                    </TicketMetaData>
                </Content>
        </Container>  
      </Fragment>
    ); //end return()
}; //end RequestSpecifics()

export default RequestSpecifics;