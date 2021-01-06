import React, { useState, useEffect, useRef, Fragment } from 'react';
import { withRouter, Route, Switch } from "react-router-dom";

import isDev from 'isdev';

import { faTasks, faFilter, faSort } from '@fortawesome/free-solid-svg-icons';

import { SkeletonTheme } from 'react-loading-skeleton';

import RequestPreviewRectangle from './RequestPreviewRectangle/RequestPreviewRectangle.js';

import FilterPane from './FilterPane/FilterPane.js';

import RequestSpecifics from './RequestSpecifics/RequestSpecifics.js';

import { Container, CloseButton, ReqRectContainer, InnerContainer, ModalTitle, RequestTypeTitle, FilterButton, TitleFilterContainer, FilterText, SortButton, NoRequestsMessage, FAIconStyled } from './ViewRequestsModalStyledComponents.js';

const ViewRequestsModal = ({ districtPosition, renderAsStudent, fullName, email, site, toggleModal, modalIsOpen, match, history, itUID, notify }) => {
    let [ isLoading, setIsLoading ]                         = useState(false);

    let [ submitEnabled, setSubmitEnabled ]                 = useState(false);

    let [ showFilterPane, setShowFilterPane ]               =   useState(false);
    let [ requestsType, setRequestsType ]                   =   useState("All");
    let [ requestRectangles, setRequestRectangles ]         =   useState([]);

    const onClose = () => {
        let rootPathName = (districtPosition.toLowerCase() === "student" || renderAsStudent) ? "/student" : "/staff";
        toggleModal(false);

        history.push(rootPathName);
    }; //end onClose()

    const bodyOpenClassName="view-requests-modal-body--open",
            htmlOpenClassName="view-requests-modal-html--open",
            overlayClassName="view-requests-modal-overlay",
            portalClassName="view-requests-modal",
            contentClassName="view-requests-modal-content",
            parentSelectorID="chat-page-main-container";

    
    const parseDate = (stringToParse) => {
        let dateAndTime = stringToParse.split(" ");

        return dateAndTime;
    }; //end parseDate()

    const dateFormatChange = (dateToChange) => {
        const dateParts = dateToChange.split("/");

        const formattedDate  = dateParts[1] + "/" +  dateParts[0] + "/" + dateParts[2];

        return formattedDate;
    };

    const routeToReqID = (requestObject, subject, description, time, date, status, technician, site) => {
        const { id } = requestObject;

        const pathname = `${match.url}/view-requests/${id}`;
        return history.push({
            pathname: pathname,
            state: { request: requestObject, subject, description, time, date, status, technician, site }
        });
    }; //end routeToReqID
    
    const loadRequestRectangles = (requests) => {
        let requestRectangles = requests.map((requestObject, index) => {

            let { subject, short_description: description, created_time, status, id, technician, site } = requestObject;
            
            let dateAndTime = parseDate(created_time["display_value"]);

            const date = dateFormatChange(dateAndTime[0]);

            const time = dateAndTime[1] + " " + dateAndTime[2];
            
            status = status.name;
            site   =  site.name;
            
            return (
                <RequestPreviewRectangle
                    districtPosition    =   { districtPosition }
                    renderAsStudent     =   { renderAsStudent }

                    subject             =   { subject}
                    description         =   { description }
                    date                =   {  date }
                    time                =   { dateAndTime[1] + " " + dateAndTime[2] }
                    status              =   { status }
                    id                  =   { id }
                    isLoading           =   { isLoading }

                    onClick             =   { () => routeToReqID(requestObject, subject, description, time, date, status, technician, site) }

                    key                 =   { id }
                />
            );

        });

        return requestRectangles;
    }; //end loadRequestRectangles()
    
    const getUserRequests = async (email, requestsType = "All") => {
        let requests = [];
        setIsLoading(true);

        const getUserRequests_URL = `${isDev ? "" : "/server"}/helpdesk/request/read/all/user`;
        const getUserRequests_Headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials": true
        };
    
        let requestsResponse = await fetch(getUserRequests_URL, {
            method: 'POST',
            headers: getUserRequests_Headers,
            body: JSON.stringify({ email, requestsType } )
        })
        .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
        .then((jsonResponse) => jsonResponse)
        .catch((error) => {
            console.error(`Catching error:\t ${error}`);
        });

        if (requestsResponse && !requestsResponse.error) {
            requests = requestsResponse.requests;
            setIsLoading(false);
        } else {
            console.log(`Error in fetching the requests.`);

            requests = [];
        }

        return requests;
    }; //end getUserRequests

    //Run ref on component updates except for initial mount via use of ref variable
    const isInitialMount = useRef(true);

    const getRequestRectangles = async (reverse) => { 
        let requests = await getUserRequests(email, requestsType);

        let requestRectangles = loadRequestRectangles(requests);

        setRequestRectangles(requestRectangles);
        
        console.log("requestsType:\t", requestsType);
        console.log("requests:\t", requests);
        console.log("request rectangles:\t", requestRectangles);
    };

    const afterOpenModal = async () => {
        setSubmitEnabled(true);
        // setIsLoading(false);

        getRequestRectangles();
    }; //afterOpenModal()

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            getRequestRectangles(); //only run this function on first mount
        }
        // setTimeout(() => setIsLoading(false), 3000);
    }, [ requestsType ]); //end useEffect()

    useEffect(() => {
        if (history.location.pathname === `${match.url}/view-requests`) {
            toggleModal(true);
        }
    }, [ history ] );

    return (
      <Container
        isOpen                      =   { modalIsOpen }
        onAfterOpen                 =   { afterOpenModal }
        onAfterClose                =   { onClose }
        shouldCloseOnEsc            =   { true }
        shouldReturnFocusAfterClose =   { true }
        //onRequestClose              =   { onClose }

        contentLabel                =   { "View Requests Modal" }

        portalClassName             =   { portalClassName }
        overlayClassName            =   { overlayClassName }
        bodyOpenClassName           =   { bodyOpenClassName }
        htmlOpenClassName           =   { htmlOpenClassName }
        className                   =   { contentClassName }

        parentSelector              =   { () => document.getElementById("cvuhsd-sso-portal")}

        shouldCloseOnOverlayClick   =   { false }
        closeTimeoutMS              =   { 300 }
      >
        <CloseButton 
            className           =   "view-request-modal-close-button"
            title               =   "Close modal"
            districtPosition    =   { districtPosition.toLowerCase() }
            onClick             =   { () => toggleModal(false) } 
        >
            &times;
        </CloseButton>
        <InnerContainer className="view-request-modal-inner-container">
            <Switch>
                <Route exact path={"/:staffOrStudent/view-requests"}>
                    <div>
                        <ModalTitle 
                            districtPosition    =   { districtPosition.toLowerCase() }
                        >
                            View Requests
                        </ModalTitle>
                        
                        <FAIconStyled
                            districtPosition    =   { districtPosition.toLowerCase() }
                            icon                =   { faTasks }
                        />
                    </div>
                    <TitleFilterContainer className="view-request-modal-title-filter-container">
                        <RequestTypeTitle
                            className           =   "view-request-modal-request-type-title"
                            districtPosition    =   { districtPosition.toLowerCase() }
                        >
                            {
                                requestsType ? (requestsType === "Open") ? "Open Requests" :   
                                                (requestsType === "In Progress")  ? "In Progress Requests" : 
                                                (requestsType === "Closed")  ? "Closed Requests" : "All Requests"
                                            
                                : "All Requests"
                            }
                        </RequestTypeTitle>

                        <FilterButton
                            className           =   "view-request-modal-filter-button"
                            districtPosition    =   { districtPosition.toLowerCase() }
                            onClick             =   { () => setShowFilterPane(!showFilterPane) }
                        >
                            <FAIconStyled
                                    className           =   "view-request-modal-request-status-icon"
                                    districtPosition    =   { districtPosition.toLowerCase() }
                                    color               =   "white"
                                    icon                =   { faFilter }
                            />
                            <FilterText
                                    className="view-request-modal-filter-text"
                                    districtPosition    =   { districtPosition.toLowerCase() }
                            >
                                Filter/Legend
                            </FilterText>
                        </FilterButton>
                        {
                            (requestRectangles.length > 1) ? (
                                <SortButton
                                    className           =   "view-request-modal-sort-button"
                                    districtPosition    =   { districtPosition.toLowerCase() }
                                    onClick             =   { () => setRequestRectangles([...requestRectangles].reverse()) }
                                >
                                <FAIconStyled
                                        className           =   "view-request-modal-request-sort-icon"
                                        districtPosition    =   { districtPosition.toLowerCase() }
                                        color               =   "white"

                                        icon                =   { faSort }
                                        noLeftMargin
                                />
                                {/* <FilterText
                                        className="view-request-modal-filter-text"
                                        districtPosition    =   { districtPosition.toLowerCase() }
                                >
                                    Asc/Desc
                                </FilterText> */}
                            </SortButton>
                            ) : null
                        }
                    </TitleFilterContainer>
            
                    <FilterPane
                        districtPosition    =   { districtPosition }
                        renderAsStudent     =   { renderAsStudent }

                        showFilterPane      =   { showFilterPane }
                        setShowFilterPane   =   { setShowFilterPane }

                        setRequestsType     =   { setRequestsType }
                    />
                        
                    <ReqRectContainer 
                        className           =   "view-request-modal-req-rect-container"
                        districtPosition    =   { districtPosition }
                        renderAsStudent     =   { renderAsStudent }
                    >            
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
                        > 
                        {
                            isLoading ? (
                                <Fragment>
                                    <RequestPreviewRectangle
                                        districtPosition    =   { districtPosition }
                                        renderAsStudent     =   { renderAsStudent }

                                        isLoading           =   {   true }
                                    />
                                    <RequestPreviewRectangle
                                        districtPosition    =   { districtPosition }
                                        renderAsStudent     =   { renderAsStudent }

                                        isLoading           =   {   true }
                                    />
                                    <RequestPreviewRectangle
                                        districtPosition    =   { districtPosition }
                                        renderAsStudent     =   { renderAsStudent }

                                        isLoading           =   {   true }
                                    />

                                    <RequestPreviewRectangle
                                        districtPosition    =   { districtPosition }
                                        renderAsStudent     =   { renderAsStudent }

                                        isLoading           =   {   true }
                                    />
                                    <RequestPreviewRectangle
                                        districtPosition    =   { districtPosition }
                                        renderAsStudent     =   { renderAsStudent }

                                        isLoading           =   {  true }
                                    />
                                    <RequestPreviewRectangle
                                        districtPosition    =   { districtPosition }
                                        renderAsStudent     =   { renderAsStudent }

                                        isLoading           =   {   true }
                                    />     
                                </Fragment>
                            ) : (requestRectangles.length > 0) ? 
                                    requestRectangles 
                                    : (
                                        <NoRequestsMessage 
                                            className           =   "no-requests-message"
                                            districtPosition    =   { districtPosition }
                                            renderAsStudent     =   { renderAsStudent }
                                        >
                                            No {requestsType.toLowerCase( )} requests at this moment.
                                        </NoRequestsMessage>
                                    )

                        }
                        </SkeletonTheme>
                    </ReqRectContainer>
            </Route>
            <Route path={"/:staffOrStudent/view-requests/:id"}>
                <RequestSpecifics
                    districtPosition    =   { districtPosition }
                    renderAsStudent     =   { renderAsStudent }
                />
            </Route>
            </Switch>
        </InnerContainer>
      </Container>
  ); //end return statement
}; //end TransferToITModal()

export default withRouter(ViewRequestsModal);