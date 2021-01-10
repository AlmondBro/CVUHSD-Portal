import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { faTicketAlt, faArrowLeft, faReply, faUserSecret } from '@fortawesome/free-solid-svg-icons';

import ReactLoading from 'react-loading';
import isDev from 'isdev';

import { HeaderContainer, BackButton, BackArrowIcon, FAIconStyled, TicketNumberTitle, ModalTitle, Container, Form, FormInputContainer, TextArea, ReplyButton } from './ReplyToConvoStyledComponents.js';
import { HelpdeskSubmitMessage } from './../../../SupportRequestModal/SupportRequestModalStyledComponents.js';

import { getSingleRequestDetails } from './../RequestSpecifics.js';

const ReplyToConvo = ({districtPosition, renderAsStudent, id, notify }) => {
    let [ message, setMessage ]             = useState("");

    let [ isLoading, setIsLoading ]         = useState(false);
    let [ submitEnabled, setSubmitEnabled ] = useState(true);

    let [ headerTitle, setHeaderTitle ]     = useState("Reply to Request");
    let [ replySubject, setReplySubject ]    = useState(`Re: No Ticket Title`);
    let [ techEmail, setTechEmail ]         = useState("helpdesk@centinela.k12.ca.us");

    const history                           = useHistory();
    const location                          = useLocation();

    const onChange = (event) => {
        setMessage(event.target.value);
      }; //end onChange() handler

    const sendReplyReq = async () => {
        const sendReplyReq_URL = `${isDev ? "" : "/server"}/helpdesk/request/${id}/reply`;
        const sendReplyReq_Headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials": true
        };
    
        let sendReplyReqResult = await fetch(sendReplyReq_URL, {
            method: 'POST',
            headers: sendReplyReq_Headers,
            body: JSON.stringify({subject: replySubject, description: message, email: techEmail})
        })
        .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
        .then((jsonResponse) => jsonResponse)
        .catch((error) => {
            console.error(`getReqConvos() Catching error:\t ${error}`);
            return;
        });

        return sendReplyReqResult;
    }; //end getReqConvos

    const submitRequest = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (submitEnabled && (isLoading === false)) {
            setSubmitEnabled(false);
            setIsLoading(true);

            let sendReplyReqResult = await sendReplyReq(id);
            
            setIsLoading(false);

            console.log("sendReplyReqResult:\t", sendReplyReqResult);

            if (sendReplyReqResult && !sendReplyReqResult.error) {
                
                console.log(`Successfully replied to request #${id}.`);
                setMessage("");
                setSubmitEnabled(true);

                notify(
                    <HelpdeskSubmitMessage
                        districtPosition    =   { districtPosition }
                        renderAsStudent     =   { renderAsStudent }
                        message             =   {`Successfully replied to request #${id}.`}
                        icon                =   { faReply }
                    />
                );
            } else {
                console.log(`Error in replying to request #${id}.`);

                notify(
                    <HelpdeskSubmitMessage
                        districtPosition    =   { districtPosition }
                        renderAsStudent     =   { renderAsStudent }
                        message             =   {`Error in replying to request #${id}.`}
                        icon                =   { faReply }
                    />
                );

                setSubmitEnabled(true);
            } //end else-statement
        } //end outer if-statement
    }; //end submitRequest

    const getReqDetSetState = async () => {
        setIsLoading(true);

        const requestDetails = await getSingleRequestDetails(id);

        const { requestInfo, message, error } = requestDetails;

        if (!error) {
            let { subject, technician } = requestInfo;
            let { email_id }  = technician;

            let replySubject = `Re: [Request ID: ##RE-${id}##]: ${subject} `; 

            setHeaderTitle(subject);
            setTechEmail(email_id);
            setReplySubject(replySubject);

            setIsLoading(false);
        }
    }; //end getReqDetSetState()

    const setStateVariables = () => {
        setIsLoading(true);
        const { state } = location;

        if (state) {
            let { subject, techEmail } = state;

            let replySubject = `Re: [Request ID: ##RE-${id}##]: ${subject} `; 

            setHeaderTitle(subject);
            setTechEmail(techEmail);
            setReplySubject(replySubject);
            setIsLoading(false);
        } else {
            getReqDetSetState();
        } //end else statement
    }; //end setStateVariables()

    useEffect(() => {
        setStateVariables();
    }, []); //end useEffect()

    return (
        <Fragment>
            <HeaderContainer className={`request-#${id}-header-container`}>
                <BackButton
                    className   =   {`request-#${id}-back-button`}
                    onClick     =   { () => history.push(`/${(renderAsStudent || districtPosition.toLowerCase() === "student") ? "student" : "staff"}/view-requests/${id}`) }
                >
                    <BackArrowIcon
                        districtPosition    =   { districtPosition.toLowerCase() }
                        renderAsStudent     =   { renderAsStudent }
                        icon                =   { faArrowLeft }
                        fontSize            =   "1.15em"
                    />
                </BackButton>
            
                <ModalTitle 
                    className           =   {`request-#${id}-ticket-title`}
                    districtPosition    =   { districtPosition.toLowerCase() }
                    renderAsStudent     =   { renderAsStudent }
                >
                      <FAIconStyled
                        className           =   {`request-#${id}-ticket-icon`}
                        districtPosition    =   { districtPosition.toLowerCase() }
                        renderAsStudent     =   { renderAsStudent }
                        icon                =   { faReply }
                        fontSize            =   "1.15em"
                    />: 
                </ModalTitle>
              
                <ModalTitle 
                    className={`request-#${id}-ticket-title`}
                    districtPosition    =   { districtPosition.toLowerCase() }
                    renderAsStudent     =   { renderAsStudent }
                >
                    { headerTitle || "No title specified"}
                </ModalTitle>

                {
                    id ? (
                        <TicketNumberTitle 
                            className           =   {`request-#${id}-ticket-number-title`}
                            districtPosition    =   { districtPosition.toLowerCase() }
                            renderAsStudent     =   { renderAsStudent }
                            as                  =   "h4"
                        >
                        (#{id})
                    </TicketNumberTitle>
                    ) : null
                }
            </HeaderContainer>

            <Container 
                className={`request-#${id}-container`}
            >
                <Form onSubmit = { submitRequest}>
                    <FormInputContainer>
                        <TextArea
                            renderAsStudent     =   { renderAsStudent }
                            districtPosition    =   { districtPosition }

                            name        =   {`request-#${id}-reply-message`}
                            rows        =   "10"
                            placeholder =   { `Enter your response to ${headerTitle} here...`}
                            onChange    =   { onChange }  
                            value       =   { message }
                            required    =   { true }
                       />       
                        <ReplyButton
                            type                =   "submit"        
                            disabled            =   { !submitEnabled }
                            submitEnabled       =   {  submitEnabled }

                            isLoading           =   { isLoading }
                            districtPosition    =   { districtPosition.toLowerCase() }
                            renderAsStudent     =   { renderAsStudent }
                        >
                        {
                            isLoading ? (
                                <ReactLoading 
                                    type    =   "bubbles"
                                    width   =   "30px" 
                                    height  =   "30px" 
                                    color   =   "white"
                                /> ) : "Reply"
                        }
                        </ReplyButton>
                    </FormInputContainer>
                </Form>
            </Container>
        </Fragment>
    ); //end return statement
}; //end ReplyToConvo

export default ReplyToConvo;