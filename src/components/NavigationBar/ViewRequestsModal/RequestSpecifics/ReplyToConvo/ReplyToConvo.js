import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { faTicketAlt, faArrowLeft, faReply } from '@fortawesome/free-solid-svg-icons';

import { HeaderContainer, BackButton, BackArrowIcon, FAIconStyled, TicketNumberTitle, ModalTitle, Container, Form, FormInputContainer, TextArea, ReplyButton } from './ReplyToConvoStyledComponents.js';

import isDev from 'isdev';

const ReplyToConvo = ({districtPosition, renderAsStudent, id }) => {
    const [ message, setMessage ] = useState("");

    const history   = useHistory();
    const { state } = useLocation();

    const { subject, techInfo } = state;

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
    
        let sendReply_Req = await fetch(sendReplyReq_URL, {
            method: 'POST',
            headers: sendReplyReq_Headers,
            body: JSON.stringify({subject, description: message, email: techEmail})
        })
        .then((serverResponse) => serverResponse.json()) //Parse the JSON of the response
        .then((jsonResponse) => jsonResponse)
        .catch((error) => {
            console.error(`getReqConvos() Catching error:\t ${error}`);
        });

        if (sendReply_Req && !sendReply_Req.error) {
            console.log(`Successfully replied to request #${id}.`);
        } else {
            console.log(`Error in replying to request #${id}.`);
        }

        return sendReply_Req;
    }; //end getReqConvos


    const submitRequest = async (event) => {
        event.preventDefault();
        event.stopPropagation();
    
        let submitReqResponse = "";
    
        // if (submitEnabled && (isLoading === false) ) {
        //     setIsLoading(true);
        //     //setSubmitEnabled(false);
        // }
        
        sendReplyReq(id);
        // return submitReqResponse;
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
                    className={`request-#${id}-ticket-title`}
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

                <TicketNumberTitle 
                    className           =   {`request-#${id}-ticket-number-title`}
                    districtPosition    =   { districtPosition.toLowerCase() }
                    renderAsStudent     =   { renderAsStudent }
                    as                  =   "h4"
                >
                    (#{id})
                </TicketNumberTitle>
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
                       />
                        <ReplyButton
                            type                =   "submit"        

                            districtPosition    =   { districtPosition.toLowerCase() }
                            renderAsStudent     =   { renderAsStudent }
                        >
                            Reply
                        </ReplyButton>
                    </FormInputContainer>
                   
                </Form>
            </Container>
        </Fragment>
    ); //end return statement
}; //end ReplyToConvo

export default ReplyToConvo;