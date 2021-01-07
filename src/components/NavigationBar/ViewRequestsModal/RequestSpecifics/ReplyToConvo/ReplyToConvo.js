import React, { Fragment } from 'react';
import { useParams, useHistory, useLocation, useRouteMatch, Switch, Route } from 'react-router-dom';

import { faTasks, faCircle, faCheck, faAngleDoubleRight, faTicketAlt, faArrowLeft, faClock, faTools, faEyeSlash, faEye, faReply, faLock } from '@fortawesome/free-solid-svg-icons';

import { HeaderContainer, BackButton, BackArrowIcon, FAIconStyled, TicketNumberTitle, ModalTitle, Container } from './ReplyToConvoStyledComponents.js';

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
                    Reply
                </ModalTitle>
            </HeaderContainer>
            <Container 
            className={`request-#${id}-container`}
            >
            </Container>
        </Fragment>
    ); //end return statement
}; //end ReplyToConvo

export default ReplyToConvo;