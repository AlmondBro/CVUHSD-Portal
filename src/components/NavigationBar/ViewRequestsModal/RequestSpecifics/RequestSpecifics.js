import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import { faTasks, faCircle, faCheck, faAngleDoubleRight, faTicketAlt, faArrowLeft, faClock, faTools, faEyeSlash, faEye, faReply, faLock } from '@fortawesome/free-solid-svg-icons';

import SingleConvo from './SingleConvo/SingleConvo.js';

import undefsafe from 'undefsafe';

//import styled components
import { TechLink, SingleConvosContainer, ReplyButton, ConvoReplyButtonContainer, ConversationsButton,ConversationsButtonTitle, ConversationsOuterContainer, SkeletonThemeStyled, BackButton, BackArrowIcon, MetaDataContainer, HeaderContainer, TicketNumberTitle, ModalTitle, Container, Divider, Content, FAIconStyled, SubSection, IconSubSection, TicketMetaData, RequestTitle, RequestDescription, DateTime, TicketTypeCircleSkeleton, ReqSkeletonContainer } from './RequestSpecificsStyledComponents.js';

const RequestSpecifics = ({districtPosition, renderAsStudent}) => {
    const { id }    = useParams();
    const history   = useHistory();
    const { state } = useLocation();

    let [ statusIcon, setStatusIcon ] = useState(null);
    let [ showConvos, setShowConvos ] = useState(false);

    const { subject, description, time, date, status, technician, site } = state;
    const { email_id : techEmail, name } = technician;

    let techFullNameFormatted = name.split(",")[1] + " " + name.split(",")[0];

    const getFAIcon = (status) => {
        let faIcon;

        switch(status) {
            case "All":
                setStatusIcon(faTasks);
            break;

            case "Open":
                setStatusIcon(faCircle);
            break;

            case "In Progress":
                setStatusIcon(faAngleDoubleRight);
            break;

            case "Closed":
                setStatusIcon(faCheck);
            break;
        }

        return faIcon;
    };

    const isLoading = false;

    useEffect(() => {
        getFAIcon(status);
    }, [ status ]); //end useEffect() hook

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
                    { subject || "Ticket Title"}
                </ModalTitle>
            </HeaderContainer>

            <Container 
               className={`request-#${id}-container`}
            >
                {/* <Divider
                    className           =   "request-rectangle-divider"
                    districtPosition    =   { districtPosition }
                /> */}

                <SkeletonThemeStyled 
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
                > 

                    <Content className={`request-#${id}-ticket-content`}>
                        <SubSection
                            className   =   {`request-#${id}-ticket-subsection`}
                            width       =   { `${((12/19)*100).toString()}%`}
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
                                        {
                                            description || `
                                                Hello! I need to log into my PowerSchool account to see my grades, but whenever I try, it either 
                                                says that the password or username is incorrect, or that I need to contact my district administrator. 
                                                I am using the same exact credentials that I use to log into all of my other school-related things 
                                                (Canvas, DeltaMath, etc.) but it still won’t let me log in. I’ve been having this issue since the 
                                                second semester of 9th grade. Help would be greatly appreciated. Thank you :)
                                            `
                                        }

                                    </RequestDescription>
                                )
                            }
                        
                        </SubSection>

                        <TicketMetaData
                            className       =   "request-rectangle-ticket-metadata"
                            width       =   { `${((7/19)*100).toString()}%`}
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
                                    icon                =   { statusIcon }
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
                                        ) : status || "Open"
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
                                        ) : `${date} @ ${time}`
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
                                    icon                =   { faTools }
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
                                        ) : (
                                            <TechLink
                                                href                =   { `mailto:${techEmail}` }
                                                districtPosition    =   { districtPosition.toLowerCase() }
                                                renderAsStudent     =   { renderAsStudent }
                                            >
                                                { techFullNameFormatted || "No assigned tech yet" }
                                            </TechLink>
                                        ) 
                                    }  
                                </DateTime>
                            </MetaDataContainer>
                        </TicketMetaData>
                    </Content>

                    <ConversationsOuterContainer
                            className           =   {`request-#${id}-conversations-outer-container`}
                    >

                        <ConvoReplyButtonContainer 
                            className           =   {`request-#${id}-convo-button-container`}

                            showConvos          =   { showConvos }
                        >
                            <ConversationsButton
                                className           =   {`request-#${id}-convo-button`}

                                districtPosition    =   { districtPosition.toLowerCase() }
                                renderAsStudent     =   { renderAsStudent }

                                onClick             =   { () => setShowConvos(!showConvos)}
                            >
                                <FAIconStyled
                                    className           =   {`request-#${id}-convo-eye-icon`}
                                    districtPosition    =   { districtPosition.toLowerCase() }
                                    renderAsStudent     =   { renderAsStudent }
                                    icon                =   { showConvos ? faEye : faEyeSlash }
                                    color               =   "white"
                                    fontSize            =   "1.15em"
                                />
                                <ConversationsButtonTitle
                                    className           =   {`request-#${id}-convo-reply-button-title`}
                                
                                >
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
                        
                        <SingleConvosContainer
                            className           =   {`request-#${id}-single-convos-container`}
                            
                            districtPosition    =   { districtPosition.toLowerCase() }
                            renderAsStudent     =   { renderAsStudent }

                            showConvos          =   { showConvos }
                        >
                            <SingleConvo
                                districtPosition    =   { districtPosition.toLowerCase() }
                                renderAsStudent     =   { renderAsStudent }
                            />
                               <SingleConvo
                                districtPosition    =   { districtPosition.toLowerCase() }
                                renderAsStudent     =   { renderAsStudent }
                            />
                        </SingleConvosContainer>
                    </ConversationsOuterContainer>

                    
                </SkeletonThemeStyled>
        </Container>  
      </Fragment>
    ); //end return()
}; //end RequestSpecifics()

export default RequestSpecifics;