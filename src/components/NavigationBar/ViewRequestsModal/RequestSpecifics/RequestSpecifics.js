import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation, useRouteMatch, Switch, Route } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import { faTasks, faCircle, faCheck, faAngleDoubleRight, faTicketAlt, faArrowLeft, faClock, faTools, faEyeSlash, faEye, faReply, faLock } from '@fortawesome/free-solid-svg-icons';

import SingleConvo from './SingleConvo/SingleConvo.js';

import isDev from 'isdev';

//import styled components
import { NoConvosMessage, TechLink, SingleConvosContainer, ReplyButton, ConvoReplyButtonContainer, ConversationsButton,ConversationsButtonTitle, ConversationsOuterContainer, SkeletonThemeStyled, BackButton, BackArrowIcon, MetaDataContainer, HeaderContainer, TicketNumberTitle, ModalTitle, Container, Divider, Content, FAIconStyled, SubSection, IconSubSection, TicketMetaData, RequestTitle, RequestDescription, DateTime, TicketTypeCircleSkeleton, ReqSkeletonContainer } from './RequestSpecificsStyledComponents.js';
import ReplyToConvo from './ReplyToConvo/ReplyToConvo.js';

const RequestSpecifics = ({districtPosition, renderAsStudent, notify}) => {
    const { id }    = useParams();
    const history   = useHistory();
    const { state } = useLocation();

    const match = useRouteMatch();

    let [ statusIcon, setStatusIcon ] = useState(faTasks);
    let [ convoComps, setConvoComps ] = useState([]);
    let [ showConvos, setShowConvos ] = useState(false);
    let [ isLoading, setIsLoading ]     = useState(false);

    const { subject, description, time, date, techInfo, status, site } = state;

    // let techFullNameFormatted = techInfo;

    let { email_id: techEmail, name } = techInfo;
    
    let techFullNameFormatted = (name !== "No assigned tech") ? name.split(",")[1] + " " + name.split(",")[0] : name;

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

    const getReqConvos = async (id) => {
        let requests = [];

        const getConvos_URL = `${isDev ? "" : "/server"}/helpdesk/request/get-convos/${id}`;
        const getConvos_Headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials": true
        };
    
        let convos = await fetch(getConvos_URL, {
            method: 'GET',
            headers: getConvos_Headers
        })
        .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
        .then((jsonResponse) => jsonResponse.convos)
        .catch((error) => {
            console.error(`getReqConvos() Catching error:\t ${error}`);
        });

        if (convos && !convos.error) {
            requests = convos.requests;
        } else {
            console.log(`Error in fetching the convo requests.`);

            convos = [];
        }

        return convos;
    }; //end getReqConvos

    const mapConvos = (convos) => {
        return convos.filter((convo, index) => convo["FROM"] != "System").map((convo, index) => {
            let { CREATEDDATE, FROM, DESCRIPTION } = convo;

            let time = new Date(CREATEDDATE).toLocaleTimeString();
            let date =  new Date(CREATEDDATE).toLocaleDateString();

            return (
                <SingleConvo
                    isLoading           =   { isLoading }
                    districtPosition    =   { districtPosition }
                    renderAsStudent     =   { renderAsStudent }

                    description         =   { DESCRIPTION }
                    date                =   { date }
                    time                =   { time }
                    author              =   { FROM } 
                    key                 =   { index }
                />
            ); //end return statement
        }); //end .map() Array method
    }; //end mapConvos()

    const loadConvoComponents = async () => {
        setIsLoading(true);

        let convos          = await getReqConvos(id);
        let convoComponents = mapConvos(convos);

        console.log("ReqSpecifics convos:\t", convos);
        console.log("ReqSpecifics convoComponents:\t", convoComponents);
        setConvoComps(convoComponents);

        setIsLoading(false);
    };

    useEffect(() => {
        getFAIcon(status);
    }, []); //end useEffect() hook

    useEffect(() => {
        if (showConvos === true) {
            loadConvoComponents();
        }
    }, [ showConvos ]); //end useEffect() hook
    
    return (
        <Switch> 
            <Route exact path={"/:staffOrStudent/view-requests/:id"}>
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
                        className           =   {`request-#${id}-ticket-number-title`}
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
                                            renderAsStudent     =   { renderAsStudent }
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
                                className           =   "request-rectangle-ticket-metadata"
                                districtPosition    =   { districtPosition.toLowerCase() }
                                renderAsStudent     =   { renderAsStudent }
                                width               =   { `${((7/19)*100).toString()}%`}
                                alignItems          =   "flex-end"
                                as                  =   "aside" 
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
                                    onClick     =   { () => history.push({
                                                        pathname    : `${match.url}/reply`,
                                                        state       : { subject, description, time, date, techInfo, status, site }
                                                    }) 
                                    }
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
                                { convoComps.length > 0 ? convoComps : (
                                        <NoConvosMessage
                                            className           =   {`request-#${id}-no-convos-message`}
                                            districtPosition    =   { districtPosition.toLowerCase() }
                                            renderAsStudent     =   { renderAsStudent }
                                        >
                                            { `No conversations in this request (#${id})` }
                                        </NoConvosMessage>
                                    )
                                }
                            </SingleConvosContainer>
                        </ConversationsOuterContainer> 

                    </SkeletonThemeStyled>
            </Container>  
        </Route>
        <Route path = {match.path + "/reply"}>
            <ReplyToConvo
             districtPosition   =   { districtPosition.toLowerCase() }
             renderAsStudent    =   { renderAsStudent }
             notify             =   { notify }
             id                 =   { id }
            />
        </Route>
      </Switch>
    ); //end return()
}; //end RequestSpecifics()

export default RequestSpecifics;