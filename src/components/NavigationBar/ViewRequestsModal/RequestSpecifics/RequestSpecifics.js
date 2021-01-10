import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation, useRouteMatch, Switch, Route } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton';
import { faTasks, faCircle, faCheck, faAngleDoubleRight, faTicketAlt, faArrowLeft, faClock, faTools, faEyeSlash, faEye, faReply, faSort } from '@fortawesome/free-solid-svg-icons';

import SingleConvo from './SingleConvo/SingleConvo.js';

import isDev from 'isdev';

import undefsafe from 'undefsafe';

import { dateFormatChange, parseDate } from './../ViewRequestsModal.js';

//import styled components
import { NoConvosMessage, TechLink, SingleConvosContainer, SortButton, ReplyButton, ConvoReplyButtonContainer, ConversationsButton,ConversationsButtonTitle, ConversationsOuterContainer, SkeletonThemeStyled, BackButton, BackArrowIcon, MetaDataContainer, HeaderContainer, TicketNumberTitle, ModalTitle, Container, Divider, Content, FAIconStyled, SubSection, IconSubSection, TicketMetaData, RequestTitle, RequestDescription, DateTime, TicketTypeCircleSkeleton, ReqSkeletonContainer } from './RequestSpecificsStyledComponents.js';
import ReplyToConvo from './ReplyToConvo/ReplyToConvo.js';

import { removeHTML } from './../../../../utilityFunctions.js';

/* eslint no-restricted-globals:0 */

const getSingleRequestDetails = async (id) => {
    const getSingleRequestDetails_URL = `${isDev ? "" : "/server"}/helpdesk/request/read/${id}`;
    const getSingleRequestDetails_Headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": true
    };

    let requestDetails = await fetch(getSingleRequestDetails_URL, {
        method: 'GET',
        headers: getSingleRequestDetails_Headers
    })
    .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
    .then((jsonResponse) => jsonResponse)
    .catch((error) => {
        console.error(`getReqConvos() Catching error:\t ${error}`);
    });

    console.log("async reqDetails 1:\t", requestDetails);

    return requestDetails;
}; //end getSingleRequestDetails

const RequestSpecifics = ({districtPosition, renderAsStudent, notify}) => {
    const id        = useParams().id || location.slice(-2);
    const history   = useHistory();
    const match     = useRouteMatch();

    const location = useLocation();

    let [ statusIcon, setStatusIcon ]   = useState(faTasks);
    let [ convoComps, setConvoComps ]   = useState([]);
    let [ showConvos, setShowConvos ]   = useState(false);
    let [ isLoading, setIsLoading ]     = useState(false);

    let [ reqDetails, setReqDetails ] = useState({
        subject : "", 
        description: "", 
        time: "", 
        date: "", 
        status: "",
        site: "",

        techFullNameFormatted: "",
        techEmail: "helpdesk@centinela.k12.ca.us",
        name: ""
    });

    const reverseConvosOrder = () => {
        return setConvoComps([...convoComps].reverse());
    }; //end reverseConvosOrder

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
        let convoComponents = mapConvos([...convos].reverse());

        console.log("ReqSpecifics convos:\t", convos);
        console.log("ReqSpecifics convoComponents:\t", convoComponents);
        setConvoComps(convoComponents);

        setIsLoading(false);
    };

    const getReqDetSetState = async () => {
        setIsLoading(true);
        const requestDetails = await getSingleRequestDetails(id);

        const { requestInfo, message, error } = requestDetails;

        if (!error) {
            let { subject, description, created_time, status, id, technician, site } = requestInfo;

            let techInfo = {
                email_id: "helpdesk@centinela.k12.ca.us",
                name: "No assigned tech"
            };

            if (technician) {
                techInfo = technician;
            }

            let dateAndTime                     =   parseDate(created_time["display_value"]);

            const date                          =   dateFormatChange(dateAndTime[0]);
            const time                          =   dateAndTime[1] + " " + dateAndTime[2];
            status                              =   status.name;
            site                                =   site.name;
            const techEmail                     =   techInfo.email_id;

            let techFullNameFormatted = (techInfo.name !== "No assigned tech") ? techInfo.name.split(",")[1] + " " + techInfo.name.split(",")[0] : techInfo.name;

            setReqDetails({subject, description, time, date, techEmail, status, site, techFullNameFormatted });
            setIsLoading(false);
        } //end if-statement
    }; //getReqDetSetState()

    const setMetaDataState = () => {
        const { state } = location;

        if (state) {
            const { subject, description, time, date, techInfo, status, site } = state;
    
            getFAIcon(status);

            let { email_id: techEmail, name } = techInfo;
            let techFullNameFormatted = (name !== "No assigned tech") ? name.split(",")[1] + " " + name.split(",")[0] : name;
            
            setReqDetails({subject, description: description, time, date, techInfo, techEmail, status, site, techFullNameFormatted });
        } else {
            //Call function to get the user requests
            getReqDetSetState();
        } //end else-statement
    }; 

    useEffect(() => {
        setMetaDataState();
    }, []); //end useEffect() hook

    useEffect(() => {
        if (showConvos === true) {
            loadConvoComponents();
        } 
    }, [ showConvos ]); //end useEffect() hook

    let { subject, description, time, date, status, site, techFullNameFormatted, techEmail } = reqDetails;
    
    return (
        <Switch> 
            <Route exact path={"/:staffOrStudent/view-requests/:id"}>
                <HeaderContainer className={`request-#${id}-header-container`}>
                    <BackButton
                        className   =   {`request-#${id}-back-button`}
                        onClick     =   { () => history.push(`/${(renderAsStudent || districtPosition.toLowerCase() === "student") ? "student" : "staff"}/view-requests`) }
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
                        { subject || "No ticket Title"}
                    </ModalTitle>
                </HeaderContainer>

                <Container 
                    className = {`request-#${id}-container`}
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
                                                removeHTML(description) || `No description available`
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
                                            ) : status|| "Open"
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
                                                    href                =   { `mailto:${reqDetails.techEmail}` }
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

                                { 
                                    /* Only show the sort button if there are indeed convos to sort and only if there is more than one */
                                    (convoComps && convoComps.length > 1) ? (
                                        <SortButton
                                            className   =   {`request-#${id}-sort-button`}
                                            onClick     =   { reverseConvosOrder }
                                        >
                                            <FAIconStyled
                                                className           =   {`request-#${id}-sort-icon`}
                                                districtPosition    =   { districtPosition.toLowerCase() }
                                                renderAsStudent     =   { renderAsStudent }
                                                icon                =   { faSort }
                                                fontSize            =   "1.15em"
                                            />
                                        </SortButton>
                                    ) : null
                                }
                              
                                <ReplyButton
                                    className  =   {`request-#${id}-reply-button`}
                                    onClick     =   { () => history.push({
                                                        pathname    : `${match.url}/reply`,
                                                        state       : { subject, techEmail }
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
                                { 
                                        (convoComps.length > 0) ? convoComps : (
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
export { getSingleRequestDetails };
// <SkeletonThemeStyled 
//                         color           = {
//                                             districtPosition ?
//                                                 ( (districtPosition.toLowerCase() === "student") || renderAsStudent || window.location.pathname === "/student") ? 
//                                                     "rgba(147, 30, 29, 0.1)": "rgba(30, 108, 147, 0.1)"
//                                                 : "rgba(147, 30, 29, 0.1)" 
//                                             }
//                         highlightColor  = {
//                                                 districtPosition ?
//                                                 ( (districtPosition.toLowerCase() === "student") || renderAsStudent || window.location.pathname === "/student") ? 
//                                                     "rgba(147, 30, 29, 0.1)": "rgba(30, 108, 147, 0.1)"
//                                                 : "rgba(147, 30, 29, 0.1)" 
//                         }
//                     > 
