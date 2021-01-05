import React, { Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { faTasks, faCircle, faCheck, faAngleDoubleRight, faTicketAlt, faArrowLeft, faClock, faUserTag, faEyeSlash, faEye, faReply } from '@fortawesome/free-solid-svg-icons';

import undefsafe from 'undefsafe';

//import styled components
import { ReplyButton, ConvoReplyButtonContainer, ConversationsButton,ConversationsButtonTitle, ConversationsOuterContainer, SkeletonThemeStyled, BackButton, BackArrowIcon, MetaDataContainer, HeaderContainer, TicketNumberTitle, ModalTitle, Container, Divider, Content, FAIconStyled, SubSection, IconSubSection, TicketMetaData, RequestTitle, RequestDescription, DateTime, TicketTypeCircleSkeleton, ReqSkeletonContainer } from './RequestSpecificsStyledComponents.js';

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

    const isLoading = true;

    return (
        <SkeletonTheme 
            color           = {
                                districtPosition ?
                                    ( (districtPosition.toLowerCase() === "student") || renderAsStudent || window.location.pathname === "/student") ? 
                                        "rgba(147, 30, 29, 0.1)": "rgba(30, 108, 147, 0.1)"
                                    : "rgba(147, 30, 29, 0.1)" 
                                }
            highlightColor  = {
                                    districtPosition ?
                                    ( (districtPosition.toLowerCase() === "student") || renderAsStudent || window.location.pathname === "/student") ? 
                                        "rgba(147, 30, 29, 0.1)": "rgba(30, 108, 147, 0.1)"
                                    : "rgba(147, 30, 29, 0.1)" 
            }

            style={{width: "100px"}}
        > 
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

                <Content className={`request-#${id}-ticket-content`}>
                    <SubSection
                        className   =   {`request-#${id}-ticket-subsection`}
                        width       =   { `${((13/19)*100).toString()}%`}
                        alignItems  =   "flex-start"

                    >
                        {
                            isLoading ? (
                                <ReqSkeletonContainer>
                                    <Skeleton
                                        width   =   { "auto" }
                                        count   =   { 10 }
                                    />
                                </ReqSkeletonContainer>
                             
                            ) : (
                                <RequestDescription
                                    className           =   {`request-#${id}-ticket-description`}
                                    districtPosition    =   { districtPosition.toLowerCase() }
                                    as                  =   "p"
                                >
                                    Hello! I need to log into my PowerSchool account to see my grades, but whenever I try, it either 
                                    says that the password or username is incorrect, or that I need to contact my district administrator. 
                                    I am using the same exact credentials that I use to log into all of my other school-related things 
                                    (Canvas, DeltaMath, etc.) but it still won’t let me log in. I’ve been having this issue since the 
                                    second semester of 9th grade. Help would be greatly appreciated. Thank you :)
                                </RequestDescription>
                            )
                        }
                     
                    </SubSection>

                    <TicketMetaData
                        className       =   "request-rectangle-ticket-metadata"
                        width       =   { `${((6/19)*100).toString()}%`}
                        alignItems      =   "flex-end"
                        as              =   "aside" 
                    >
                        <MetaDataContainer
                            className   =   {`request-#${id}-metadata-container`}
                        >
                            <FAIconStyled
                                className           =   {`request-#${id}-metadata-icon`}
                                districtPosition    =   { districtPosition.toLowerCase() }
                                renderAsStudent     =   { renderAsStudent }
                                icon                =   { faCircle }
                                fontSize            =   "1.15em"
                            />
                            <DateTime
                                className   =   {`request-#${id}-metadata-status`}

                                districtPosition    =   { districtPosition.toLowerCase() }
                                renderAsStudent     =   { renderAsStudent }

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
                        </MetaDataContainer>
                    
                        
                        <MetaDataContainer
                            className   =   {`request-#${id}-metadata-container`}
                        >
                            <FAIconStyled
                                className           =   {`request-#${id}-metadata-icon`}
                                districtPosition    =   { districtPosition.toLowerCase() }
                                renderAsStudent     =   { renderAsStudent }
                                icon                =   { faClock }
                                fontSize            =   "1.15em"
                            />
                            <DateTime
                                className           =   {`request-#${id}-metadata-date-time`}

                                districtPosition    =   { districtPosition.toLowerCase() }
                                renderAsStudent     =   { renderAsStudent }

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
                            </MetaDataContainer>

  
                        <MetaDataContainer
                            className   =   {`request-#${id}-metadata-container`}
                        >
                            <FAIconStyled
                                className           =   {`request-#${id}-metadata-icon`}
                                districtPosition    =   { districtPosition.toLowerCase() }
                                renderAsStudent     =   { renderAsStudent }
                                icon                =   { faUserTag }
                                fontSize            =   "1.15em"
                            />
                            <DateTime
                                className           =   {`request-#${id}-metadata-technician-name`}

                                districtPosition    =   { districtPosition.toLowerCase() }
                                renderAsStudent     =   { renderAsStudent }
                            >
                                {
                                    isLoading ? (
                                        <Skeleton
                                            width = {80}
                                        />
                                    ) : "Juan David Lopez"
                                }  
                            </DateTime>
                        </MetaDataContainer>
                    </TicketMetaData>
                </Content>

                <ConversationsOuterContainer
                        className           =   {`request-#${id}-conversations-outer-container`}
                    >

                    <ConvoReplyButtonContainer>
                        <ConversationsButton
                            districtPosition    =   { districtPosition.toLowerCase() }
                            renderAsStudent     =   { renderAsStudent }
                        >
                            <FAIconStyled
                                className           =   {`request-#${id}-metadata-icon`}
                                districtPosition    =   { districtPosition.toLowerCase() }
                                renderAsStudent     =   { renderAsStudent }
                                icon                =   { faEye }
                                color               =   "white"
                                fontSize            =   "1.15em"
                            />
                            <ConversationsButtonTitle>
                                Conversations
                            </ConversationsButtonTitle>
                        </ConversationsButton>

                        <ReplyButton
                            className  =   {`request-#${id}-reply-button`}
                        
                        >
                            <FAIconStyled
                                    className           =   {`request-#${id}-reply-icon`}
                                    districtPosition    =   { districtPosition.toLowerCase() }
                                    renderAsStudent     =   { renderAsStudent }
                                    icon                =   { faReply }
                                    fontSize            =   "1.15em"
                            />
                        </ReplyButton>
                    </ConvoReplyButtonContainer>
                    
                </ConversationsOuterContainer>
        </Container>  
      </SkeletonTheme>
    ); //end return()
}; //end RequestSpecifics()

export default RequestSpecifics;