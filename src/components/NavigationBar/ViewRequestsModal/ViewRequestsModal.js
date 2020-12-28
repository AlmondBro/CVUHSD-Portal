import React, { useState, useEffect, useRef, Fragment } from 'react';
import { withRouter, Route, Switch } from "react-router-dom";

import isDev from 'isdev';

import { faTasks, faFilter } from '@fortawesome/free-solid-svg-icons';

import { SkeletonTheme } from 'react-loading-skeleton';

import RequestRectangle from './RequestRectangle/RequestRectangle.js';

import FilterPane from './FilterPane/FilterPane.js';

import { Container, CloseButton, ReqRectContainer, InnerContainer, ModalTitle, RequestTypeTitle, FilterButton, TitleFilterContainer, FilterText, NoRequestsMessage, FAIconStyled } from './ViewRequestsModalStyledComponents.js';

const ViewRequestsModal = ({ districtPosition, renderAsStudent, fullName, email, site, toggleModal, modalIsOpen, history, itUID, notify }) => {
    let [ isLoading, setIsLoading ]                         = useState(false);
    let [ changePasswordResult, setChangePasswordResult ]   = useState(null);

    let [ serverMessage, setServerMessage ]                 = useState("");

    let [ submitEnabled, setSubmitEnabled ]                 = useState(false);

    let [ showFilterPane, setShowFilterPane ]               =   useState(false);
    let [ requestsType, setRequestsType ]                   =   useState("All");
    let [ requestRectangles, setRequestRectangles ]         =   useState([]);

    const onClose = () => {
        let rootPathName = (districtPosition.toLowerCase() === "student" || renderAsStudent) ? "/student" : "/staff";
        setChangePasswordResult(null);
        setServerMessage("");
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

    const loadRequestRectangles = (requests) => {
        let requestRectangles = requests.map((requestObject, index) => {

            let { subject, short_description, created_time, status } = requestObject;
            
            let dateAndTime = parseDate(created_time["display_value"]);
            
            return (
                <RequestRectangle
                    districtPosition    =   { districtPosition }
                    subject             =   { subject}
                    description         =   { short_description }
                    date                =   {  dateFormatChange(dateAndTime[0]) }
                    time                =   { dateAndTime[1] + " " + dateAndTime[2] }
                    status              =   { status.name }
                    isLoading           =   { isLoading }
                    onClick             =   { () => history.push("#test") }
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
            console.error(`Error ${requestsResponse.message}`);
        }

        return requests;
    }; //end getUserRequests

    //Run ref on component updates except for initial mount via use of ref variable
    const isInitialMount = useRef(true);

    const getRequestRectangles = async () => { 
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
        setServerMessage("");

        getRequestRectangles();
    }; //afterOpenModal()

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            getRequestRectangles();
        }
        // setTimeout(() => setIsLoading(false), 3000);
    }, [ requestsType ]); //end useEffect()

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
                            icon                =   { faTasks, faFilter }
                    />
                    <FilterText
                            className="view-request-modal-filter-text"
                            districtPosition    =   { districtPosition.toLowerCase() }
                    >
                        Filter
                    </FilterText>
                </FilterButton>
            </TitleFilterContainer>
     
            <FilterPane
                districtPosition    =   { districtPosition }
                renderAsStudent     =   { renderAsStudent }

                showFilterPane      =   { showFilterPane }
                setShowFilterPane   =   { setShowFilterPane }

                setRequestsType     =   { setRequestsType }
            />
                <Switch>
                    <Route path={"/:staffOrStudent/view-requests"}>
                        <ReqRectContainer className="view-request-modal-req-rect-container">            
                            <SkeletonTheme 
                                color           = {
                                                    districtPosition ?
                                                        ( (districtPosition === "student") || renderAsStudent || window.location.pathname === "/student") ? 
                                                            " rgba(147, 30, 29, 0.21)": "rgba(30, 108, 147, 0.21);"
                                                        : "rgba(147, 30, 29, 0.21)" 
                                                    }
                                highlightColor  = {
                                                        districtPosition ?
                                                        ( (districtPosition === "student") || renderAsStudent || window.location.pathname === "/student") ? 
                                                            " rgba(147, 30, 29, 0.5)": "rgba(30, 108, 147, 0.5);"
                                                        : "rgba(147, 30, 29, 0.5)" 
                                }
                            >
                            {
                                isLoading ? (
                                    <Fragment>
                                        <RequestRectangle
                                            districtPosition    =   { districtPosition }
                                            isLoading           =   {   true }
                                        />
                                        <RequestRectangle
                                            districtPosition    =   { districtPosition }
                                            isLoading           =   {   true }
                                        />
                                        <RequestRectangle
                                            districtPosition    =   { districtPosition }
                                            isLoading           =   {   true }
                                        />

                                        <RequestRectangle
                                            districtPosition    =   { districtPosition }
                                            isLoading           =   {   true }
                                        />
                                        <RequestRectangle
                                            districtPosition    =   { districtPosition }
                                            isLoading           =   {  true }
                                        />
                                        <RequestRectangle
                                            districtPosition    =   { districtPosition }
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
                </Switch>
        </InnerContainer>
      </Container>
  ); //end return statement
}; //end TransferToITModal()

export default withRouter(ViewRequestsModal);