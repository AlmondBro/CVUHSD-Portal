import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { faTicketAlt, faArrowLeft, faReply } from '@fortawesome/free-solid-svg-icons';

import ReactLoading from 'react-loading';
import isDev from 'isdev';

import { HeaderContainer, BackButton, BackArrowIcon, FAIconStyled, TicketNumberTitle, ModalTitle, Container, Form, FormInputContainer, TextArea, ReplyButton } from './ReplyToConvoStyledComponents.js';
import { HelpdeskSubmitMessage } from './../../../SupportRequestModal/SupportRequestModalStyledComponents.js';
const ReplyToConvo = ({districtPosition, renderAsStudent, id, notify }) => {
    let [ message, setMessage ]             = useState("");

    let [ isLoading, setIsLoading ]         = useState(false);
    let [ submitEnabled, setSubmitEnabled ] = useState(true);

    const history                           = useHistory();
    const { state }                         = useLocation();

    let { subject, techInfo } = state;

    let replySubject = `Re: ` + subject; 

    const techEmail = techInfo.email_id;

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
                    { subject || "No title specified"}
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
                            name        =   {`request-#${id}-reply-message`}
                            rows        =   "10"
                            placeholder =   { `Enter your response to ${subject} here...`}
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