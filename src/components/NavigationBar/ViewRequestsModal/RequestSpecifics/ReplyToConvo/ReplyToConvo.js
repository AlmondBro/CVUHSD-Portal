import React, { Fragment } from 'react';
import { useParams, useHistory, useLocation, useRouteMatch, Switch, Route } from 'react-router-dom';

import { faTicketAlt, faArrowLeft, faReply } from '@fortawesome/free-solid-svg-icons';

import { HeaderContainer, BackButton, BackArrowIcon, FAIconStyled, TicketNumberTitle, ModalTitle, Container, Form, FormInputContainer, TextArea, ReplyButton } from './ReplyToConvoStyledComponents.js';

const ReplyToConvo = ({districtPosition, renderAsStudent, id }) => {
    const history   = useHistory();
    const { state } = useLocation();

    const match = useRouteMatch();

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
                    PowerSchool Log-in Help
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
                <Form>
                    <FormInputContainer>
                        <TextArea
                            rows        =   "10"
                            placeholder =   { `Enter your response to ${"ticket name"} here...`}
                       />
                        <ReplyButton
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